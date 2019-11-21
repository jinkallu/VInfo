from flask import Flask, render_template, jsonify,send_from_directory

from python.hist import getHist 
from python.f1 import getF1 



app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/people')
def people():
    data = {
        'firstname': 'Ozcan',
        'lastname': 'Yarimdunya',
        'age': 24,
        'companies': [
            'Ankaway Companies Group',
            'Huawei Technologies'
        ]
    }
    return jsonify(data)

@app.route('/es6-static/<path:filename>')
def es6_static(filename):
    return send_from_directory(app.config['ES6_MODULES'],
                               filename, as_attachment=True,
                               mimetype='text/javascript'
    )

@app.route("/api/calc")
def add():
    return getF1()

if __name__ == '__main__':
    app.run(debug=True)
