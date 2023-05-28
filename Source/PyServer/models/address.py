from sqlalchemy import *
from sqlalchemy.orm import relationship

from models.base import Base


class Address(Base):
    """addresses"""
    __tablename__ = 'addresses'
    id = Column(Integer,
                Sequence('addresses_id_seq'), primary_key=True,
                server_default=Sequence('addresses_id_seq').next_value(),
                autoincrement=True)
    street = Column(Text, nullable=False)
    houseNumber = Column(VARCHAR, nullable=False)
    shelters = relationship("Shelter", backref='addresses', passive_deletes=True)

    def __init__(self, street, house_number):
        self.street = street
        self.houseNumber = house_number

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
