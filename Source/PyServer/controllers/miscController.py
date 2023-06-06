from services import nearest
from flask import request, jsonify, make_response
from models.base import db
from models.type import Type
from models.address import Address
from models.purpose import Purpose
from sqlalchemy.sql import text


def index():
    return 'Misc index'


def getNearestShelters():
    lat = request.args.get('lat', None)
    lng = request.args.get('lng', None)
    query = text(f"""SELECT  sh.id, latitude, longitude, concat(addresses."street", ', ', addresses."houseNumber") AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}), ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
    FROM shelters sh
    INNER JOIN addresses ON "addressId" = addresses.id
    WHERE
    earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
    AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000""")
    shelters = db.session.execute(query).all()
    shelters_coords = nearest.findNearest((lat, lng), shelters)
    res = []
    if len(shelters_coords) > 0:
        for coord in shelters_coords:
            dict = {
                'id': coord[0],
                'latitude': coord[1],
                'longitude': coord[2],
                'address': coord[3],
                'distance': coord[4]
            }
            res.append(dict)
    return make_response(jsonify(res), 200)


def getNearestSheltersWithFilters():
    lat = request.args.get('lat', None)
    lng = request.args.get('lng', None)
    types = request.args.getlist('type', None)
    purposes = request.args.getlist('purpose', None)
    hasRamp = request.args.get('hasRamp', None)

    query = ''
    if len(types) > 0:
        types_str = ','.join(types)
        if len(purposes) > 0:
            purposes_str = ','.join(purposes)
            if not hasRamp is None:
                 query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                                  AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                                  FROM shelters sh
                                  INNER JOIN addresses ON "addressId" = addresses.id
                                  WHERE
                                  earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                                  AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                                  AND "typeId" IN ({types_str})
                                  AND "purposeId" IN ({purposes_str})
                                  AND "hasRamp" = {hasRamp}""")
            else:
                query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                                 AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                                 FROM shelters sh
                                 INNER JOIN addresses ON "addressId" = addresses.id
                                 WHERE
                                 earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                                 AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                                 AND "typeId" IN ({types_str})
                                 AND "purposeId" IN ({purposes_str})""")
        elif not hasRamp is None:
            query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                             AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters sh
                             INNER JOIN addresses ON "addressId" = addresses.id
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                             AND "typeId" IN ({types_str})
                             AND "hasRamp" = {hasRamp}""")
        else:
            query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                             AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters sh
                             INNER JOIN addresses ON "addressId" = addresses.id
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                             AND "typeId" IN ({types_str})""")
    elif len(purposes) > 0:
        purposes_str = ','.join(purposes)
        if not hasRamp is None:
            query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                             AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters sh
                             INNER JOIN addresses ON "addressId" = addresses.id
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                             AND "purposeId" IN ({purposes_str})
                             AND "hasRamp" = {hasRamp}""")
        else:
            query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                             AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters sh
                             INNER JOIN addresses ON "addressId" = addresses.id
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                             AND "purposeId" IN ({purposes_str})""")
    else:
        query = text(f"""SELECT  sh.id, latitude, longitude, 
                                          concat(addresses."street", ', ', addresses."houseNumber")
                          AS address, ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                                    ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                          FROM shelters sh
                          INNER JOIN addresses ON "addressId" = addresses.id
                          WHERE
                          earth_box(ll_to_earth ({lat},{lng}), 10000) @> ll_to_earth (latitude, longitude)
                          AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 10000
                          AND "hasRamp" = {hasRamp}""")
    shelters = db.session.execute(query).all()
    if len(shelters) > 0:
        shelters_coords = nearest.findNearest((lat, lng), shelters)
        res = []
        if len(shelters_coords) > 0:
            for coord in shelters_coords:
                dict = {
                    'id': coord[0],
                    'latitude': coord[1],
                    'longitude': coord[2],
                    'address': coord[3],
                    'distance': coord[4]
                }
                res.append(dict)
        return make_response(jsonify(res), 200)
    else:
        return make_response(jsonify({}), 200)


def getTypes():
    types = db.session.query(Type).all()
    res = []
    for type in types:
        dict = type.as_dict()
        res.append(dict)
    return make_response(jsonify(res), 200)


def getPurposes():
    purposes = db.session.query(Purpose).all()
    res = []
    for purpose in purposes:
        dict = purpose.as_dict()
        res.append(dict)
    return make_response(jsonify(res), 200)


def addAddress():
    address_raw = request.json
    address_model = Address(street=address_raw['street'],
                            house_number=address_raw['houseNumber'])
    try:
        db.session.add(address_model)
        db.session.commit()
        return make_response(jsonify({"id": str(address_model.id)}), 201)
    except Exception as err:
        return make_response(jsonify({"message": err}), 500)