from datetime import timedelta
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.category import CategoryBase, CategoryInDBBase

router = APIRouter()

@router.get("/all", response_model=List[schemas.Category])
def view_all_category(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all categories
    """
    categories = crud.category.get_all(db=db)

    if not isinstance(categories, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return categories

@router.get("/view/{category_id}", response_model=schemas.Category)
def view_category(db: Session = Depends(deps.get_db), category_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View category
    """
    category = crud.category.get_by_category_id(
        db=db, 
        category_id=category_id
    )
    if not category:
        raise HTTPException(status_code=404, detail=msg.INVALID_CATEGORY_ID)
            
    return category

@router.post("/create", response_model=schemas.Category)
def create_category(db: Session = Depends(deps.get_db), creating_category: CategoryBase = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Create new category
    """
    query_category = crud.category.get_by_category_id(db=db, category_id=creating_category.category_id)
    if query_category is not None:
        raise HTTPException(status_code=500, detail=msg.DUPLICATE_CATEGORY_ID)
        
    category = crud.category.create(
        db=db, 
        obj_in=creating_category
    )
    return category

    
@router.put("/update", response_model=schemas.Category)
def update_category(db: Session = Depends(deps.get_db), updating_category: schemas.Category = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update category
    """
    query_category = crud.category.get_by_category_id(db=db, category_id=updating_category.category_id)
    if not query_category:
        raise HTTPException(status_code=404, detail=msg.INVALID_CATEGORY_ID)
        
    category = crud.category.update(
        db=db,
        db_obj=query_category,
        obj_in=updating_category
    )
    return category

    
@router.delete("/delete", response_model=schemas.Category)
def delete_category(db: Session = Depends(deps.get_db), category_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete category
    """
    category = crud.category.delete(
        db=db,
        category_id=category_id
    )
    if not category:
        raise HTTPException(status_code=404, detail=msg.INVALID_CATEGORY_ID)
    
    return category