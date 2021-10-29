from typing import Optional
from datetime import datetime
from fastapi.datastructures import Default

from pydantic import BaseModel


# Shared properties
class UserBase(BaseModel):
    profile: Optional[str]
    avatar_path: Optional[str]
    subscription: Optional[str]

# Properties to receive via API on creation
class UserCreate(UserBase):
    user_id: Optional[int]
    role_id: int 
    first_name: str 
    last_name: str
    email: str 
    password: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    user_id: int 
    role_id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    password_hash: Optional[str]

class UserInDBBase(UserBase):
    user_id: int 
    role_id: int 
    first_name: str 
    last_name: str 
    email: str 
    password_hash: str 
    register_at: Optional[datetime]
    last_seen_at: Optional[datetime]

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
