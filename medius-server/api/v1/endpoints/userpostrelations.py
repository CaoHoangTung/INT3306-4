from datetime import datetime, timedelta
import json
from typing import Any, List
from fastapi.encoders import jsonable_encoder
import requests 

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session, query
from sqlalchemy.sql.expression import and_, update
from sqlalchemy.sql.functions import user
from starlette.responses import RedirectResponse
from starlette.requests import Request

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.userpostrelation import UserPostRelationCreate, UserPostRelationDelete, UserPostRelationUpdate
from schemas.post import PostUpdate 
from models.notification import Notification

router = APIRouter()

@router.get("/all", response_model=List[schemas.UserPostRelation])
def view_all_user_post_relations(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all user post relations 
    """
    relations = crud.userpostrelation.get_all(db=db)

    if not isinstance(relations, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return relations

@router.get("/view-by-user-id/{user_id}", response_model=List[schemas.UserPostRelation])
def view_relation_by_user_id(user_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View relations by user_id 
    """
    relations = crud.userpostrelation.get_by_user_id(
        db=db, 
        user_id=user_id
    )

    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)
            
    return relations

@router.get("/view-by-post-id/{post_id}", response_model=List[schemas.UserPostRelation])
def view_relation_by_post_id(post_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View relations by post_id 
    """
    relations = crud.userpostrelation.get_by_post_id(
        db=db, 
        post_id=post_id
    )
    if isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)
    
    return relations

@router.get("/view", response_model=schemas.UserPostRelation)
def view_relation(db: Session = Depends(deps.get_db), user_id:str = Query(...), post_id:str = Query(...), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View relation
    """
    relation = crud.userpostrelation.get_by_id(
        db=db, 
        user_id=user_id,
        post_id=post_id
    )
    if not relation:
        # return default relation 
        return schemas.UserPostRelation(
            user_id=user_id,
            post_id=post_id   
        )
        # raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)
            
    return relation

@router.post("/create", response_model=schemas.UserPostRelation)
def create_relation(request: Request, db: Session = Depends(deps.get_db), *, creating_relation: UserPostRelationCreate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new relation 
    """

    query_relation = crud.userpostrelation.get_by_id(
        db=db, 
        user_id=creating_relation.user_id,
        post_id=creating_relation.post_id      
    )
    if query_relation: 
        relation = update_relation(db=db, updating_relation=creating_relation)
        # updating_relation = creating_relation 
        # relation = crud.userpostrelation.update(
        #     db=db,
        #     db_obj=query_relation,
        #     obj_in=updating_relation
        # )
        return relation
    else: 
        try:
            relation = crud.userpostrelation.create(
                db=db, 
                obj_in=creating_relation
            )
            return relation
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=msg.INVALID_USERPOST_ID)
    
@router.put("/update", response_model=schemas.UserPostRelation)
def update_relation(db: Session = Depends(deps.get_db), *, updating_relation: UserPostRelationUpdate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Update relation
    """

    query_relation = crud.userpostrelation.get_by_id(
        db=db, 
        user_id=updating_relation.user_id, 
        post_id=updating_relation.post_id
    )
    if not query_relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)

    notification_type = "NOT_EXIST"
    if query_relation.is_downvote:
        notification_type = "DOWNVOTE"
    elif query_relation.is_upvote:
        notification_type = "UPVOTE"

    # fill all fields missing in updating_relation
    for k, v in query_relation.__dict__.items():
        if not k.__contains__("_sa_instance_state") and (not k in updating_relation.__dict__ or updating_relation.__dict__[k] is None):
            updating_relation.__dict__[k] = v


    # delete correspond notification if exists 
    if notification_type != "NOT_EXIST":
        user_id_2 = crud.post.get_by_post_id(db=db, post_id=updating_relation.post_id).user_id
        notification = db.query(Notification) \
                .filter(and_(Notification.post_id==updating_relation.post_id,\
                            Notification.user_id_1==updating_relation.user_id,\
                            Notification.user_id_2==user_id_2,\
                            Notification.type == notification_type)).first()

        if notification:
            # print("WTF")
            crud.notification.delete(db=db, notification_id=notification.notification_id)

    # this step is used to execute trigger 
    relation = crud.userpostrelation.delete(
        db=db,
        user_id=updating_relation.user_id,
        post_id=updating_relation.post_id
    )

    relation = crud.userpostrelation.create(
        db=db,
        obj_in=updating_relation
    )

    return relation 


@router.delete("/delete", response_model=schemas.UserPostRelation)
def delete_relation(db: Session = Depends(deps.get_db), deleting_relation: UserPostRelationDelete = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Delete relation
    """
    relation = crud.userpostrelation.delete(
        db=db,
        user_id=deleting_relation.user_id, 
        post_id=deleting_relation.post_id
    )
    if not relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)
    
    return relation