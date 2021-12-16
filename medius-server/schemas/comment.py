from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.user import User
from fastapi import HTTPException

import crud
from api import msg

# Shared properties
class CommentBase(BaseModel):
    pass 

# Properties to receive via API on creation
class CommentCreate(CommentBase):
    post_id: int 
    # user_id: int 
    content: str 

# Properties to receive via API on update
class CommentUpdate(CommentBase):
    comment_id: int 
    # post_id: Optional[int]
    # user_id: Optional[int]
    content: Optional[str]
    upvote: Optional[int] 
    downvote: Optional[int]

class CommentDelete(BaseModel):
    comment_id: int 

class CommentInDBBase(CommentBase):
    comment_id: int 
    post_id: int 
    user_id: int 
    content: str 
    created_at: datetime 
    upvote: int 
    downvote: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Comment(CommentInDBBase):
    user_detail: Optional[User]

    def get_user_detail(self, db):
        self.user_detail = crud.user.get_by_id(db=db, user_id=self.user_id)  
        if not self.user_detail: 
            raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

