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
    published_at: Optional[datetime] 
    pass

# Properties to receive via API on update
class PostUpdate(PostBase):
    post_id: int
    downvote: Optional[int]
    upvote: Optional[int]
    view_count: Optional[int]
    published_at: Optional[datetime] = None 

class PostDelete(BaseModel):
    post_id: int 

class PostInDBBase(PostBase):
    post_id: int
    user_id: int
    created_at: datetime
    published_at: Optional[datetime] 
    updated_at: datetime
    upvote: int
    downvote: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Post(PostInDBBase):
    pass

