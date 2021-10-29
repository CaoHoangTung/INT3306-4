from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime

# Shared properties
class UserPostRelationBase(BaseModel):
    user_id: int 
    post_id: int
    pass 

# Properties to receive via API on creation
class UserPostRelationCreate(UserPostRelationBase):
    pass
    
# Properties to receive via API on update
class UserPostRelationUpdate(UserPostRelationBase):
    is_saved: Optional[bool]
    is_blocked: Optional[bool] 
    is_upvote: Optional[bool] 
    is_downvote: Optional[bool]

class UserPostRelationInDBBase(UserPostRelationBase):
    is_saved: Optional[bool]
    is_blocked: Optional[bool] 
    is_upvote: Optional[bool] 
    is_downvote: Optional[bool]

    class Config:
        orm_mode = True


# Additional properties to return via API
class UserPostRelation(UserPostRelationInDBBase):
    pass

