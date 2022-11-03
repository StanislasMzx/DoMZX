from flask import Flask, send_from_directory, g
from flask_restful import Api
from flask_cors import CORS  # comment this on deployment
from api.DomzxApi import Login, Logout, Auth, WhoAmI, EquipmentList, ModifyProfile, UsersList
from flask_jwt_extended import JWTManager
from datetime import timedelta


app = Flask(__name__, static_url_path='', static_folder='frontend/dist')

CORS(app, supports_credentials=True)  # comment this on deployment
api = Api(app)
app.config["JWT_SECRET_KEY"] = "85dddac8-5db6-451d-911c-f053216371e3"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_CSRF_IN_COOKIES"] = True
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
api.add_resource(EquipmentList, '/api/equipment_list')
api.add_resource(ModifyProfile, '/api/modify_profile')
api.add_resource(UsersList, '/api/users_list')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
