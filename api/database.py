from flask import g
import sqlite3

DATABASE = 'domzx.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


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
