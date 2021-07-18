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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

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