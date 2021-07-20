from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from notion.client import NotionClient
import os

## notion stuff
notion_token = os.environ["NOTION_TOKEN"]
client = NotionClient(token_v2=notion_token)
sub_list_url = os.environ["NOTION_SUBS_PAGE"]
collection_view = client.get_collection_view(sub_list_url)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URL"].replace('postgres://', 'postgresql://')
db = SQLAlchemy(app)

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

            return redirect('/')
        except:
            "Problemss"

@app.route('/careers')
def careers():
    return render_template('careers.html')

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
    print(id,email)
    new_row.id = str(id)
    new_row.email = str(email)

if __name__ == "__main__":
    app.run(debug=True)