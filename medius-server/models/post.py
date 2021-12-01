from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relation, relationship
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import nullslast

from db.base_class import Base


class Post(Base):
    user_id = Column(Integer, ForeignKey("User.user_id"))
    title = Column(String)
    content = Column(String)
    created_at = Column(DateTime) # only author can see this thing
    updated_at = Column(DateTime, default=func.now()) # everyone can see this thing 
    published_at = Column(DateTime, nullable=True) # everyone can see this thing
    preview_image_path = Column(String, nullable=True)
    cover_image_path = Column(String, nullable=True)
    upvote = Column(Integer)
    downvote = Column(Integer)
    post_id = Column(Integer, primary_key=True, autoincrement=True)
    view_count = Column(Integer)

    topics = relationship("PostTopic", back_populates="post")
    users = relationship("UserPostRelation", back_populates="post")
    comments = relationship("Comment", back_populates="post")