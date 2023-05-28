from sqlalchemy import *
from sqlalchemy.orm import relationship

from models.base import Base
from models.shelter import shelter_user_association
from models.location import Location
# from models.favourites import Favourites


class User(Base):
    '''users'''
    __tablename__='users'
    id = Column(Integer,
                Sequence('users_id_seq'),
                primary_key=True,
                server_default=Sequence('users_id_seq').next_value(),
                autoincrement=True)
    email = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    displayName = Column(Text, nullable=False)
    locations = relationship("Location", backref='users', passive_deletes=True)
    shelters = relationship('Shelter', secondary=shelter_user_association)

    def __init__(self, id, email, password, display_name):
        self.id = id
        self.email = email
        self.password = password
        self.displayName = display_name

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
