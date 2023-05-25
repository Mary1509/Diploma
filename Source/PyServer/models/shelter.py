from sqlalchemy import *

from base import Base


class Shelter(Base):
    '''shelters'''
    __tablename__='shelters'
    id = Column(Integer,
                Sequence('users_id_seq'),
                primary_key=True,
                server_default=Sequence('users_id_seq').next_value())
    longitude = Column(DOUBLE_PRECISION, nullable=False)
    latitude = Column(DOUBLE_PRECISION, nullable=False)
    capacity = Column(Integer, nullable=False)
    hasRamp = Column(Boolean, nullable=False)
    typeId = Column(Integer, ForeignKey('Type.id', onupdate='CASCADE', ondelete='SET NULL'), nullable=False)
    purposeId = Column(Integer, ForeignKey('Purpose.id', onupdate='CASCADE', ondelete='SET NULL'), nullable=False)
    addressId = Column(Integer, ForeignKey('Address.id', onupdate='CASCADE', ondelete='SET NULL'), nullable=False)


shelter_user_association = Table(
    'shelter_user', Base.metadata,
    Column('userId', Integer, ForeignKey('User.id')),
    Column('shelterId', Integer, ForeignKey('Shelter.id'))
)