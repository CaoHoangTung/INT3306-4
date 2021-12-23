from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.user import User
from fastapi import HTTPException

import crud
from api import msg

# Shared properties
class UserRelationBase(BaseModel):
    user_id_1: int 
    user_id_2: int 

# Properties to receive via API on creation
class UserRelationCreate(UserRelationBase):
    is_following: Optional[bool]
    is_blocking: Optional[bool]    

# Properties to receive via API on update
class UserRelationUpdate(UserRelationBase):
    is_following: Optional[bool]
    is_blocking: Optional[bool]

class UserRelationDelete(BaseModel):
    user_id_1: int 
    user_id_2: int 

class UserRelationInDBBase(UserRelationBase):
    is_following: Optional[bool]
    is_blocking: Optional[bool]

    class Config:
        orm_mode = True


# Additional properties to return via API
class UserRelation(UserRelationInDBBase):
    user_detail: Optional[User]
    
    def get_user_detail(self, db):
        self.user_detail = crud.user.get_by_id(db=db, user_id=self.user_id_2)  
        if not self.user_detail: 
            raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

