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
from schemas.post import PostCreate, PostUpdate

router = APIRouter()

@router.get("/all/{user_id}", response_model=List[schemas.Post])
# def view_all_posts(db: Session = Depends(deps.get_db), user_id: str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
def view_all_posts(db: Session = Depends(deps.get_db), user_id: str = None) -> Any:
    """
    Get all posts with user_id 
    """
    posts = crud.post.get_by_user_id(db=db, user_id=user_id)

    print(posts)
    print(user_id)

    if not isinstance(posts, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return posts

@router.get("/view/{post_id}", response_model=schemas.Post)
def view_post(db: Session = Depends(deps.get_db), post_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View message
    """
    post = crud.post.get_by_post_id(
        db=db, 
        post_id=post_id
    )
    if not post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)
            
    return post

@router.post("/create", response_model=schemas.Post)
def create_message(db: Session = Depends(deps.get_db), creating_post: PostCreate = Depends(), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new post
    """
    try:
        post = crud.post.create(
            db=db, 
            obj_in=creating_post
        )
        return post
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_POST_ID)
    
@router.put("/update", response_model=schemas.Post)
def update_message(db: Session = Depends(deps.get_db), updating_post: PostUpdate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update post
    """
    query_post = crud.post.get_by_post_id(db=db, message_id=updating_post.post_id)
    if not query_post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)
        
    post = crud.post.update(
        db=db,
        db_obj=query_post,
        obj_in=updating_post
    )
    return post

    
@router.delete("/delete", response_model=schemas.Post)
def delete_message(db: Session = Depends(deps.get_db), post_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete post
    """
    post = crud.post.delete(
        db=db,
        post_id=post_id
    )
    if not post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)
    
    return post