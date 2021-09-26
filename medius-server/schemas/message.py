from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# Shared properties
class MessageBase(BaseModel):
    message: str
    

# Properties to receive via API on creation
class MessageCreate(MessageBase):
    conversation_id: int
    sent_as: Optional[str]

# Properties to receive via API on update
class MessageUpdate(MessageBase):
    message_id: int


class MessageInDBBase(MessageBase):
    message_id: int
    conversation_id: int
    sender: Optional[str]
    sent_as: Optional[str]
    sent_time: Optional[datetime]
    class Config:
        orm_mode = True


# Additional properties to return via API
class Message(MessageInDBBase):
    pass