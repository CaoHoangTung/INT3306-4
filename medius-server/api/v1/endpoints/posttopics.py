from datetime import timedelta
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.posttopic import PostTopicCreate, PostTopicUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.PostTopic])
# def view_all_topics(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
def view_all_posttopics(db: Session = Depends(deps.get_db)) -> Any:
    """
    Get all posttopics
    """
    posttopics = crud.posttopic.get_all(db=db)

    if not isinstance(posttopics, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return posttopics

@router.get("/view", response_model=schemas.PostTopic)
# def view_post(db: Session = Depends(deps.get_db), post_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
def view_posttopic(db: Session = Depends(deps.get_db), post_id:str = Query(...), topic_id:str = Query(...)) -> Any:
    """
    View posttopic
    """
    posttopic = crud.posttopic.get_by_id(
        db=db, 
        topic_id=topic_id,
        post_id=post_id
    )
    if not posttopic:
        raise HTTPException(status_code=404, detail=msg.INVALID_POSTTOPIC_ID)
            
    return posttopic

@router.post("/create", response_model=schemas.PostTopic)
# def create_topic(db: Session = Depends(deps.get_db), creating_post: PostCreate = Depends(), current_user: models.User = Depends(deps.get_current_user)) -> Any:
def create_posttopic(db: Session = Depends(deps.get_db), *, creating_posttopic: PostTopicCreate) -> Any:
    """
    Create new posttopic
    """

    try:
        post = crud.posttopic.create(
            db=db, 
            obj_in=creating_posttopic
        )
        return post
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_POSTTOPIC_ID)
    
@router.put("/update", response_model=schemas.PostTopic)
# def update_topic(db: Session = Depends(deps.get_db), updating_post: PostUpdate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
def update_topic(db: Session = Depends(deps.get_db), *, updating_posttopic: PostTopicUpdate) -> Any:
    """
    Update posttopic
    """

    query_posttopic = crud.posttopic.get_by_id(db=db, topic_id=updating_posttopic.topic_id, post_id=updating_posttopic.post_id)
    if not query_posttopic:
        raise HTTPException(status_code=404, detail=msg.INVALID_POSTTOPIC_ID)
        
    posttopic = crud.posttopic.update(
        db=db,
        db_obj=query_posttopic,
        obj_in=updating_posttopic
    )
    return posttopic

    
@router.delete("/delete", response_model=schemas.PostTopic)
# def delete_topic(db: Session = Depends(deps.get_db), post_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
def delete_topic(db: Session = Depends(deps.get_db), post_id:str = None, topic_id:str = None) -> Any:
    """
    Delete posttopic
    """
    posttopic = crud.posttopic.delete(
        db=db,
        topic_id=topic_id, 
        post_id=post_id
    )
    if not posttopic:
        raise HTTPException(status_code=404, detail=msg.INVALID_POSTTOPIC_ID)
    
    return posttopic