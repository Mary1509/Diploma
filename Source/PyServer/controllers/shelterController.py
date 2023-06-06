from flask import jsonify, make_response, request
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text

from models import shelter, base, address, type, purpose


db = base.db


def index():
    return 'Shelters index'


def shelters():
    shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address).all()
    res = []
    for shelter_res, address_res in shelters:
        dict_shelter = shelter_res.as_dict()
        dict_address = address_res.as_dict()
        if not dict_address['houseNumber'] is None:
            address_str = str(dict_address['street']) + ', ' + str(dict_address['houseNumber'])
        else:
            address_str = str(dict_address['street'])
        dict = {
            'id': dict_shelter['id'],
            'address': address_str
        }
        res.append(dict)
    return make_response(jsonify(res), 200)
    # return "Shelters"


def sheltersWithFilters():
    types = request.args.getlist('type', None)
    purposes = request.args.getlist('purpose', None)
    hasRamp = request.args.get('hasRamp', None)


    query = ''
    if len(types) > 0:
        types_str = ','.join(types)
        if len(purposes) > 0:
            purposes_str = ','.join(purposes)
            if not hasRamp is None:
                shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address)\
                    .filter(shelter.Shelter.typeId.in_(types[0].split(',')),
                             shelter.Shelter.purposeId.in_(purposes[0].split(',')),
                             shelter.Shelter.hasRamp == hasRamp).all()
            else:
                shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address) \
                    .filter(shelter.Shelter.typeId.in_(types[0].split(',')),
                            shelter.Shelter.purposeId.in_(purposes[0].split(','))).all()
        elif not hasRamp is None:
            shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address) \
                .filter(shelter.Shelter.typeId.in_(types[0].split(',')), shelter.Shelter.hasRamp == hasRamp).all()
        else:
            shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address) \
                .filter(shelter.Shelter.typeId.in_(types[0].split(','))).all()
    elif len(purposes) > 0:
        purposes_str = ','.join(purposes)
        if not hasRamp is None:
            shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address) \
                        .filter(shelter.Shelter.purposeId.in_(purposes[0].split(',')), shelter.Shelter.hasRamp == hasRamp).all()
        else:
            shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address) \
                        .filter(shelter.Shelter.purposeId.in_(purposes[0].split(','))).all()
    else:
        shelters = db.session.query(shelter.Shelter, address.Address).join(address.Address) \
                    .filter(shelter.Shelter.hasRamp == hasRamp).all()


    res = []
    for shelter_res, address_res in shelters:
        dict_shelter = shelter_res.as_dict()
        dict_address = address_res.as_dict()
        if not dict_address['houseNumber'] is None:
            address_str = str(dict_address['street']) + ', ' + str(dict_address['houseNumber'])
        else:
            address_str = str(dict_address['street'])
        dict = {
            'id': dict_shelter['id'],
            'address': address_str
        }
        res.append(dict)
    return make_response(jsonify(res), 200)


def getShelterById(id):
    query = text(f"""SELECT  sh.id, latitude, longitude, concat(addresses."street", ', ', addresses."houseNumber") AS address, 
                     shelter_types.type AS type, 
                     shelter_purposes.purpose AS purpose, capacity, sh."hasRamp"
                     FROM shelters sh
                     INNER JOIN addresses ON "addressId" = addresses.id
                     INNER JOIN shelter_types ON "typeId" = shelter_types.id
                     INNER JOIN shelter_purposes ON "purposeId" = shelter_purposes.id
                     WHERE sh.id = {id}""")
    shelter_res = db.session.execute(query).first()
    res = {}
    if not shelter_res is None:
        res = {
            'id': shelter_res[0],
            'latitude': shelter_res[1],
            'longitude': shelter_res[2],
            'address': shelter_res[3],
            'type': shelter_res[4],
            'purpose': shelter_res[5],
            'capacity': shelter_res[6],
            'hasRamp': shelter_res[7]
        }
    else:
        return make_response(jsonify(res), 404)
    return make_response(jsonify(res), 200)


def addShelter(id=-1):
    shelter_raw = request.json
    print(shelter_raw)

    address_raw = shelter_raw['address']
    address_arr = address_raw.split(',')
    old_address = db.session.query(address.Address).filter(address.Address.street == address_arr[0],
                                                         address.Address.houseNumber == address_arr[1]).first()
    if old_address is None:
        address_model = address.Address(street=address_arr[0],
                                house_number=address_arr[1])
        try:
            db.session.add(address_model)
            db.session.commit()
        except Exception as err:
            print(err)
            return make_response(jsonify({'message': 'Error syncing with db', 'error': f'{err}'}), 503)
    else:
        address_model = old_address

    if id is not -1:
        old_shelter = db.session.query(shelter.Shelter).filter(shelter.Shelter.id == id).first()
        shelter_type = db.session.query(type.Type).filter(type.Type.id == shelter_raw['type']).first()
        shelter_purpose = db.session.query(purpose.Purpose).filter(purpose.Purpose.id == shelter_raw['purpose']).first()
        old_shelter.latitude = shelter_raw['latitude']
        old_shelter.longitude = shelter_raw['longitude']
        old_shelter.capacity = shelter_raw['capacity']
        old_shelter.hasRamp = shelter_raw['hasRamp']
        shelter_type.shelters.append(old_shelter)
        shelter_purpose.shelters.append(old_shelter)
        address_model.shelters.append(old_shelter)
        try:
            db.session.commit()
            return make_response(jsonify({'message': 'Successfully updated'}), 201)
        except SQLAlchemyError as err:
            print(err)
            return make_response(jsonify({'message': 'Error syncing with db', 'error': f'{err}'}), 503)

    shelter_new = shelter.Shelter(latitude=shelter_raw['latitude'],
                                  longitude=shelter_raw['longitude'],
                                  capacity=shelter_raw['capacity'],
                                  hasRamp=shelter_raw['hasRamp'],
                                  typeId=shelter_raw['type'],
                                  purposeId=shelter_raw['purpose'],
                                  addressId=address_model.id)
    try:
        db.session.add(shelter_new)
        db.session.commit()
        return make_response(jsonify({'message': 'Successfully added'}), 201)
    except SQLAlchemyError as err:
        print(err)
        return make_response(jsonify({'message': 'Error syncing with db', 'error': f'{err}'}), 503)


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
