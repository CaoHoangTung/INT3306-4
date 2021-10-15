from typing import Optional, List

from pydantic import BaseModel
from schemas.message import Message


# Shared properties
class PostBase(BaseModel):
    title: str
    content: str 


# Properties to receive via API on creation
class PostCreate(PostBase):
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]


# Properties to receive via API on update
class PostUpdate(PostBase):
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]
    downvote: Optional[int]
    upvote: Optional[int]
    view_count: Optional[int]


class PostInDBBase(PostBase):
    post_id: int
    user_id: Optional[int] 
    created_at: Optional[int] 
    published_at: Optional[int] 
    preview_image_path: Optional[int]
    cover_image_path: Optional[int]
    upvote: Optional[int]
    downvote: Optional[int]

    class Config:
        orm_mode = True


# Additional properties to return via API
class Post(PostInDBBase):
    pass

