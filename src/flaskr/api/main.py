from flask import Flask
from flask import render_template
from flask import request
import sys
import json


app = Flask(__name__)

@app.route("/")
def home():
    user = {'username': 'FreeEdu'}
    return render_template('index.html', title='Home', user=user)

@app.route('/simulation')
def simulation():
    return render_template('simulation.html', title='Simulation')

@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    print('jsdata:', jsdata)
    return json.dumps({'status':'OK'})

    
if __name__ == "__main__":
    app.run(host='0.0.0.0')
