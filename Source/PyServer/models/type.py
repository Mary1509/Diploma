from sqlalchemy import *
from sqlalchemy.orm import relationship

from models.base import Base


class Type(Base):
    '''shelter_types'''
    __tablename__='shelter_types'
    id = Column(Integer,
                Sequence('shelter_types_id_seq'),
                primary_key=True,
                server_default=Sequence('shelter_types_id_seq').next_value(),
                autoincrement=True)
    type = Column(Text, nullable=False)
    shelters = relationship("Shelter", back_populates='type')

    def __init__(self, id, type):
        self.id = id
        self.type = type

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
