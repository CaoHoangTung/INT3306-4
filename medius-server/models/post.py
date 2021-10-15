from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from db.base_class import Base


class Post(Base):
    user_id = Column(Integer, ForeignKey("user.user_id"))
    title = Column(String)
    content = Column(String)
    created_at = Column(DateTime) # only author can view this post
    updated_at = Column(DateTime)
    published_at = Column(DateTime) # everyone can view this post
    preview_image_path = Column(String)
    cover_image_path = Column(String)
    upvote = Column(Integer)
    downvote = Column(Integer)
    post_id = Column(Integer, primary_key=True, autoincrement=True)
    view_count = Column(Integer)