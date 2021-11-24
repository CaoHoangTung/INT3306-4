from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime

# Shared properties
class UserPostRelationBase(BaseModel):
    user_id: int 
    post_id: int
    is_saved: Optional[bool]
    is_blocked: Optional[bool]
    is_upvote: Optional[bool]
    is_downvote: Optional[bool]

# Properties to receive via API on creation
class UserPostRelationCreate(UserPostRelationBase):
    pass 
    
# Properties to receive via API on update
class UserPostRelationUpdate(UserPostRelationBase):
    pass 

# Properties to receive via API on delete
class UserPostRelationDelete(BaseModel):
    user_id: int 
    post_id: int 
    pass

class UserPostRelationInDBBase(UserPostRelationBase):

    class Config:
        orm_mode = True


# Additional properties to return via API
class UserPostRelation(UserPostRelationInDBBase):
    pass

