from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import null
from sqlalchemy.orm import relationship

from db.base_class import Base

class Topic(Base):
    topic_id = Column(Integer, primary_key=True, autoincrement=True)
    topic_name = Column(String, default=null) 
    created_at = Column(DateTime)
    
    posts = relationship("PostTopic", back_populates="topic")