from sqlalchemy import *
from sqlalchemy.orm import relationship

from base import Base


class User(Base):
    '''users'''
    __tablename__='users'
    id = Column(Integer,
                Sequence('users_id_seq'),
                primary_key=True,
                server_default=Sequence('users_id_seq').next_value())
    email = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    displayName = Column(Text, nullable=False)
    locations = relationship("Location", backref='User', passive_deletes=True)

    def __init__(self, id, email, password, display_name):
        self.id = id
        self.email = email
        self.password = password
        self.displayName = display_name
