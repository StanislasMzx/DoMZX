from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask import g
from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash

import sqlite3

DATABASE = 'domzx.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def request_db(request, args=[]):
    """
    Retourne les tuples correspondants à la requête request avec les arguments éventuels args
    """
    c = get_db().cursor()
    c.execute(request, args)
    return c.fetchall()


def update_db(request, args=[]):
    """
    Modifie la BD avec la requête request avec les arguments éventuels args
    """
    c = get_db().cursor()
    c.execute(request, args)
    get_db().commit()


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)

        args = parser.parse_args()

        request_username = args['username']
        request_password = args['password']

        user = request_db(
            'select * from users where username = ?', [request_username])
        if user == []:
            return {"msg": "Bad username"}, 401

        password = check_password_hash(user[0][1], request_password)
        if not (password):
            return {"msg": "Bad password"}, 401

        access_token = create_access_token(identity=request_username)
        return {"access_token": access_token}


class Protected(Resource):
    decorators = [jwt_required()]

    def post(self):
        current_user = get_jwt_identity()
        return {"logged_in_as": current_user}, 200
