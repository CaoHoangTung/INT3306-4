from datetime import timedelta
from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.param_functions import Header, Query, Security
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import and_

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.user import UserCreate, UserDelete, UserUpdate

import requests

router = APIRouter()


@router.get("/all", response_model=List[schemas.User])
def view_all_user(db: Session = Depends(deps.get_db), *, sort_by_posts_count: Optional[bool] = Query(None), sort_by_num_followers: Optional[bool] = Query(None), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all user
    """
    users = crud.user.get_all(db=db)
    if not isinstance(users, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    if sort_by_num_followers and sort_by_posts_count:
        raise HTTPException(status_code=500, detail=msg.INVALID_QUERY_PARAMETER)

    if sort_by_posts_count:
        users = sorted(users, key = lambda user: len(user.posts), reverse=True)

    if sort_by_num_followers:
        users = sorted(users, key = lambda user: len(user.following_relationships.all()), reverse=True)

    return_users = []
    for user in users:
        user_dict = user.__dict__
        user_dict["num_followers"] = len(user.following_relationships.all())
        return_users.append(user_dict)

    return return_users


@router.get("/view/{user_id}", response_model=schemas.User)
def view_user(db: Session = Depends(deps.get_db), user_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View user
    """
    user = crud.user.get_by_id(
        db=db,
        user_id=user_id 
    )

    if not user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

    user_dict = user.__dict__
    user_dict["num_followers"] = len(user.following_relationships.all())

    return user_dict  


@router.get("/view-by-email", response_model=schemas.User)
def view_user_by_email(db: Session = Depends(deps.get_db), email:str = Query(...), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View user
    """
    user = crud.user.get_by_email(
        db=db,
        email=email
    )

    if not user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

    user_dict = user.__dict__
    user_dict["num_followers"] = len(user.following_relationships.all())

    return user_dict      


@router.post("/create", response_model=schemas.User)
def create_user(db: Session = Depends(deps.get_db), *, creating_user: UserCreate = None, token: str = Depends(deps.auto_error_reusable_oauth2)) -> Any:
    """
    Create new user
    """
    is_admin: bool = False 
    is_user: bool = False
    if not token: # don't have account yet
        creating_user.role_id = 5 
    else: 
        is_user = True 
        current_user = deps.get_current_user(db, token)
        if crud.user.is_admin(db, current_user):
            is_admin = True 

    if is_user and not is_admin:
        raise HTTPException(status_code=400, detail=msg.INVALID_USER_ID)

    # get an random avatar 
    if not creating_user.avatar_path:
        creating_user.avatar_path = "https://avatars.dicebear.com/api/human/" + str(creating_user.email) + ".svg"

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
def update_user(db: Session = Depends(deps.get_db), updating_user: UserUpdate = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Update user
    """    
    query_user = crud.user.get_by_id(db=db, user_id=current_user.user_id)

    if not query_user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

    if not crud.user.is_admin(db=db, user=query_user) and query_user.user_id != current_user.user_id:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)

    user = crud.user.update(
        db=db,
        db_obj=query_user,
        obj_in=updating_user
    )
    return user

    
@router.delete("/delete", response_model=schemas.User)
def delete_user(db: Session = Depends(deps.get_db), deleting_user: UserDelete = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete user
    """
    user = crud.user.delete(
        db=db,
        user_id=deleting_user.user_id
    )
    if not user:
        raise HTTPException(status_code=404, detail=msg.INVALID_USER_ID)
    return user


@router.get("/search", response_model=List[schemas.User]) 
def search_user(db: Session = Depends(deps.get_db), text: str = Query(""), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    search user by text 
    """ 
    users = crud.user.search(
        db=db, 
        text=text 
    )
    if not isinstance(users, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    return_users = []
    for user in users:
        user_dict = user.__dict__
        user_dict["num_followers"] = len(user.following_relationships.all())
        return_users.append(user_dict)

    return return_users


# @router.get("/statistic", response_model=List[schemas.User])
# def get_user_statistic(db: Session = Depends(deps.get_db), user_id: int = Query(...), current_user: models.User = Depends(deps.get_current_user)) -> Any:
#     user = crud.user.get_by_id(db=db, user_id=user_id)

#     statistic = schemas.UserStatistic
#     statistic.num_follows = len(user.following_relationships.all())
    
#     query = db.query(models.User, models.Post) 
#     query = query.join(models.User, and_(
#         models.User.user_id == models.Post.user_id,
#         models.User.user_id == user_id
#     ))
#     query =
