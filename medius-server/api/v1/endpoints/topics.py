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
from schemas.topic import TopicCreate, TopicDelete, TopicUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.Topic])
def view_all_topics(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all topics
    """
    topics = crud.topic.get_all(db=db)

    if not isinstance(topics, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return topics

@router.get("/view/{topic_id}", response_model=schemas.Topic)
def view_topic(db: Session = Depends(deps.get_db), topic_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View topic
    """
    topic = crud.topic.get_by_topic_id(
        db=db, 
        topic_id=topic_id
    )
    if not topic:
        raise HTTPException(status_code=404, detail=msg.INVALID_TOPIC_ID)
            
    return topic

@router.post("/create", response_model=schemas.Topic)
def create_topic(db: Session = Depends(deps.get_db), *, creating_topic: TopicCreate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new topic
    """

    try:
        topic = crud.topic.create(
            db=db, 
            obj_in=creating_topic
        )
        return topic
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_TOPIC_ID)
    
@router.put("/update", response_model=schemas.Topic)
def update_topic(db: Session = Depends(deps.get_db), *, updating_topic: TopicUpdate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Update topic
    """

    query_topic = crud.topic.get_by_topic_id(db=db, topic_id=updating_topic.topic_id)
    if not query_topic:
        raise HTTPException(status_code=404, detail=msg.INVALID_TOPIC_ID)
        
    topic = crud.topic.update(
        db=db,
        db_obj=query_topic,
        obj_in=updating_topic
    )
    return topic

    
@router.delete("/delete", response_model=schemas.Topic)
def delete_topic(db: Session = Depends(deps.get_db), deleting_topic: TopicDelete = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Delete topic
    """
    topic = crud.topic.delete(
        db=db,
        topic_id=deleting_topic.topic_id
    )
    if not topic:
        raise HTTPException(status_code=404, detail=msg.INVALID_TOPIC_ID)
    
    return topic