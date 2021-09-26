from typing import Optional, List

from pydantic import BaseModel
from schemas.message import Message

# Shared properties
class ConversationBase(BaseModel):
    conversation_goal: str
    category_id: Optional[str]
    

# Properties to receive via API on creation
class ConversationCreate(ConversationBase):
    conversation_id: Optional[str]
    pass

# Properties to receive via API on update
class ConversationUpdate(ConversationBase):
    conversation_id: int
    active_user: Optional[str]
    is_finished: Optional[int]
    conversation_goal: Optional[str]


class ConversationInDBBase(ConversationBase):
    conversation_id: int
    active_user: Optional[str]
    is_finished: Optional[int]
    class Config:
        orm_mode = True


# Additional properties to return via API
class Conversation(ConversationInDBBase):
    pass

class FullConversation(ConversationInDBBase):
    messages: List[Message]
    
    