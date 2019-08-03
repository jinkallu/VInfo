from www import app
from flask import render_template

@app.route('/')
def index():
 return render_template("index.html")

@app.route('/simulation')
def simulation():
    return render_template('simulation.html', title='Simulation')

@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    data = request.form['keyword']
    resp = make_response(json.dumps(data))
    resp.status_code = 200
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp