from sqlalchemy import *
from sqlalchemy.orm import relationship

from base import Base


class Address(Base):
    """addresses"""
    __tablename__ = 'addresses'
    id = Column(Integer,
                Sequence('addresses_id_seq'), primary_key=True, server_default=Sequence('addresses_id_seq').next_value())
    street = Column(Text, nullable=False)
    houseNumber = Column(VARCHAR, nullable=False)
    shelters = relationship("Shelter", backref='Address', passive_deletes=True)