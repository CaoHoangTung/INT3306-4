from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import DateTime


# Shared properties
class NotificationBase(BaseModel):
    user_id_1: int 
    user_id_2: int 
    post_id: Optional[int] 
    type: bool
    is_seen: int 
    created_at: datetime

# Properties to receive via API on creation
class NotificationCreate(NotificationBase):
    pass 

# Properties to receive via API on update
class NotificationUpdate(NotificationBase):
    pass 

class NotificationDelete(BaseModel):
    notification_id: int 

class NotificationInDBBase(NotificationBase):
    notification_id: int 

    class Config:
        orm_mode = True


# Additional properties to return via API
class Notification(NotificationInDBBase):
    pass

