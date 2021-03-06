from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message


# Shared properties
class PostTopicBase(BaseModel):
    post_id: int 
    topic_id: int 


# Properties to receive via API on creation
class PostTopicCreate(PostTopicBase):
    score: Optional[int]

# Properties to receive via API on update
class PostTopicUpdate(PostTopicBase):
    score: Optional[int]

class PostTopicDelete(BaseModel):
    post_id: int 
    topic_id: int 


class PostTopicInDBBase(PostTopicBase):
    score: int 
    
    class Config:
        orm_mode = True


# Additional properties to return via API
class PostTopic(PostTopicInDBBase):
    pass

