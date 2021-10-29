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
from schemas.user import UserCreate, UserUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.User])
def view_all_user(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all user
    """
    users = crud.user.get_all(db=db)
    if not isinstance(users, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return users

@router.get("/view/{user_id}", response_model=schemas.User)
def view_user(db: Session = Depends(deps.get_db), user_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View user
    """
    user = crud.user.get_by_user_id(
        db=db, 
        user_id=user_id
    )

    if not user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)
            
    return user

@router.post("/create", response_model=schemas.User)
def create_user(db: Session = Depends(deps.get_db), creating_user: UserCreate = Depends(), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new user
    """
    # query_user = crud.user.get_by_user_id(db=db, user_id=creating_user.user_id)
    # if query_user:
    #     raise HTTPException(status_code=500, detail=msg.DUPLICATE_USER_ID)

    try:
        user = crud.user.create(
            db=db, 
            obj_in=creating_user
        )
        return user 
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_USER_ID)
        
@router.put("/update", response_model=schemas.User)
def update_user(db: Session = Depends(deps.get_db), updating_user: UserUpdate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update user
    """
    query_user = crud.user.get_by_user_id(db=db, user_id=updating_user.user_id)
    if not query_user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

    user = crud.user.update(
        db=db,
        db_obj=query_user,
        obj_in=updating_user
    )
    return user

    
@router.delete("/delete", response_model=schemas.User)
def delete_user(db: Session = Depends(deps.get_db), user_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete user
    """
    user = crud.user.delete(
        db=db,
        user_id=user_id
    )
    if not user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)
    return user