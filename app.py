from flask import Flask, send_from_directory, g
from flask_restful import Api
from flask_cors import CORS  # comment this on deployment
from api.DomzxApi import Login, Logout, Auth, WhoAmI
from flask_jwt_extended import JWTManager
from datetime import timedelta


app = Flask(__name__, static_url_path='', static_folder='frontend/dist')

CORS(app, supports_credentials=True)  # comment this on deployment
api = Api(app)
app.config["JWT_SECRET_KEY"] = "6744a712-b801-4d9f-b73b-24760f8c277d"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
jwt = JWTManager(app)


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(Auth, '/api/auth')
api.add_resource(WhoAmI, '/api/whoami')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
