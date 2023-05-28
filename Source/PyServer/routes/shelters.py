from flask import Blueprint
from controllers.shelterController import *

blueprint = Blueprint('shelters', __name__)

blueprint.route('/', methods=['GET'])(index)
blueprint.route('/all', methods=['GET'])(shelters)
blueprint.route('/all/filters', methods=['GET'])(sheltersWithFilters)
blueprint.route('/<int:id>', methods=['GET'])(getShelterById)
blueprint.route('/add/<int:id>', methods=['POST'])(addShelter)
blueprint.route('/add', methods=['POST'])(addShelter)
blueprint.route('/del/<int:id>', methods=['POST'])(delShelter)