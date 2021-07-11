from flask import Flask, render_template, url_for

app = Flask(__name__)

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
    return render_template('submitted.html')

if __name__ == "__main__":
    app.run(debug=True)