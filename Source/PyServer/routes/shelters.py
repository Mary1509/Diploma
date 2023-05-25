from flask import Blueprint
from controllers.shelterController import *

blueprint = Blueprint('shelters', __name__)

blueprint.route('/', methods=['GET'])(index)