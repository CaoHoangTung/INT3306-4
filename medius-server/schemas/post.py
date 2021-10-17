from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message


# Shared properties
class PostBase(BaseModel):
    title: str
    content: str 


# Properties to receive via API on creation
class PostCreate(PostBase):
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]
    user_id: Optional[int] # TODO: don't use this 
    post_id: Optional[int] # TODO: auto calculate this in db

# Properties to receive via API on update
class PostUpdate(PostBase):
    post_id: str
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]
    downvote: Optional[int]
    upvote: Optional[int]
    view_count: Optional[int]


class PostInDBBase(PostBase):
    post_id: int
    user_id: Optional[int] 
    # created_at: Optional[DateTime] 
    # published_at: Optional[DateTime]
    # updated_at: Optional[DateTime] 
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]
    upvote: Optional[int]
    downvote: Optional[int]

    class Config:
        orm_mode = True


# Additional properties to return via API
class Post(PostInDBBase):
    pass

