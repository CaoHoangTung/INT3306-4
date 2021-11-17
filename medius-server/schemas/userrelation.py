from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime
from schemas.message import Message


# Shared properties
class UserRelationBase(BaseModel):
    user_id_1: int 
    user_id_2: int 

# Properties to receive via API on creation
class UserRelationCreate(UserRelationBase):
    is_following: Optional[bool]
    is_blocked: Optional[bool]    

# Properties to receive via API on update
class UserRelationUpdate(UserRelationBase):
    is_following: Optional[bool]
    is_blocked: Optional[bool]

class UserRelationDelete(BaseModel):
    user_id_1: int 
    user_id_2: int 

class UserRelationInDBBase(UserRelationBase):
    is_following: bool
    is_blocked: bool

    class Config:
        orm_mode = True


# Additional properties to return via API
class UserRelation(UserRelationInDBBase):
    pass

