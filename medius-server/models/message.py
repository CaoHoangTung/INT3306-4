from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from db.base_class import Base


class Message(Base):
    message_id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String)
    sender = Column(String, ForeignKey("user.user_id"))
    conversation_id = Column(Integer, ForeignKey("conversation.conversation_id"))
    sent_as = Column(String)
    sent_time = Column(DateTime(timezone=True), server_default=func.now())