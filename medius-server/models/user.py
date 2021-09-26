from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from db.base_class import Base


class User(Base):
    user_id = Column(String, primary_key=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    
