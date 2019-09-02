# from flask import Flask, render_template, request
# from werkzeug import secure_filename
# import os
# # app = Flask(__name__)
# app = Flask(__name__, instance_path='D:/resources')


# @app.route('/up')
# def load_file():
#    return render_template('upload.html')
	
# @app.route('/uploader', methods = ['GET', 'POST'])
# def upload_file():
#    if request.method == 'POST':
#       f = request.files['file']
#       filename = os.path.join('/resources/', f.filename)
#       print(filename)
#       f.save(secure_filename(filename))
#       return 'file uploaded successfully'
		
# if __name__ == '__main__':
#    app.run(debug = True)

from flask import Flask, render_template, request
from werkzeug import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER']='static/resources/'

@app.route('/up')
def up_file():
   return render_template('upload.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
    #   filename=os.path.join(app.up)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))
    #   f.save(secure_filename(f.filename))
      return 'file uploaded successfully'
		
if __name__ == '__main__':
   app.run(debug = True)