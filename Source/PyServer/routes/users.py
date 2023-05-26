from flask import Blueprint
from controllers.userController import *

blueprint = Blueprint('user', __name__)

blueprint.route('/', methods=['GET'])(index)