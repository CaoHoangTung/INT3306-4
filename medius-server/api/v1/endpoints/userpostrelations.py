from datetime import datetime, timedelta
import json
from typing import Any, List
from fastapi.encoders import jsonable_encoder
import requests 

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session, query
from sqlalchemy.sql.expression import update
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
        updating_relation = creating_relation 
        relation = crud.userpostrelation.update(
            db=db,
            db_obj=query_relation,
            obj_in=updating_relation
        )
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

    # # update post upvote and downvote 
    # if updating_relation.is_upvote != query_relation.is_upvote:
    #     query_post = crud.post.get_by_post_id(db=db, post_id=updating_relation.post_id)
    #     updating_post = query_post
    #     updating_post.upvote += 1 if updating_relation.is_upvote else -1 
    #     crud.post.update(
    #         db=db,
    #         db_obj=query_post,
    #         obj_in=updating_post.__dict__
    #     )

    # if updating_relation.is_downvote != query_relation.is_downvote:
    #     query_post = crud.post.get_by_post_id(db=db, post_id=updating_relation.post_id)
    #     updating_post = query_post 
    #     updating_post.downvote += 1 if updating_relation.is_downvote else -1
    #     crud.post.update(
    #         db=db,
    #         db_obj=query_post,
    #         obj_in=updating_post.__dict__
    #     )

    # print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    # print(updating_relation.is_downvote)
    # print(query_relation.post_id)
    # print(query_relation.user_id)
    # print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

    notification_creation = "NO_CREATE" 
    if not query_relation.is_upvote and updating_relation.is_upvote:
        notification_creation = "UPVOTE"
    elif not query_relation.is_downvote and updating_relation.is_downvote:
        notification_creation = "DOWNVOTE"
        
    relation = crud.userpostrelation.update(
        db=db,
        db_obj=query_relation,
        obj_in=updating_relation
    )

    print(notification_creation)

    if notification_creation != "NO_CREATE":
        post_author = crud.post.get_by_post_id(
            db=db,
            post_id=updating_relation.post_id
        )

        crud.notification.create(
            db=db,
            obj_in=schemas.NotificationCreate(
                user_id_1=updating_relation.user_id,
                user_id_2=post_author.user_id,
                post_id=updating_relation.post_id,
                type=notification_creation,
                is_seen=False,
                created_at=datetime.now()
            )
        )

        print("FAWEFWFE")
    
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