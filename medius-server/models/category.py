from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from db.base_class import Base


class Category(Base):
    category_id = Column(String, primary_key=True, index=True)
    category_description = Column(String, nullable=False)    
