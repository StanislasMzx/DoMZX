from flask import g, current_app
from werkzeug.security import generate_password_hash
import click
import sqlite3

DATABASE = "domzx.db"


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def init_db():
    with current_app.app_context():
        db = get_db()
        with current_app.open_resource("database_schema.txt", mode="r") as f:
            db.cursor().executescript(f.read())
        db.commit()

        if len(query_db("select * from users")) == 0:
            update_db(
                "insert into users values (?, ?, ?, ?, ?);",
                (
                    "admin",
                    generate_password_hash("admin"),
                    "admin",
                    None,
                    "https://cdn.ebaumsworld.com/mediaFiles/picture/1151541/84693449.png",
                ),
            )


@click.command("init-db")
def init_db_command():
    """
    Initialise la BDD avec un utilisateur admin si elle est vide
    """
    init_db()
    click.echo("Initialized the database.")


def init_app(app):
    app.cli.add_command(init_db_command)


def query_db(query, args=(), one=False):
    """
    Retourne les tuples correspondants à la requête request avec les arguments éventuels args
    """
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def update_db(request, args=[]):
    """
    Modifie la BD avec la requête request avec les arguments éventuels args
    """
    c = get_db().cursor()
    c.execute(request, args)
    get_db().commit()
