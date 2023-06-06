import jwt
from flask import request, jsonify, make_response
import hashlib
from sqlalchemy import exc

import config
from models.user import User
from models.base import db
from models.address import Address
from models.shelter import Shelter, shelter_user_association
from models.location import Location

from services.tokenGenerator import token_required


def index():
    return 'Users index'


def login():
    creds = request.json
    print(creds)

    if not creds or not creds['email'] or not creds['password']:
        return make_response(jsonify({'message': 'Credentials not specified'}), 401)

    user = db.session.query(User).filter(User.email == creds['email']).first()

    if not user:
        return make_response(jsonify({'message': 'Invalid email'}), 404)

    if hashlib.md5(creds['password'].encode()).hexdigest() == user.password:
        token = jwt.encode({
            'userId': user.id,
        }, config.SECRET_KEY)
        return make_response({'token': token}, 200)

    return make_response(jsonify({'message': 'Invalid password'}), 401)


def register():
    creds = request.json

    if not creds or not creds['email'] or not creds['password'] or not creds['displayName']:
        return make_response(jsonify({'message': 'Credentials not specified'}), 401)

    user = db.session.query(User).filter(User.email == creds['email']).first()

    if user:
        return make_response(jsonify({'message': 'User with such email exists'}), 400)

    user = User(email=creds['email'],
                password=hashlib.md5(creds['password'].encode()).hexdigest(),
                display_name=creds['displayName'])
    try:
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'Successfully registered'}), 201)
    except exc.SQLAlchemyError as err:
        print(err)
        return make_response(jsonify({'message': 'Error adding to db', 'error': f'{err}'}), 503)


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
def addUserFavourite(user, id):
    shelter = db.session.query(Shelter).filter(Shelter.id == id).first()
    user.shelters.append(shelter)
    try:
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'Successfully added'}), 201)
    except exc.SQLAlchemyError as err:
        print(err)
        return make_response(jsonify({'message': 'Error adding to db', 'error': f'{err}'}), 503)
@token_required
def isUserFavourite(user, id):
    shelter = db.session.query(Shelter).filter(Shelter.id == id).first()
    try:
        ind = user.shelters.index(shelter)
        return make_response(jsonify({'isFavourite': True}), 200)
    except ValueError as err:
        return make_response(jsonify({'isFavourite': False}), 404)


@token_required
def delUserFavourite(user, id):
    shelter = db.session.query(Shelter).filter(Shelter.id == id).first()
    ind = user.shelters.index(shelter)
    user.shelters.pop(ind)
    try:
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'Successfully deleted'}), 201)
    except exc.SQLAlchemyError as err:
        print(err)
        return make_response(jsonify({'message': 'Error syncing with db', 'error': f'{err}'}), 503)


@token_required
def getUserLocations(user):
    res = []
    for location in user.locations:
        res.append(location.as_dict())
    return make_response(jsonify(res), 200)


@token_required
def getUserLocation(user, id):
    res = {}
    for location in user.locations:
        if location.id == id:
            res = location.as_dict()
            return make_response(jsonify(res), 200)
    return make_response(jsonify({}), 404)


@token_required
def addUserLocation(user):
    location_raw = request.json

    if not location_raw or not location_raw['position']['latitude'] or not location_raw['position']['longitude'] \
            or not location_raw['alias']:
        return make_response(jsonify({'message': 'Location parameters not specified'}), 400)

    location = Location(latitude=location_raw['position']['latitude'],
                        longitude=location_raw['position']['longitude'],
                        alias=location_raw['alias'],
                        user_id=user.id)
    user.locations.append(location)
    try:
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'Successfully added'}), 201)
    except exc.SQLAlchemyError as err:
        print(err)
        return make_response(jsonify({'message': 'Error syncing with db', 'error': f'{err}'}), 503)


@token_required
def delUserLocation(user, id):
    location = db.session.query(Location).filter(Location.id == id, Location.userId == user.id).first()
    ind = user.locations.index(location)
    user.locations.pop(ind)
    try:
        db.session.add(user)
        db.session.delete(location)
        db.session.commit()
        return make_response(jsonify({'message': 'Successfully deleted'}), 201)
    except exc.SQLAlchemyError as err:
        print(err)
        return make_response(jsonify({'message': 'Error syncing with db', 'error': f'{err}'}), 503)
