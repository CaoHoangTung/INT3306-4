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
from schemas.usertopic import UserTopicCreate, UserTopicDelete, UserTopicUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.UserTopic])
def view_all_usertopics(db: Session = Depends(deps.get_db)) -> Any:
    """
    Get all usertopics
    """
    usertopics = crud.usertopic.get_all(db=db)

    if not isinstance(usertopics, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return usertopics

@router.get("/view-by-user-id/{user_id}", response_model=List[schemas.UserTopic])
def view_usertopic_by_user_id(user_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all topics of given user
    """
    usertopics = crud.usertopic.get_by_user_id(
        db=db, 
        user_id=user_id
    )
    if not isinstance(usertopics, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERTOPIC_ID)
            
    return usertopics

@router.get("/view-by-topic-id/{topic_id}", response_model=List[schemas.UserTopic])
def view_usertopic_by_topic_id(topic_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all users with given topic 
    """
    usertopics = crud.usertopic.get_by_topic_id(
        db=db, 
        topic_id=topic_id
    )
    if not isinstance(usertopics, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERTOPIC_ID)
            
    return usertopics

@router.get("/view", response_model=schemas.UserTopic)
def view_usertopic(db: Session = Depends(deps.get_db), user_id:str = Query(...), topic_id:str = Query(...), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View usertopic
    """
    usertopic = crud.usertopic.get_by_id(
        db=db, 
        user_id=user_id,
        topic_id=topic_id
    )
    if not usertopic:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERTOPIC_ID)
            
    return usertopic

@router.post("/create", response_model=schemas.UserTopic)
def create_usertopic(db: Session = Depends(deps.get_db), *, creating_usertopic: UserTopicCreate, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Create new usertopic
    """
    query_usertopic = crud.usertopic.get_by_id(db=db, topic_id=creating_usertopic.topic_id, user_id=creating_usertopic.user_id)
    if query_usertopic:
        updating_usertopic = creating_usertopic
        usertopic = crud.usertopic.update(
            db=db,
            db_obj=query_usertopic,
            obj_in=updating_usertopic
        )
        return usertopic
    else: 
        try:
            usertopic = crud.usertopic.create(
                db=db, 
                obj_in=creating_usertopic
            )
            return usertopic
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=msg.INVALID_USERTOPIC_ID)
        
@router.put("/update", response_model=schemas.UserTopic)
def update_usertopic(db: Session = Depends(deps.get_db), *, updating_usertopic: UserTopicUpdate, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update usertopic
    """

    query_usertopic = crud.usertopic.get_by_id(db=db, topic_id=updating_usertopic.topic_id, user_id=updating_usertopic.user_id)
    if not query_usertopic:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERTOPIC_ID)
        
    usertopic = crud.usertopic.update(
        db=db,
        db_obj=query_usertopic,
        obj_in=updating_usertopic
    )
    return usertopic

    
@router.delete("/delete", response_model=schemas.UserTopic)
def delete_usertopic(db: Session = Depends(deps.get_db), *, deleting_relation: UserTopicDelete = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete usertopic
    """
    usertopic = crud.usertopic.delete(
        db=db,
        topic_id=deleting_relation.topic_id, 
        user_id=deleting_relation.user_id
    )
    if not usertopic:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERTOPIC_ID)
    
    return usertopic