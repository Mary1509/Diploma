from flask import Blueprint
from controllers.miscController import *

blueprint = Blueprint('misc', __name__)

blueprint.route('/', methods=['GET'])(index)