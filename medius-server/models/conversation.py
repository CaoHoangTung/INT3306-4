from typing import List
from sqlalchemy import Boolean, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from db.base_class import Base
from models.message import Message

class Conversation(Base):
    conversation_id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(String, ForeignKey("category.category_id"), nullable=True)
    active_user = Column(String, ForeignKey("user.user_id"), nullable=True)
    conversation_goal = Column(String)
    is_finished = Column(Integer, nullable=True)