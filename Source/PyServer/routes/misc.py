from flask import Blueprint
from controllers.miscController import *

blueprint = Blueprint('misc', __name__)

blueprint.route('/', methods=['GET'])(index)
blueprint.route('/nearest', methods=['GET'])(getNearestShelters)
blueprint.route('/nearest/filters', methods=['GET'])(getNearestSheltersWithFilters)
blueprint.route('/types', methods=['GET'])(getTypes)
blueprint.route('/purposes', methods=['GET'])(getPurposes)
blueprint.route('/address/add', methods=['POST'])(addAddress)
blueprint.route('/address/add/<int:id>', methods=['POST'])(addAddress)
