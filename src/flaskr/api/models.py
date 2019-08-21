# from run import db
from passlib.hash import pbkdf2_sha256 as sha256
import psycopg2
import json


DATABASELOCAL="dbname='postgres' user='postgres' host='localhost' password='Antiquity@1'"
DATABASECLOUD="dbname='gqdhjhdi' user='gqdhjhdi' host='john.db.elephantsql.com' password='a7obAswTJ2i4Pe9sCvUnKQ2NVFf_TwVH'"
# CONNTYPE='LOCAL'
CONNTYPE='CLOUD'
class UserModel():
    @classmethod
    def add_user(cls,authtype,email, password):
        conn=None
        try:
            # conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Antiquity@1'")
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
           
            print("conn successfull")
        except:
            print("I am unable to connect to the database")
           
        
        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call noder.add_user(%s,%s,%s,%s)""",[authtype,email,password,res_json])
        data=cur.fetchall()
        # cur.execute("""SELECT datname from pg_database""")
        conn.commit()
        conn.close()
        return data

    @classmethod
    def user_auth(cls,username, password,sessiondata):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database")        
        cur=conn.cursor()
        res_json =None
        sessionid =None
        res=cur.execute(""" call noder.userauth(%s,%s,%s,%s,%s)""",[username,password,json.dumps(sessiondata) ,sessionid,res_json])
        data=cur.fetchall()
        conn.commit()
        conn.close()
        return data


class TokenModel():
    @classmethod
    def insert_tokens(cls, tokendata):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database")        
        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call noder.insert_token(%s,%s)""",[json.dumps(tokendata),res_json])
        data=cur.fetchall()
        print(data)
        conn.commit()
        conn.close()
        return data

    @classmethod
    def update_tokens(cls , tokendata):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database")        
        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call noder.update_token(%s,%s)""",[tokendata,res_json])
        data=cur.fetchall()

        print(data)
        conn.commit()
        conn.close()
        return data

class NodeModel():

    @classmethod
    def create_node(cls, nodedata):
       
        try:
            if(CONNTYPE)=='LOCAL':
                conn=psycopg2.connect(DATABASELOCAL)
            else:
                conn=psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database")        
        cur=conn.cursor()
        res_json=None   
        res=cur.execute(""" call noder.create_node(%s,%s)""",[json.dumps(nodedata),res_json])
        data=cur.fetchall()       
        conn.commit()
        conn.close()
        return data

    
    @classmethod
    def list_nodeattribs(cls,datain):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database") 

        cur=conn.cursor()
        res_json=None   
        attribs=None  
        res=cur.execute(""" call noder.list_attribs(%s,%s,%s)""",[json.dumps(datain),attribs,res_json])    
        result=cur.fetchall()
        conn.commit()
        conn.close()
        return result    
    
    @classmethod
    def add_nodeattribs(cls, datain):
        try:
            if(CONNTYPE)=='LOCAL':
                conn=psycopg2.connect(DATABASELOCAL)
            else:
                conn=psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database")  
            return    

        cur=conn.cursor()
        res_json=None
        res=cur.execute(""" call noder.add_attribs(%s,%s)""",[json.dumps(datain),res_json])    
        conn.commit()
        result=cur.fetchall()
        return result

    @classmethod
    def list_attribvals(cls, datain):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database") 

        cur=conn.cursor()
        res_json=None
        res_vals=None
        res=cur.execute(""" call noder.list_attribvals(%s,%s,%s)""",[json.dumps(datain),res_vals,res_json])    
        conn.commit()
        result=cur.fetchall()
        return result

    @classmethod
    def get_resource(cls, datain):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database") 

        cur=conn.cursor()
        res_json=None
        res_vals=None
        res=cur.execute(""" call noder.get_resource(%s,%s)""",[json. dumps(datain),res_vals])    
        conn.commit()
        result=cur.fetchone()
        return result[0]

    @classmethod
    def create_resource   (cls, datain):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database") 

        cur=conn.cursor()
        res_json=None
        res_vals=None
        res=cur.execute(""" call noder.get_resource(%s,%s)""",[json.dumps(datain),res_vals])    
        conn.commit()
        result=cur.fetchone()
        return result[0]



    
    # @classmethod
    # def list_nodes(cls , datain):
    #     try:
    #         if(CONNTYPE)=='LOCAL':
    #             conn = psycopg2.connect(DATABASELOCAL)
    #         else:
    #             conn = psycopg2.connect(DATABASECLOUD)
    #     except:
    #         print("I am unable to connect to the database") 

    #     cur=conn.cursor()
    #     res_json=None
    #     res_vals=None
    #     res=cur.execute(""" call noder.list_node(%s,%s,%s)""",[json.dumps(datain),res_vals,res_json])    
    #     conn.commit()
    #     result=cur.fetchall()
    #     return result

    @classmethod
    def list_nodes(cls , datain):
        try:
            if(CONNTYPE)=='LOCAL':
                conn = psycopg2.connect(DATABASELOCAL)
            else:
                conn = psycopg2.connect(DATABASECLOUD)
        except:
            print("I am unable to connect to the database") 

        cur=conn.cursor()
        res_json=None
        res_vals=None
        res=cur.execute(""" call noder.listnodes(%s,%s)""",[json.dumps(datain),res_vals])    
        conn.commit()
        result=cur.fetchone()
        return result[0]

    

    


        








    
    

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