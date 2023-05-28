from sqlalchemy import *
from sqlalchemy.dialects.postgresql import MONEY
from sqlalchemy.orm import relationship, backref

from models.base import Base


class Purpose(Base):
    '''shelter_purposes'''
    __tablename__='shelter_purposes'
    id = Column(Integer,
                Sequence('shelter_purposes_id_seq'),
                primary_key=True,
                server_default=Sequence('shelter_purposes_id_seq').next_value(),
                autoincrement=True)
    purpose = Column(Text, nullable=False)
    shelters = relationship("Shelter", backref='purposes', passive_deletes=True)

    def __init__(self, id, purpose):
        self.id = id
        self.purpose = purpose

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
