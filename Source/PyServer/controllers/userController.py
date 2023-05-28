import jwt
from flask import request, jsonify, make_response
import hashlib

import config
from models.user import User
from models.base import db
from models.address import Address
from models.shelter import Shelter, shelter_user_association
# from models.favourites import Favourites
from services.tokenGenerator import token_required


def index():
    return 'Users index'


def login():
    creds = request.json

    if not creds or not creds['email'] or not creds['password']:
        return make_response('Credentials error', 401)

    user = db.session.query(User).filter(User.email == creds['email']).first()

    if hashlib.md5(creds['password'].encode()).hexdigest() == user.password:
        token = jwt.encode({
            'userId': user.id,
        }, config.SECRET_KEY)
        return make_response({'token': token}, 200)

    return make_response('Invalid password', 403)



def register():
    return 'Register logic'


@token_required
def getUserById(user):
    return user.as_dict()


@token_required
def getUserFavourites(user):
    res = []
    for shelter in user.shelters:
        address = db.session.query(Address).filter(Address.id == shelter.addressId).first().as_dict()
        if not address['houseNumber'] is None:
            address_str = str(address['street']) + ', ' + str(address['houseNumber'])
        else:
            address_str = str(address['street'])
        res.append({
            'id': shelter.id,
            'address': address_str,
        })
    return make_response(jsonify(res), 200)


@token_required
def addUserFavourite(user_id, shel_id):
    return 'Add user favourite'

@token_required
def delUserFavourite(user_id, shel_id):
    return 'Del user favourite'


@token_required
def getUserLocations(user):
    res = []
    for location in user.locations:
        res.append(location.as_dict())
    return make_response(jsonify(res), 200)


@token_required
def getUserLocation(user, id):
    res = []
    for location in user.locations:
        if location.id == id:
            res.append(location.as_dict())
            return make_response(jsonify(res), 200)
    return make_response(jsonify({}), 404)

@token_required
def addUserLocation(user_id):
    return 'Add user favourite'

@token_required
def delUserLocation(user, id):
    # print(user.locations)
    # for location in user.locations:
    #     if location.id == id:
    #         user.locations.pop(location)
    # print(user.locations)
    return 'Del user favourite'
