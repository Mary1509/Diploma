from flask import Blueprint
from controllers.miscController import *

blueprint = Blueprint('misc', __name__)

blueprint.route('/', methods=['GET'])(index)
blueprint.route('/nearest', methods=['GET'])(getNearestShelters)
blueprint.route('/nearest/filters', methods=['GET'])(getNearestSheltersWithFilters)
