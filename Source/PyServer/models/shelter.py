from sqlalchemy import *
from sqlalchemy.orm import relationship, mapped_column
from models.base import Base
# from models.favourites import Favourites


shelter_user_association = Table(
    'shelter_user', Base.metadata,
    Column('userId', Integer, ForeignKey('users.id')),
    Column('shelterId', Integer, ForeignKey('shelters.id'))
)


class Shelter(Base):
    '''shelters'''
    __tablename__='shelters'
    id = Column(Integer,
                Sequence('users_id_seq'),
                primary_key=True,
                server_default=Sequence('users_id_seq').next_value(),
                autoincrement=True)
    longitude = Column(DOUBLE_PRECISION, nullable=False)
    latitude = Column(DOUBLE_PRECISION, nullable=False)
    capacity = Column(Integer, nullable=False)
    hasRamp = Column(Boolean, nullable=False)
    typeId = Column(Integer, ForeignKey('shelter_types.id', onupdate='CASCADE', ondelete='SET NULL'), nullable=False)
    type = relationship("Type", back_populates='shelters')
    purposeId = Column(Integer, ForeignKey('shelter_purposes.id', onupdate='CASCADE', ondelete='SET NULL'), nullable=False)
    addressId = Column(Integer, ForeignKey('addresses.id', onupdate='CASCADE', ondelete='SET NULL'), nullable=False)
    users = relationship('User', secondary=shelter_user_association, back_populates='shelters')

    def __init__(self, longitude, latitude, capacity, hasRamp, typeId, purposeId, addressId):
        self.longitude = longitude
        self.latitude = latitude
        self.capacity = capacity
        self.hasRamp = hasRamp
        self.typeId = typeId
        self.purposeId = purposeId
        self.addressId = addressId

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


