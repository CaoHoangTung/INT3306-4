from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message


# Shared properties
class UserTopicBase(BaseModel):
    user_id: int 
    topic_id: int 


# Properties to receive via API on creation
class UserTopicCreate(UserTopicBase):
    score: Optional[int]
    pass

# Properties to receive via API on update
class UserTopicUpdate(UserTopicBase):
    score: Optional[int]
    pass 

class UserTopicDelete(BaseModel):
    user_id: int 
    topic_id: int 


class UserTopicInDBBase(UserTopicBase):
    score: int 

    class Config:
        orm_mode = True


# Additional properties to return via API
class UserTopic(UserTopicInDBBase):
    pass

