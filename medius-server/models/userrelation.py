from sqlalchemy import Column, Integer, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKey

from db.base_class import Base

class UserRelation(Base):
    user_id_1 = Column(Integer, ForeignKey("User.user_id"), primary_key=True)
    user_id_2 = Column(Integer, ForeignKey("User.user_id"), primary_key=True)
    is_following = Column(Boolean)
    is_blocked = Column(Boolean)