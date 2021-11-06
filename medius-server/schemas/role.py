from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime

# Shared properties
class RoleBase(BaseModel):
    role_name: str
    is_admin: bool

# Properties to receive via API on creation
class RoleCreate(RoleBase):
    pass

# Properties to receive via API on update
class RoleUpdate(RoleBase):
    role_id: int

class RoleInDBBase(RoleBase):
    role_id: int

    class Config:
        orm_mode = True

# Additional properties to return via API
class Role(RoleInDBBase):
    pass

