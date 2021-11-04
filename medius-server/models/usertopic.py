from sqlalchemy import Column, Integer, Float
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKey

from db.base_class import Base

class UserTopic(Base):
    user_id = Column(Integer, ForeignKey("User.user_id"), primary_key=True)
    topic_id = Column(Integer, ForeignKey("Topic.topic_id"), primary_key=True)
    score = Column(Float)