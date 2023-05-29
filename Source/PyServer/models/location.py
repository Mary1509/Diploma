from sqlalchemy.orm import relationship
from sqlalchemy import *

from models.base import Base


class Location(Base):
    """user_location"""
    __tablename__ = 'user_location'
    id = Column(Integer,
                Sequence('user_location_id_seq'),
                primary_key=True,
                server_default=Sequence('user_location_id_seq').next_value(),
                autoincrement=True)
    longitude = Column(DOUBLE_PRECISION, nullable=False)
    latitude = Column(DOUBLE_PRECISION, nullable=False)
    alias = Column(Text, nullable=False)
    userId = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), nullable=False)

    def __init__(self, longitude, latitude, alias, user_id):
        self.longitude = longitude
        self.latitude = latitude
        self.alias = alias
        self.userIdd = user_id

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
