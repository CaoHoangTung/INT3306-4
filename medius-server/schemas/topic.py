from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message


# Shared properties
class TopicBase(BaseModel):
    topic_name: str


# Properties to receive via API on creation
class TopicCreate(TopicBase):
    topic_id: Optional[int]
    pass

# Properties to receive via API on update
class TopicUpdate(TopicBase):
    topic_id: int 


class TopicInDBBase(TopicBase):
    topic_id: int
    created_at: Optional[datetime]

    class Config:
        orm_mode = True


# Additional properties to return via API
class Topic(TopicInDBBase):
    pass

