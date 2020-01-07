from flask import Flask
from flask_restful import Api
# from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
api = Api(app)

app.config['POSTGRES_DATABASE_URI_REMOTE'] = "dbname='gqdhjhdi' user='gqdhjhdi' host='john.db.elephantsql.com' password='a7obAswTJ2i4Pe9sCvUnKQ2NVFf_TwVH'"

app.config['SECRET_KEY'] = 'some-secret-string'

# db = SQLAlchemy(app)

# @app.before_first_request
# def create_tables():
#     db.create_all()

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

# app.config['JWT_BLACKLIST_ENABLED'] = True
# app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

# @jwt.token_in_blacklist_loader
# def check_if_token_in_blacklist(decrypted_token):
#     jti = decrypted_token['jti']
#     return models.RevokedTokenModel.is_jti_blacklisted(jti)

import views, models, resources

api.add_resource(resources.GetToolboxItems,'/gettooboxitems')

# api.add_resource(resources.UserRegistration, '/registration')
# api.add_resource(resources.UserLogin, '/login')
# api.add_resource(resources.UserLogoutAccess, '/logout/access')
# api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
# api.add_resource(resources.TokenRefresh, '/token/refresh')
# api.add_resource(resources.AllUsers, '/users')
# api.add_resource(resources.SecretResource, '/secret')
# api.add_resource(resources.UserRegistration, '/register')
# api.add_resource(resources.UserLogin,'/login')
# api.add_resource(resources.CreateNode,'/createnode')
# api.add_resource(resources.ListNodeAttribs,'/listattribs')
# api.add_resource(resources.AddNodeAttribs ,'/addattribs')
# api.add_resource(resources.ListAttribVals ,'/listattribvals')
# api.add_resource(resources.ListNodes,'/listnodes')
