from flask import Blueprint
from controllers.userController import *

blueprint = Blueprint('users', __name__)

blueprint.route('/', methods=['GET'])(index)