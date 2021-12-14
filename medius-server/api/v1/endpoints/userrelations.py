from datetime import date, timedelta, datetime
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session, query, relationship
from sqlalchemy.sql.expression import and_
from sqlalchemy.sql.functions import func, user

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.userrelation import UserRelation, UserRelationCreate, UserRelationDelete, UserRelationUpdate
from models.notification import Notification

router = APIRouter()

@router.get("/all", response_model=List[schemas.UserRelation])
def view_all_relations(db: Session = Depends(deps.get_db)) -> Any:
    """
    Get all userrelations
    """
    relations = crud.userrelation.get_all(db=db)

    if not isinstance(relations, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return relations

@router.get("/view-by-user-id-1/{user_id_1}", response_model=List[schemas.UserRelation])
def view_user_relation_by_user_id_1(user_id_1: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all relations of given user_1
    """
    relations = crud.userrelation.get_all_relations_by_user_id_1(
        db=db, 
        user_id_1=user_id_1
    )
    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relations

@router.get("/view-by-user-id-2/{user_id_2}", response_model=List[schemas.UserRelation])
def view_user_relation_by_user_id_2(user_id_2: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all relations of given user_2
    """
    relations = crud.userrelation.get_all_relations_by_user_id_2(
        db=db, 
        user_id_2=user_id_2
    )
    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relations

@router.get("/view-blocked_users/{user_id}", response_model=List[schemas.UserRelation])
def view_blocked_users(user_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all users is blocked by user id 
    """
    relations = crud.userrelation.get_all_users_is_blocked_by_user_id(
        db=db, 
        user_id=user_id
    )
    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relations

@router.get("/view-followed-users/{user_id}", response_model=List[schemas.UserRelation])
def view_followed_users(user_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all users is followed by user id 
    """
    relations = crud.userrelation.get_all_users_is_followed_by_user_id(
        db=db, 
        user_id=user_id
    )
    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relations

@router.get("/view-blocking-users/{user_id}", response_model=List[schemas.UserRelation])
def view_blocking_users(user_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all users block user id 
    """
    relations = crud.userrelation.get_all_users_block_user_id(
        db=db, 
        user_id=user_id
    )
    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relations

@router.get("/view-following-users/{user_id}", response_model=List[schemas.UserRelation])
def view_following_users(user_id: int, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View all users follow user id 
    """
    relations = crud.userrelation.get_all_users_follow_user_id(
        db=db, 
        user_id=user_id
    )
    if not isinstance(relations, List):
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relations


@router.get("/view", response_model=schemas.UserRelation)
def view_relation(db: Session = Depends(deps.get_db), user_id_1:int = Query(...), user_id_2:int = Query(...), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View a relation 
    """
    relation = crud.userrelation.get_by_id(
        db=db, 
        user_id_1=user_id_1,
        user_id_2=user_id_2
    )
    if not relation:
        # return default relation 
        return schemas.UserRelation(
            user_id_1=user_id_1,
            user_id_2=user_id_2
        )
        # raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
            
    return relation

@router.post("/create", response_model=schemas.UserRelation)
def create_relation(db: Session = Depends(deps.get_db), *, creating_relation: UserRelationCreate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new relation
    """
    query_relation = crud.userrelation.get_by_id(db=db, user_id_1=creating_relation.user_id_1, user_id_2=creating_relation.user_id_2)
    if query_relation:
        updating_relation = creating_relation 
        relation = crud.userrelation.update(
            db=db,
            db_obj=query_relation,
            obj_in=updating_relation
        )
        return relation 
    else: 
        try:
            relation = crud.userrelation.create(
                db=db, 
                obj_in=creating_relation
            )
            return relation
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=msg.INVALID_USERRELATION_ID)
    
@router.put("/update", response_model=schemas.UserRelation)
def update_relation(db: Session = Depends(deps.get_db), *, updating_relation: UserRelationUpdate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Update relation
    """

    query_relation = crud.userrelation.get_by_id(db=db, user_id_1=updating_relation.user_id_1, user_id_2=updating_relation.user_id_2)
    if not query_relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)

    notification_creation = updating_relation.is_following and not query_relation.is_following    
    
    relation = crud.userrelation.update(
        db=db,
        db_obj=query_relation,
        obj_in=updating_relation
    )
    
    if notification_creation:
        # delete if exists 
        notification = db.query(Notification) \
                .filter(and_(Notification.user_id_1==updating_relation.user_id_1,\
                            Notification.user_id_2==updating_relation.user_id_2,\
                            Notification.type == "FOLLOW")).first()
        
        if notification:
            crud.notification.delete(db=db, notification_id=notification.notification_id)

        # crud.notification.create(
        #     db=db,
        #     obj_in=schemas.NotificationCreate(
        #         user_id_1=updating_relation.user_id_1,
        #         user_id_2=updating_relation.user_id_2,
        #         post_id=None,
        #         type="FOLLOW",
        #         is_seen=False,
        #         created_at=datetime.now()
        #     )
        # )

    # this step is used to execute trigger 
    relation = crud.userrelation.delete(
        db=db,
        user_id_1=relation.user_id_1,
        user_id_2=relation.user_id_2
    )

    relation = crud.userrelation.create(
        db=db,
        obj_in=relation
    )

    return relation

    
@router.delete("/delete", response_model=schemas.UserRelation)
def delete_relation(db: Session = Depends(deps.get_db), *, deleting_relation:UserRelationDelete, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Delete relation
    """
    relation = crud.userrelation.delete(
        db=db,
        user_id_1=deleting_relation.user_id_1, 
        user_id_2=deleting_relation.user_id_2
    )
    if not relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERRELATION_ID)
    
    return relation