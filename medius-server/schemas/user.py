from typing import Optional
from datetime import datetime
from fastapi.datastructures import Default

from pydantic import BaseModel

import models

# Shared properties
class UserBase(BaseModel):
    profile: Optional[str]
    avatar_path: Optional[str]
    cover_image_path: Optional[str]

# Properties to receive via API on creation
class UserCreate(UserBase):
    user_id: Optional[int]
    role_id: Optional[int] 
    first_name: str 
    last_name: str
    email: str 
    password: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    role_id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    password_hash: Optional[str]

class UserInDBBase(UserBase):
    user_id: Optional[int]
    role_id: int 
    first_name: str 
    last_name: str 
    email: str 
    password_hash: str 
    register_at: Optional[datetime]
    last_seen_at: Optional[datetime]

    class Config:
        orm_mode = True

class UserDelete(BaseModel):
    user_id: int  

# Additional properties to return via API
class User(UserInDBBase):
    num_followers: Optional[int]


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
