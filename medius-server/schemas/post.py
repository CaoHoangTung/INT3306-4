from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message


# Shared properties
class PostBase(BaseModel):
    title: Optional[str]
    content: Optional[str] 
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]

# Properties to receive via API on creation
class PostCreate(PostBase):
    pass

# Properties to receive via API on update
class PostUpdate(PostBase):
    post_id: str
    downvote: Optional[int]
    upvote: Optional[int]
    view_count: Optional[int]


class PostInDBBase(PostBase):
    post_id: int
    user_id: Optional[int] 
    created_at: Optional[datetime] 
    published_at: Optional[datetime] ###### TODO: fixxxx
    updated_at: Optional[datetime] 
    upvote: Optional[int]
    downvote: Optional[int]

    class Config:
        orm_mode = True


# Additional properties to return via API
class Post(PostInDBBase):
    pass

