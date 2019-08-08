from www import app
#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
#app.run()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)

