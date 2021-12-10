from datetime import timedelta
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.role import RoleCreate, RoleDelete, RoleUpdate
from models import User 

router = APIRouter()

@router.get("/all", response_model=List[schemas.Role])
def view_all_roles(db: Session = Depends(deps.get_db), current_user: User = Depends(deps.get_current_admin)) -> Any:
    """
    Get all roles
    """
    roles = crud.role.get_all(db=db)

    if not isinstance(roles, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return roles

@router.get("/view/{role_id}", response_model=schemas.Role)
def view_role(db: Session = Depends(deps.get_db), role_id:str = None, current_user: User = Depends(deps.get_current_admin)) -> Any:
    """
    View role
    """
    role = crud.role.get_by_role_id(
        db=db, 
        role_id=role_id
    )
    if not role:
        raise HTTPException(status_code=404, detail=msg.INVALID_ROLE_ID)
            
    return role

@router.post("/create", response_model=schemas.Role)
def create_role(db: Session = Depends(deps.get_db), *, creating_role: RoleCreate, current_user: User = Depends(deps.get_current_admin)) -> Any:
    """
    Create new role
    """

    try:
        role = crud.role.create(
            db=db, 
            obj_in=creating_role
        )
        return role
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_ROLE_ID)
    
@router.put("/update", response_model=schemas.Role)
def update_role(db: Session = Depends(deps.get_db), *, updating_role: RoleUpdate, current_user: User = Depends(deps.get_current_admin)) -> Any:
    """
    Update role
    """

    query_role = crud.role.get_by_role_id(db=db, role_id=updating_role.role_id)
    if not query_role:
        raise HTTPException(status_code=404, detail=msg.INVALID_ROLE_ID)
        
    role = crud.role.update(
        db=db,
        db_obj=query_role,
        obj_in=updating_role
    )
    return role

    
@router.delete("/delete", response_model=schemas.Role)
def delete_role(db: Session = Depends(deps.get_db), deleting_role: RoleDelete = None, current_user: User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete role
    """
    role = crud.role.delete(
        db=db,
        role_id=deleting_role.role_id
    )
    if not role:
        raise HTTPException(status_code=404, detail=msg.INVALID_ROLE_ID)
    
    return role