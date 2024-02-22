from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask import jsonify
from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash

from api.database import *
from api.gpioControl import *


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("password", type=str)

        args = parser.parse_args()

        request_username = args["username"]
        request_password = args["password"]

        user = query_db(
            "select * from users where username = ?", (request_username,), one=True
        )
        if user == None:
            return {"msg": "Nom d'utilisateur incorrect"}, 401

        password = check_password_hash(user[1], request_password)
        if not (password):
            return {"msg": "Mot de passe incorrect"}, 401

        access_token = create_access_token(identity=request_username)
        response = jsonify({"logged_in": True})
        set_access_cookies(response, access_token)
        return response


class Logout(Resource):
    decorators = [jwt_required()]

    def post(self):
        response = jsonify({"logged_in": False})
        unset_jwt_cookies(response)
        return response


class WhoAmI(Resource):
    decorators = [jwt_required()]

    def get(self):
        current_user = query_db(
            "select * from users where username = ?", (get_jwt_identity(),), one=True
        )
        return jsonify(
            {
                "username": current_user[0],
                "rights": current_user[2],
                "expiration": current_user[3],
                "imageUrl": current_user[4],
            }
        )


class ModifyProfile(Resource):
    decorators = [jwt_required()]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("imageUrl", type=str)
        parser.add_argument("oldPassword", type=str)
        parser.add_argument("newPassword", type=str)
        parser.add_argument("confirmPassword", type=str)

        args = parser.parse_args()

        request_imageUrl = args["imageUrl"]
        request_oldPassword = args["oldPassword"]
        request_newPassword = args["newPassword"]
        request_confirmPassword = args["confirmPassword"]

        user = query_db(
            "select * from users where username = ?", (get_jwt_identity(),), one=True
        )
        changes = {"imageUrl": False, "password": False}
        if request_imageUrl != "":
            update_db(
                "update users set imageUrl = ? where username = ?",
                [request_imageUrl, user[0]],
            )
            changes["imageUrl"] = True
        if request_oldPassword != "":
            if (
                request_newPassword != ""
                and request_confirmPassword != ""
                and (request_newPassword == request_confirmPassword)
            ):
                if check_password_hash(user[1], request_oldPassword):
                    update_db(
                        "update users set password = ? where username = ?",
                        [generate_password_hash(request_newPassword), user[0]],
                    )
                    changes["password"] = True
                else:
                    return {"msg": "Mot de passe actuel incorrect"}, 401
            else:
                return {"msg": "Nouveau mot(s) de passe incorrect(s)"}, 401
        return jsonify(changes)


class UsersList(Resource):
    decorators = [jwt_required()]

    def get(self):
        current_user = get_jwt_identity()
        if (
            query_db(
                "select rights from users where username = ?", (current_user,), one=True
            )[0]
            != "admin"
        ):
            return {"msg": "Vous n'avez pas les droits admin"}, 403
        users = query_db("select * from users")
        for i, e in enumerate(users):
            users[i] = {
                "username": e[0],
                "rights": e[2],
                "expiration": e[3],
                "imageUrl": e[4],
            }
        return jsonify(users)


class EquipmentList(Resource):
    decorators = [jwt_required()]

    def get(self):
        equipment = query_db("select * from wiring")
        return equipment_state(equipment)


class TriggerEquipment(Resource):
    decorators = [jwt_required()]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("equipmentId", type=int)

        args = parser.parse_args()

        request_equipmentId = args["equipmentId"]

        equipment = query_db(
            "select * from wiring where equipmentId = ?",
            (request_equipmentId,),
            one=True,
        )
        trigger_equipment(equipment[2], checkState=equipment[3])
        update_db(
            "insert into logs(username, equipmentId) values (?, ?)",
            (get_jwt_identity(), request_equipmentId),
        )
        return jsonify({"triggered": True})


class LogsList(Resource):
    decorators = [jwt_required()]

    def get(self):
        logs = query_db(
            "select logs.username, logs.date, wiring.equipmentName from logs join wiring on wiring.equipmentId = logs.equipmentId order by logs.date desc"
        )
        for i, e in enumerate(logs):
            logs[i] = {"username": e[0], "date": e[1], "equipmentName": e[2]}
        return jsonify(logs)


class TimerList(Resource):
    decorators = [jwt_required()]

    def get(self):
        timerList = list_crontab()
        for e in timerList:
            e["equipment_name"] = query_db(
                "select equipmentName from wiring where pin=?",
                (e["equipment_pin"],),
                one=True,
            )
        return jsonify(timerList)


class TimerNew(Resource):
    decorators = [jwt_required()]

    def post(self):
        current_user = get_jwt_identity()
        if (
            query_db(
                "select rights from users where username = ?", (current_user,), one=True
            )[0]
            != "admin"
        ):
            return {"msg": "Vous n'avez pas les droits admin"}, 403

        parser = reqparse.RequestParser()
        parser.add_argument("minute")
        parser.add_argument("hour")
        parser.add_argument("day_of_the_month")
        parser.add_argument("month")
        parser.add_argument("day_of_the_week")
        parser.add_argument("equipment_to_trigger")

        args = parser.parse_args()

        request_minute = args["minute"]
        request_hour = args["hour"]
        request_day_of_the_month = args["day_of_the_month"]
        request_month = args["month"]
        request_day_of_the_week = args["day_of_the_week"]
        request_equipment_to_trigger = args["equipment_to_trigger"]

        moment = f"{request_minute} {request_hour} {request_day_of_the_month} {request_month} {request_day_of_the_week}"
        if "-on" in request_equipment_to_trigger:
            equipment = query_db(
                "select * from wiring where equipmentId=?",
                (request_equipment_to_trigger[:-3],),
                one=True,
            )
            create_cron(moment, equipment[2], equipment[3], 1)
        elif "-off" in request_equipment_to_trigger:
            equipment = query_db(
                "select * from wiring where equipmentId=?",
                (request_equipment_to_trigger[:-4],),
                one=True,
            )
            create_cron(moment, equipment[2], equipment[3], 0)
        else:
            equipment = query_db(
                "select * from wiring where equipmentId=?",
                (request_equipment_to_trigger,),
                one=True,
            )
            create_cron(moment, equipment[2], equipment[3])
        return jsonify({"cron_created": True})


class TimerDelete(Resource):
    decorators = [jwt_required()]

    def post(self):
        current_user = get_jwt_identity()
        if (
            query_db(
                "select rights from users where username = ?", (current_user,), one=True
            )[0]
            != "admin"
        ):
            return {"msg": "Vous n'avez pas les droits admin"}, 403

        parser = reqparse.RequestParser()
        parser.add_argument("cronId", type=str)

        args = parser.parse_args()

        request_cronId = args["cronId"]

        delete_cron(request_cronId)

        return jsonify({"msg": "Tâche supprimée"})
