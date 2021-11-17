from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Boolean

from db.base_class import Base


class UserPostRelation(Base):
    user_id = Column(Integer, ForeignKey("User.user_id"), primary_key=True)
    post_id = Column(Integer, ForeignKey("Post.post_id"), primary_key=True)
    is_saved = Column(Boolean, default=False)
    is_blocked = Column(Boolean, default=False)
    is_upvote = Column(Boolean, default=False)
    is_downvote = Column(Boolean, default=False)

