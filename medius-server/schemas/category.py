from typing import Optional

from pydantic import BaseModel


# Category object
class CategoryBase(BaseModel):
    category_id: str
    category_description: str
    
class CategoryInDBBase(CategoryBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class Category(CategoryInDBBase):
    pass