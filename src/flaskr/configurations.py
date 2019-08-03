class BaseConfig(object):
 '''
 Base config class
 '''
 DEBUG = True
 TESTING = False
 MAIL_FROM_EMAIL = "jinesh.kallunkathariyil@gmail.com" # For use in application emails
class ProductionConfig(BaseConfig):
 """
 Production specific config
 """
 DEBUG = False
class DevelopmentConfig(BaseConfig):
 """
 Development environment specific configuration
 """
 DEBUG = True
 TESTING = True
