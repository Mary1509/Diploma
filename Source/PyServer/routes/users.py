from flask import Blueprint
from controllers.userController import *

blueprint = Blueprint('user', __name__)

blueprint.route('/', methods=['GET'])(index)
blueprint.route('/login', methods=['POST'])(login)
blueprint.route('/get', methods=['GET'])(getUserById)
blueprint.route('/register', methods=['POST'])(register)
blueprint.route('/favourites', methods=['GET'])(getUserFavourites)
blueprint.route('/favourites/isFavourite/<int:id>', methods=['GET'])(isUserFavourite)
blueprint.route('/favourites/add/<int:id>', methods=['POST'])(addUserFavourite)
blueprint.route('/favourites/del/<int:id>', methods=['POST'])(delUserFavourite)
blueprint.route('/locations', methods=['GET'])(getUserLocations)
blueprint.route('/locations/<int:id>', methods=['GET'])(getUserLocation)
blueprint.route('/locations/add', methods=['POST'])(addUserLocation)
blueprint.route('/locations/del/<int:id>', methods=['POST'])(delUserLocation)
