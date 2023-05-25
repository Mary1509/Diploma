from sqlalchemy import *
from sqlalchemy.orm import relationship

from base import Base


class Type(Base):
    '''shelter_types'''
    __tablename__='shelter_types'
    id = Column(Integer,
                Sequence('shelter_types_id_seq'),
                primary_key=True,
                server_default=Sequence('shelter_types_id_seq').next_value())
    type = Column(Text, nullable=False)
    shelters = relationship("Shelter", backref='Type', passive_deletes=True)
