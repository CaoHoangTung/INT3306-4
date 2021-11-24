from sqlalchemy import Column, Integer, Float
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship

from db.base_class import Base

class PostTopic(Base):
    post_id = Column(Integer, ForeignKey("Post.post_id"), primary_key=True)
    topic_id = Column(Integer, ForeignKey("Topic.topic_id"), primary_key=True)
    score = Column(Float, default=0)

    post = relationship("Post", back_populates="topics")
    topic = relationship("Topic", back_populates="posts")