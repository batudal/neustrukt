from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from notion.client import NotionClient

notion_token = '8bc59baf563c9bd5fa7a4def5c1bb825520a326d6cfe381e16a4d3281e911f92545dc570554a6f0d81b50f3542984a48329b3fdd4e8959b30f4916c4438f1156ad5187a4c6396b073dafc3dfa1b9'
client = NotionClient(token_v2=notion_token)
sub_list_url = 'https://www.notion.so/neustrukt/ee79020c228647a79ff734f224169eb4?v=46bff5efe1d442c6befc75853a72e356'
collection_view = client.get_collection_view(sub_list_url)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class Subscribers(db.Model):
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

        sub_id = new_sub.id
        sub_email = new_sub.email

        try:
            updateNotion(sub_id,sub_email)
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