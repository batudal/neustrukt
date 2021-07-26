from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from notion.client import NotionClient
import os

app = Flask(__name__)

# app.config['UPLOAD_PATH'] = 'uploads'
# app.config['UPLOAD_EXTENSIONS'] = '.pdf'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URL"].replace('postgres://', 'postgresql://')

db = SQLAlchemy(app)

jobs = ['Architect', 'Interior Architect', 'Industrial Designer', 'Graphic Designer', 'Digital Marketer', 'Content Producer', 'Structural Engineer', 'Mechanical Engineer', 'Supply Chain Specialist']

## notion stuff
notion_token = os.environ["NOTION_TOKEN"]
sub_list_url = os.environ["NOTION_SUBS_PAGE"]
messages_url = os.environ["NOTION_MESSAGES_PAGE"]
app_list_url = os.environ["NOTION_APPLICATIONS_PAGE"]

client = NotionClient(token_v2=notion_token)

collection_view = client.get_collection_view(sub_list_url)
messages_view = client.get_collection_view(messages_url)
applications_view = client.get_collection_view(app_list_url)

class Subscribers(db.Model):
    __tablename__ = 'subscribers'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)

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
    message = db.Column(db.String(1024), nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/contact', methods=['GET','POST'])
def contact():

    if request.method == 'GET':
        return render_template('contact.html')
    else:
        users_firstname = request.form['firstname']
        users_lastname = request.form['lastname']
        users_email = request.form['email']
        users_message = request.form['message']

        new_message = Messages(firstname=users_firstname, lastname=users_lastname, email=users_email, message=users_message)

        try:
            db.session.add(new_message)
            db.session.commit()

            try:
                updateNotionMessages(new_message.id, new_message.firstname, new_message.lastname, new_message.email, new_message.message)
            except:
                "notion failed"

            return redirect('/')
        except:
            "Problemss"

@app.route('/careers', methods=['GET','POST'])
def careers():

    if request.method == 'GET':
        return render_template('careers.html', jobs=jobs)
    else:
        print(request.form)
        print(request.files)
        users_firstname = request.form['firstname']
        users_lastname = request.form['lastname']
        users_email = request.form['email']
        users_profession = request.form['profession']
        # users_cv = request.files['files']
        users_message = request.form['message']

        new_application = Applications(firstname=users_firstname, lastname=users_lastname, email=users_email, profession=users_profession, message=users_message)

        # if users_cv.filename != '':            
        #     users_cv.save("{0} {1} - {2}".format(users_firstname,users_lastname,users_cv.filename))

        try:
            db.session.add(new_application)
            db.session.commit()
  
            try:
                updateNotionApplications(new_application.id, new_application.firstname, new_application.lastname, new_application.email, new_application.profession,new_application.message)
            except:
                "notion failed"

            return redirect('/')
        except:
            "Problemss"

@app.route('/mission')
def mission():
    return render_template('mission.html')

@app.route('/submitted', methods=['POST'])
def submitted():

    subs_email = request.form['email']
    new_sub = Subscribers(email=subs_email)

    try:
        db.session.add(new_sub)
        db.session.commit()

        subs = Subscribers.query.order_by(Subscribers.id).all()

        try:
            updateNotion(new_sub.id,new_sub.email)
        except:
            "notion failed"

        return render_template('submitted.html', subs=subs)
    except:
        "there was an issue"

def updateNotion(id,email):
    new_row = collection_view.collection.add_row()
    new_row.id = str(id)
    new_row.email = str(email)

def updateNotionMessages(id, firstname, lastname, email, message):
    new_row = messages_view.collection.add_row()
    new_row.id = str(id)
    new_row.firstname = str(firstname)
    new_row.lastname = str(lastname)
    new_row.email = str(email)
    new_row.message = str(message)

def updateNotionApplications(id, firstname, lastname, email, profession, message):
    new_row = applications_view.collection.add_row()
    new_row.id = str(id)
    new_row.firstname = str(firstname)
    new_row.lastname = str(lastname)
    new_row.email = str(email)
    new_row.profession = str(profession)
    new_row.message = str(message)


if __name__ == "__main__":
    app.run(debug=True)