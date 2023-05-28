import jwt
from functools import wraps
from flask import request, jsonify
import config
from models.user import User
from models.base import db


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing'}, 401)

        try:
            data = jwt.decode(token, config.SECRET_KEY, algorithms='HS256')
            user = db.session.query(User).filter_by(id=data['userId']).first()
        except:
            return jsonify({'message': 'Token is invalid'}, 401)
        return f(user, *args, **kwargs)
    return decorated