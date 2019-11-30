from flask import Flask, render_template, jsonify,send_from_directory
from flask import request, jsonify, make_response

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


@app.route('/')
def index():
    return render_template('index.html')



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
            msg = str(e)
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

if __name__ == '__main__':
    app.run(debug=True)
