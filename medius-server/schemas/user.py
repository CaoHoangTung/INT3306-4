from typing import Optional

from pydantic import BaseModel


# Shared properties
class UserBase(BaseModel):
    user_id: str
    role: str

# Properties to receive via API on creation
class UserCreate(UserBase):
    user_id: str
    password: str


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None
    role: Optional[str] = None


class UserInDBBase(UserBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
