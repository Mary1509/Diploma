from flask import jsonify, make_response
from sqlalchemy.exc import SQLAlchemyError

from models import shelter, base

db = base.db


def index():
    return 'Shelters index'


def shelters():
    shelters = db.session.query(shelter.Shelter).all()
    res = []
    for shelter_res in shelters:
        dict = shelter_res.as_dict()
        res.append(dict)
    return make_response(jsonify(res), 200)
    # return "Shelters"


def getShelterById(id):
    shelter_res = db.session.query(shelter.Shelter).filter_by(id=int(id)).first()
    res = {}
    if not shelter_res is None:
        res = shelter_res.as_dict()
    else:
        return make_response(jsonify(res), 404)
    return make_response(jsonify(res), 200)


def addShelter(id):
    if id is None:
        return 'Add shelter'
    else:
        return 'Update shelter'


def delShelter(id):
    try:
        shelter_res = db.session.query(shelter.Shelter).filter_by(id=int(id)).delete()
        db.session.commit()
        if shelter_res == 0:
            return make_response(jsonify(shelter_res), 404)
        return make_response(jsonify(shelter_res), 201)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        return make_response(jsonify(error), e.code)
