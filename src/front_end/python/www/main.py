from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def home():
    user = {'username': 'FreeEdu'}
    return render_template('index.html', title='Home', user=user)

@app.route('/simulation')
def simulation():
    return render_template('simulation.html', title='Simulation')

    
if __name__ == "__main__":
    app.run(host='0.0.0.0')
