from flask import Flask, render_template, jsonify,send_from_directory
from flask import request, json, make_response
import os
import traceback
from flask_restful import Api
from flask_jwt_extended import JWTManager
import views, models, resources


flag_ROOT = True

try:
    from python.hist import getHist 
    from python.f1 import getF1 
    from python.modeltree import ModelTree 
    from python.processtree import ProcessTree
except ImportError:
    print("No ROOT Support")
    flag_ROOT = False


app = Flask(__name__)
api = Api(app)
app.config['POSTGRES_DATABASE_URI_REMOTE'] = "dbname='gqdhjhdi' user='gqdhjhdi' host='john.db.elephantsql.com' password='a7obAswTJ2i4Pe9sCvUnKQ2NVFf_TwVH'"
app.config['SECRET_KEY'] = 'some-secret-string'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)



@app.route('/')
def index():
    data = json.dumps( None )
    return render_template('index.html', data = data)




@app.route('/loadmodel')
def loadmodel():
    model = request.args.get("model")
    
    filename = os.path.join(app.static_folder, 'models/' + model + '.json')
    try:
        with open(filename) as blog_file:
            data = json.dumps(json.load(blog_file))
    except:
        data = json.dumps(None)
    #data = json.dumps( model )
    return render_template('index.html', data = data)

@app.route('/es6-static/<path:filename>')
def es6_static(filename):
    return send_from_directory(app.config['ES6_MODULES'],
                               filename, as_attachment=True,
                               mimetype='text/javascript'
    )

@app.route("/api/calc", methods=["POST"])
def add():
    # Validate the request body contains JSON
    if request.is_json and flag_ROOT:
        try:
            # Parse the JSON into a Python dictionary
            req = request.get_json()

            # Print the dictionary
            #print(len(req['edges']))
            modelTree = ModelTree(req)
            processTree = ProcessTree()
            json = processTree.process(modelTree.getTree())
            #makeTree(req)

            # Return a string along with an HTTP status code
            #return make_response(jsonify({"message": "JSON message recieved"}), 200)
            msg = "Output generated successfully"
            data = {'output': json, 'message': msg}
            return make_response(jsonify(data))

        except Exception as e:
            msg = traceback.format_exc() #str(e)
            data = {'output': None, 'message': msg}
            return make_response(jsonify(data))

    else:
        # The request body wasn't JSON so return a 400 HTTP status code
        if flag_ROOT:
            msg = "Request body must be JSON"
        else:
            msg = "No ROOT support"
        data = {'output': None, 'message': msg}
        return make_response(jsonify(data), 400)
    #return getF1()

api.add_resource(resources.GetToolboxItems,'/gettoolboxitems')
api.add_resource(resources.GetModels ,'/getmodels')
api.add_resource(resources.SaveModel ,'/savemodel')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    # app.run()
