from enum import auto
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from db.base_class import Base

class Role(Base):
    role_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    role_name = Column(String)
    is_admin = Column(Boolean)
    
