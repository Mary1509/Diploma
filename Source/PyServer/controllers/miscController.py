from services import nearest
from flask import request
from models.base import db
from sqlalchemy.sql import text
from flask import jsonify, make_response


def index():
    return 'Misc index'


def getNearestShelters():
    lat = request.args.get('lat', None)
    lng = request.args.get('lng', None)
    query = text(f"""SELECT  latitude, longitude, ROUND(earth_distance(ll_to_earth({lat},{lng}),
            ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
    FROM shelters
    WHERE
    earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
    AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000""")
    shelters = db.session.execute(query).all()
    shelters_coords = nearest.findNearest((lat, lng), shelters)
    res = []
    if len(shelters_coords) > 0:
        for coord in shelters_coords:
            dict = {
                'latitude': coord[0],
                'longitude': coord[1]
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
                 query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                                  ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                  ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                                  FROM shelters
                                  WHERE
                                  earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                                  AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                                  AND "typeId" IN ({types_str})
                                  AND "purposeId" IN ({purposes_str})
                                  AND "hasRamp" = {hasRamp}""")
            else:
                query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                                 ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                 ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                                 FROM shelters
                                 WHERE
                                 earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                                 AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                                 AND "typeId" IN ({types_str})
                                 AND "purposeId" IN ({purposes_str})""")
        elif not hasRamp is None:
            query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                                              ROUND(earth_distance(ll_to_earth({lat},{lng}),
                                              ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                                              FROM shelters
                                              WHERE
                                              earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                                              AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                                              AND "typeId" IN ({types_str})
                                              AND "hasRamp" = {hasRamp}""")
        else:
            query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                             ROUND(earth_distance(ll_to_earth({lat},{lng}),
                             ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                             AND "typeId" IN ({types_str})""")
    elif len(purposes) > 0:
        purposes_str = ','.join(purposes)
        if not hasRamp is None:
            query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                             ROUND(earth_distance(ll_to_earth({lat},{lng}),
                             ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                             AND "purposeId" IN ({purposes_str})
                             AND "hasRamp" = {hasRamp}""")
        else:
            query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                             ROUND(earth_distance(ll_to_earth({lat},{lng}),
                             ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                             FROM shelters
                             WHERE
                             earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                             AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                             AND "purposeId" IN ({purposes_str})""")
    else:
        query = text(f"""SELECT  latitude, longitude, "typeId", "purposeId", "hasRamp",
                         ROUND(earth_distance(ll_to_earth({lat},{lng}),
                         ll_to_earth(latitude, longitude))::NUMERIC, 2) AS distance
                         FROM shelters
                         WHERE
                         earth_box(ll_to_earth ({lat},{lng}), 1000) @> ll_to_earth (latitude, longitude)
                         AND earth_distance(ll_to_earth ({lat},{lng}), ll_to_earth (latitude, longitude)) < 1000
                         AND "hasRamp" = {hasRamp}""")
    print(query)
    shelters = db.session.execute(query).all()
    if len(shelters) > 0:
        shelters_coords = nearest.findNearest((lat, lng), shelters)
        res = []
        if len(shelters_coords) > 0:
            for coord in shelters_coords:
                dict = {
                    'latitude': coord[0],
                    'longitude': coord[1]
                }
                res.append(dict)
        return make_response(jsonify(res), 200)
    else:
        return make_response(jsonify({}), 200)