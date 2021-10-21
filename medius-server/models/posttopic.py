from sqlalchemy import Column, Integer, Float
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import null

from db.base_class import Base

class PostTopic(Base):
    post_id = Column(Integer, primary_key=True)
    topic_id = Column(Integer, primary_key=True)
    score = Column(Float)