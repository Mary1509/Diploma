from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.misc import blueprint as misc_blueprint
from routes.shelters import blueprint as shelters_blueprint
from routes.users import blueprint as users_blueprint


def create_app():
    db = SQLAlchemy()
    app = Flask(__name__)
    app.config.from_object('config')
    db.init_app(app)
    return app


app = create_app()

# Register blueprints
app.register_blueprint(misc_blueprint, url_prefix='/misc')
app.register_blueprint(shelters_blueprint, url_prefix='/shelters')
app.register_blueprint(users_blueprint, url_prefix='/users')

@app.route("/")
def hello():

    return "Hello world"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4567, debug=True)
