from flask import Flask, render_template, url_for, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
import os
import boto3
from werkzeug.utils import secure_filename
import json
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from itsdangerous import URLSafeSerializer, BadData
from functools import wraps
import requests


app = Flask(__name__)

# recaptcha config
RECAPTCHA_SITE_KEY = os.environ.get('RECAPTCHA_SITE_KEY')
RECAPTCHA_SECRET_KEY = os.environ.get('RECAPTCHA_SECRET_KEY')

# serializer
app.secret_key = os.environ.get('SECRET_KEY')

# mail config
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_SERVER']='smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'info@neustrukt.com'
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# cors config
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# flask config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URL"].replace('postgres://', 'postgresql://')

db = SQLAlchemy(app)

# open positions
jobs = ['Architect', 'Interior Architect', 'Industrial Designer', 'Graphic Designer', 'Digital Marketer', 'Content Producer', 'Structural Engineer', 'Mechanical Engineer', 'Supply Chain Specialist']

#aws
S3_BUCKET = os.environ.get('S3_BUCKET')
S3_KEY = os.environ.get('AWS_ACCESS_KEY_ID')
S3_SECRET = os.environ.get('AWS_SECRET_ACCESS_KEY')

class Subscribers(db.Model):
    __tablename__ = 'subscribers'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    source = db.Column(db.String(120), nullable=False)

class Messages(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(1024), nullable=False)

class Applications(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    profession =  db.Column(db.String(120), nullable=False)
    cv_url = db.Column(db.String(1024), nullable=False)
    message = db.Column(db.String(1024), nullable=False)


def check_recaptcha(f):
    """
    Checks Google  reCAPTCHA.

    :param f: view function
    :return: Function
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        request.recaptcha_is_valid = None

        print("check1")

        if request.method == 'POST':
            data = {
                'secret': RECAPTCHA_SECRET_KEY,
                'response': request.form.get('g-recaptcha-response'),
                'remoteip': request.access_route[0]
            }
            r = requests.post(
                "https://www.google.com/recaptcha/api/siteverify",
                data=data
            )
            result = r.json()

            print("check2")

            if result['success']:
                request.recaptcha_is_valid = True
            else:
                request.recaptcha_is_valid = False
                flash('Invalid reCAPTCHA. Please try again.', 'error')

        return f(*args, **kwargs)

    return decorated_function


@app.route('/')
@check_recaptcha
def index():
    return render_template('index.html', site_key=RECAPTCHA_SITE_KEY)


@app.route('/unsubscribe/<token>')
def unsubscribe(token):
    s = URLSafeSerializer(app.secret_key, salt='unsubscribe')

    try:
        email = s.loads(token)
    except BadData:
        "token not loaded"

    try:
        subs_to_delete = Subscribers.query.filter_by(email=email).all()

        if subs_to_delete:
            for sub in subs_to_delete:
                db.session.delete(sub)
        db.session.commit()

        return render_template('unsubscribed.html')

    except:
        "delete failed"
    

def send_email(address):
    s = URLSafeSerializer(app.secret_key, salt='unsubscribe')

    token = s.dumps(address)
    url = url_for('unsubscribe', token=token)
    url = "https://www.neustrukt.de" + url

    msg = Message('Welcome!', sender = 'info@neustrukt.com', recipients = [address])
    msg.html = render_template('welcome_message.html', tokenlink=url)
    mail.send(msg)


@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/contact', methods=['GET','POST'])
@check_recaptcha
def contact():

    if request.method == 'GET':
        return render_template('contact.html', site_key=RECAPTCHA_SITE_KEY)
    else:
        users_firstname = request.form['firstname']
        users_lastname = request.form['lastname']
        users_email = request.form['email']
        users_message = request.form['message']
        
        if request.recaptcha_is_valid:   
            try:
                new_message = Messages(firstname=users_firstname, lastname=users_lastname, email=users_email, message=users_message)
                db.session.add(new_message)
                db.session.commit()

                return redirect('/')
            except:
                "DB commit failed."


@app.route('/careers', methods=['GET','POST'])
@cross_origin()
@check_recaptcha
def careers():

    if request.method == 'GET':
        return render_template('careers.html', jobs=jobs, site_key=RECAPTCHA_SITE_KEY)
    else:
        print(request.form)
 
        users_firstname = request.form['firstname']
        users_lastname = request.form['lastname']
        users_email = request.form['email']
        users_profession = request.form['profession']
        users_cv = request.form['file-url']
        users_message = request.form['message']

        if request.recaptcha_is_valid:
            try:
                new_application = Applications(firstname=users_firstname, lastname=users_lastname, email=users_email, profession=users_profession, message=users_message, cv_url=users_cv)
                db.session.add(new_application)
                db.session.commit()

                return redirect('/')
            except:
                return "Problemss"
        else:
            "captcha not valid"

@app.route('/mission')
def mission():
    return render_template('mission.html')

@app.route('/submitted', methods=['POST'])
@check_recaptcha
def submitted():

    subs_email = request.form['email']
    subs_source = request.form['popup-type']
    new_sub = Subscribers(email=subs_email, source=subs_source)

    send_email(address=subs_email)

    if request.recaptcha_is_valid:
        try:
            db.session.add(new_sub)
            db.session.commit()

            return redirect('/')
        except:
            "there was an issue"
    else:
        "captcha not valid"

@app.route('/blog', methods=['GET'])
def blog_redirect():
    return redirect('https://neustrukt.medium.com/')


@app.route('/sign_s3/')
def sign_s3():

  file_name = request.args.get('file_name')
  file_name = secure_filename(file_name)
  file_type = request.args.get('file_type')

  s3 = boto3.client(
      's3',
      aws_access_key_id = S3_KEY,
      aws_secret_access_key = S3_SECRET,
      region_name = 'us-east-2')

  presigned_post = s3.generate_presigned_post(
    Bucket = S3_BUCKET,
    Key = file_name,
    Fields = {"acl": "public-read", "Content-Type": file_type},
    Conditions = [
      {"acl": "public-read"},
      {"Content-Type": file_type}
    ],
    ExpiresIn = 3600
  ) 

  return json.dumps({
    'data': presigned_post,
    'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
  })




if __name__ == "__main__":
    app.run(debug=True)