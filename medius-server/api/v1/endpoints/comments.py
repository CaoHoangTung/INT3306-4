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
from schemas.comment import CommentCreate, CommentUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.Comment])
def get_all(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all comments 
    """
    comments = crud.comment.get_all(db=db)

    if not isinstance(comments, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return comments

@router.get("/view-by-post-id/{post_id}", response_model=List[schemas.Comment])
def view_by_post_id(db: Session = Depends(deps.get_db), post_id: str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all comments with post_id 
    """
    comments = crud.comment.get_by_post_id(db=db, post_id=post_id)

    if not isinstance(comments, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return comments

@router.get("/view-by-user-id/{user_id}", response_model=List[schemas.Comment])
def view_by_user_id(db: Session = Depends(deps.get_db), user_id: str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all comments with user_id 
    """
    comments = crud.comment.get_by_user_id(db=db, user_id=user_id)

    if not isinstance(comments, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return comments

@router.get("/view/{comment_id}", response_model=schemas.Comment)
def view_comment(db: Session = Depends(deps.get_db), comment_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View comment
    """
    comment = crud.comment.get_by_comment_id(
        db=db, 
        comment_id=comment_id
    )
    if not comment:
        raise HTTPException(status_code=404, detail=msg.INVALID_COMMENT_ID)
            
    return comment

@router.post("/create", response_model=schemas.Comment)
def create_comment(db: Session = Depends(deps.get_db), creating_comment: CommentCreate = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new comment
    """
    try:
        comment = crud.comment.create(
            db=db, 
            obj_in=creating_comment,
            user_id=current_user.user_id
        )
        return comment
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_COMMENT_ID)
    
    
@router.put("/update", response_model=schemas.Comment)
def update_comment(db: Session = Depends(deps.get_db), updating_comment: CommentUpdate = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update comment
    """

    query_comment = crud.comment.get_by_comment_id(db=db, comment_id=updating_comment.comment_id)
    if not query_comment:
        raise HTTPException(status_code=404, detail=msg.INVALID_COMMENT_ID)
        
    comment = crud.comment.update(
        db=db,
        db_obj=query_comment,
        obj_in=updating_comment
    )
    return comment

    
@router.delete("/delete", response_model=schemas.Comment)
def delete_comment(db: Session = Depends(deps.get_db), comment_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete comment
    """
    comment = crud.comment.delete(
        db=db,
        comment_id=comment_id
    )
    if not comment:
        raise HTTPException(status_code=404, detail=msg.INVALID_COMMENT_ID)
    
    return comment