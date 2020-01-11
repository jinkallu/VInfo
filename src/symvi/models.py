# from run import db
from passlib.hash import pbkdf2_sha256 as sha256
import psycopg2
import json

DATABASELOCAL="dbname='postgres' user='postgres' host='localhost' password='Antiquity@1'"
DATABASECLOUD="dbname='gqdhjhdi' user='gqdhjhdi' host='john.db.elephantsql.com' password='a7obAswTJ2i4Pe9sCvUnKQ2NVFf_TwVH'"
# CONNTYPE='LOCAL'
CONNTYPE='CLOUD'

class ToolboxModel():
    @classmethod
    def get_toolbox(cls):
        try:            
            conn = psycopg2.connect(DATABASECLOUD)           
            print("conn successfull")
        except:
            print("I am unable to connect to the database")
        
        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call symvi.gettoolboxitems(%s)""",[res_json])
        data=cur.fetchone()
        # cur.execute("""SELECT datname from pg_database""")
        conn.commit()
        conn.close()
        return data[0]

class ModelModel():
    @classmethod
    def get_models(cls):
        try:            
            conn = psycopg2.connect(DATABASECLOUD)           
            print("conn successfull")
        except:
            print("I am unable to connect to the database")
        
        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call symvi.getmodels(%s)""",[res_json])
        data=cur.fetchone()
        # cur.execute("""SELECT datname from pg_database""")
        conn.commit()
        conn.close()
        return data[0]

    @classmethod
    def save_model(cls,modeldata):
        try:            
            conn = psycopg2.connect(DATABASECLOUD)           
            print("conn successfull")
        except:
            print("I am unable to connect to the database")
        
        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call symvi.savemodel(%s,%s)""",[json.dumps(modeldata),res_json])
        data=cur.fetchone()
        # cur.execute("""SELECT datname from pg_database""")
        conn.commit()
        conn.close()
        return data[0]

# class NodeModel():
#     @classmethod
#     def create_node(cls, nodedata):
#         try:
#             if(CONNTYPE)=='LOCAL':
#                 conn = psycopg2.connect(DATABASELOCAL)
#             else:
#                 conn = psycopg2.connect(DATABASECLOUD)
#         except:
#             print("I am unable to connect to the database")        
#         cur=conn.cursor()
#         res_json=None   
#         res=cur.execute(""" call noder.create_node(%s,%s)""",[json.dumps(nodedata),res_json])
#         data=cur.fetchall()       
#         conn.commit()
#         conn.close()
#         return data

    
#     @classmethod
#     def list_nodeattribs(cls,datain):
#         try:
#             if(CONNTYPE)=='LOCAL':
#                 conn = psycopg2.connect(DATABASELOCAL)
#             else:
#                 conn = psycopg2.connect(DATABASECLOUD)
#         except:
#             print("I am unable to connect to the database") 

#         cur=conn.cursor()
#         res_json=None   
#         attribs=None  
#         res=cur.execute(""" call noder.list_attribs(%s,%s,%s)""",[json.dumps(datain),attribs,res_json])    
#         result=cur.fetchall()
#         conn.commit()
#         conn.close()
#         return result    
    
#     @classmethod
#     def add_nodeattribs(cls, datain):
#         try:
#             if(CONNTYPE)=='LOCAL':
#                 conn = psycopg2.connect(DATABASELOCAL)
#             else:
#                 conn = psycopg2.connect(DATABASECLOUD)
#         except:
#             print("I am unable to connect to the database") 

#         cur=conn.cursor()
#         res_json=None
#         res=cur.execute(""" call noder.add_attribs(%s,%s)""",[json.dumps(datain),res_json])    
#         conn.commit()
#         result=cur.fetchall()
#         return result

#     @classmethod
#     def list_attribvals(cls, datain):
#         try:
#             if(CONNTYPE)=='LOCAL':
#                 conn = psycopg2.connect(DATABASELOCAL)
#             else:
#                 conn = psycopg2.connect(DATABASECLOUD)
#         except:
#             print("I am unable to connect to the database") 

#         cur=conn.cursor()
#         res_json=None
#         res_vals=None
#         res=cur.execute(""" call noder.list_attribvals(%s,%s,%s)""",[json.dumps(datain),res_vals,res_json])    
#         conn.commit()
#         result=cur.fetchall()
#         return result
    
#     @classmethod
#     def list_nodes(cls , datain):
#         try:
#             if(CONNTYPE)=='LOCAL':
#                 conn = psycopg2.connect(DATABASELOCAL)
#             else:
#                 conn = psycopg2.connect(DATABASECLOUD)
#         except:
#             print("I am unable to connect to the database") 

#         cur=conn.cursor()
#         res_json=None
#         res_vals=None
#         res=cur.execute(""" call noder.list_node(%s,%s,%s)""",[json.dumps(datain),res_vals,res_json])    
#         conn.commit()
#         result=cur.fetchall()
#         return result


        








    
    

# class RevokedTokenModel(db.Model):
#     __tablename__ = 'revoked_tokens'
#     id = db.Column(db.Integer, primary_key = True)
#     jti = db.Column(db.String(120))
    
#     def add(self):
#         db.session.add(self)
#         db.session.commit()
    
#     @classmethod
#     def is_jti_blacklisted(cls, jti):
#         query = cls.query.filter_by(jti = jti).first()
#         return bool(query)
