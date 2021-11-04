from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from db.base_class import Base


class Comment(Base):
    comment_id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey('Post.post_id'))
    user_id = Column(Integer, ForeignKey('User.user_id'))
    content =  Column(String)
    created_at = Column(DateTime)
    upvote = Column(Integer)
    downvote = Column(Integer)