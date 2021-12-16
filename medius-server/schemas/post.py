from datetime import datetime
from typing import Optional, List
from fastapi.exceptions import HTTPException

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message

from schemas.user import User 
import crud 
from api import msg 

# Shared properties
class PostBase(BaseModel):
    title: Optional[str]
    content: Optional[str] 
    preview_image_path: Optional[str]
    cover_image_path: Optional[str]

# Properties to receive via API on creation
class PostCreate(PostBase):
    # user_id: int
    published_at: Optional[datetime] 
    topic_ids: Optional[List[str]]
    pass

# Properties to receive via API on update
class PostUpdate(PostBase):
    post_id: int
    downvote: Optional[int]
    upvote: Optional[int]
    view_count: Optional[int]
    published_at: Optional[datetime] = None 
    topic_ids: Optional[List[str]]

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
    first_name: Optional[str]
    last_name: Optional[str]

    user_detail: Optional[User]

    def get_user_detail(self, db):
        self.user_detail = crud.user.get_by_id(db=db, user_id=self.user_id)
        if not self.user_detail:
            raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)