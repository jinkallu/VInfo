from flask_restful import Resource, reqparse
from models import UserModel,TokenModel,NodeModel
# , RevokedTokenModel
import json
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

regparser = reqparse.RequestParser()
regparser.add_argument('username', help = 'This field cannot be blank', required = True)
regparser.add_argument('password', help = 'This field cannot be blank', required = True)
regparser.add_argument('authtype', help = 'This field cannot be blank', required = True)

loginparser = reqparse.RequestParser()
loginparser.add_argument('username', help = 'This field cannot be blank', required = True)
loginparser.add_argument('password', help = 'This field cannot be blank', required = True)
loginparser.add_argument('sessiondata', help = 'This field cannot be blank', required = True)

nodeparser=reqparse.RequestParser()
nodeparser.add_argument('session', help = 'This field cannot be blank...', required = True)
nodeparser.add_argument('programid', help = 'This field cannot be blank...', required = True)
nodeparser.add_argument('title', help = 'This field cannot be blank...', required = True)
nodeparser.add_argument('parent', help = 'This field cannot be blank...', required = True)
nodeparser.add_argument('briefdesc', help = 'This field cannot be blank...', required = True)

attribparser=reqparse.RequestParser()
attribparser.add_argument('nodeid', help = 'This field cannot be blank...', required = True)
attribparser.add_argument('session', help = 'This field cannot be blank...', required = True)


addattribparser=reqparse.RequestParser()
addattribparser.add_argument('nodeid', help = 'This field cannot be blank...', required = True)
addattribparser.add_argument('attribs', help = 'This field cannot be blank...', required = True)


listattribvalparser=reqparse.RequestParser()
listattribvalparser.add_argument('nodeid', help = 'This field cannot be blank...', required = True)
listattribvalparser.add_argument('session', help = 'This field cannot be blank...', required = True)


listnodeparser=reqparse.RequestParser()
listnodeparser.add_argument('nodeid', help = 'This field cannot be blank...', required=False)
listnodeparser.add_argument('session', help = 'This field cannot be blank...', required = True)









class UserRegistration(Resource):
    def post(self):
        data = regparser.parse_args()        
        res=UserModel.add_user(data['authtype'],data['username'],data['password'])
        return res

class UserLogin(Resource):
    def post(self):
        data=loginparser.parse_args()
        res=UserModel.user_auth( data['username'],data['password'],data['sessiondata'])   
        print(res)    
        if(res[0][1]['status'])=='success' and  (res[0][0] )!=None:
            access_token=create_access_token(identity=res[0])
            refresh_token=create_refresh_token(res[0])
            postdata={"sessionid":res[0][0],"jti":access_token}
            sessionid=res[0][0]
            TokenModel.insert_tokens(postdata)
            return {"status":"success","session":sessionid,"access_token":access_token,"refresh_token":refresh_token,"message":"Session Created Successfully"}
        return {"status":"error","message":"Unable to create session"}

class UserLogoutAccess(Resource):

    
    @jwt_required
    def post(self):
        currentuser=get_jwt_identity()
        # jti=get_raw_jwt()['jti']
        print(currentuser[0])
        # try:
        TokenModel.update_tokens(currentuser[0])
        return {"status":"success","message":"Token Revoked Successfully"}
        # except:
        #     return {"status":"error","message":"Something went wrong while logging out......."},500

class CreateNode(Resource):
    @jwt_required
    def post(self):
        data=nodeparser.parse_args()
        res=NodeModel.create_node(data)
        return res

class ListNodeAttribs(Resource):
    def post(self):
        data=attribparser.parse_args()
        res=NodeModel.list_nodeattribs(data)
        return res

class AddNodeAttribs(Resource):
    def post(self):
        datain=addattribparser.parse_args()
        print(datain)
        res=NodeModel.add_nodeattribs(datain)
        return res

class ListAttribVals(Resource):
    def post(self):
        datain=listattribvalparser.parse_args()
        res=NodeModel.list_attribvals(datain)
        return res

class ListNodes(Resource):
    def post(self):
        datain=listnodeparser.parse_args()
        res=NodeModel.list_nodes(datain)
        return res

        












      



# class UserRegistration(Resource):
#     def post(self):
#         data = parser.parse_args()
        
#         # if UserModel.find_by_username(data['username']):
#         #     return {'message': 'User {} already exists'.format(data['username'])}
        
#         # new_user = UserModel(
#         #     username = data['username'],
#         #     password = UserModel.generate_hash(data['password'])
#         # )

        



#         try:
#             new_user.save_to_db()
#             access_token = create_access_token(identity = data['username'])
#             refresh_token = create_refresh_token(identity = data['username'])
#             return {
#                 'message': 'User {} was created'.format(data['username']),
#                 'access_token': access_token,
#                 'refresh_token': refresh_token
#                 }
#         except:
#             return {'message': 'Something went wrong'}, 500


# class UserLogin(Resource):
#     def post(self):
#         # data = parser.parse_args()
#         # current_user = UserModel.find_by_username(data['username'])

#         # if not current_user:
#         #     return {'message': 'User {} doesn\'t exist'.format(data['username'])}
        
#         # if UserModel.verify_hash(data['password'], current_user.password):
#         #     access_token = create_access_token(identity = data['username'])
#         #     refresh_token = create_refresh_token(identity = data['username'])
#         #     return {
#         #         'message': 'Logged in as {}'.format(current_user.username),
#         #         'access_token': access_token,
#         #         'refresh_token': refresh_token
#         #         }
#         # else:
#         return {'message': 'Wrong credentials'}


# class UserLogoutAccess(Resource):
#     @jwt_required
#     def post(self):
#         jti = get_raw_jwt()['jti']
#         try:
#             revoked_token = RevokedTokenModel(jti = jti)
#             revoked_token.add()
#             return {'message': 'Access token has been revoked'}
#         except:
#             return {'message': 'Something went wrong'}, 500


# class UserLogoutRefresh(Resource):
#     @jwt_refresh_token_required
#     def post(self):
#         jti = get_raw_jwt()['jti']
#         try:
#             revoked_token = RevokedTokenModel(jti = jti)
#             revoked_token.add()
#             return {'message': 'Refresh token has been revoked'}
#         except:
#             return {'message': 'Something went wrong'}, 500


# class TokenRefresh(Resource):
#     @jwt_refresh_token_required
#     def post(self):
#         current_user = get_jwt_identity()
#         access_token = create_access_token(identity = current_user)
#         return {'access_token': access_token}


# class AllUsers(Resource):
#     def get(self):
#         return UserModel.return_all()
    
#     def delete(self):
#         return UserModel.delete_all()


# class SecretResource(Resource):
#     @jwt_required
#     def get(self):
#         return {
#             'answer': 42
#         }