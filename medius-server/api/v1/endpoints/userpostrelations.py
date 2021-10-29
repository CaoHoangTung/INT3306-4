from datetime import timedelta
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import update
from sqlalchemy.sql.functions import user

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.userpostrelation import UserPostRelationCreate, UserPostRelationUpdate
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

@router.get("/view", response_model=schemas.Role)
def view_relation(db: Session = Depends(deps.get_db), user_id:str = Query(...), post_id:str = Query(...), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View relation
    """
    relation = crud.userpostrelation.get(
        db=db, 
        user_id=user_id,
        post_id=post_id
    )
    if not relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)
            
    return relation

@router.post("/create", response_model=schemas.UserPostRelation)
def create_relation(db: Session = Depends(deps.get_db), *, creating_relation: UserPostRelationCreate, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new relation 
    """

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

    query_relation = crud.userpostrelation.get_by_id(db=db, user_id=updating_relation.user_id, post_id=updating_relation.post_id)
    if not query_relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)

    # update post upvote and downvote 
    if updating_relation.is_upvote != query_relation.is_upvote:
        query_post = crud.post.get_by_post_id(db=db, post_id=updating_relation.post_id)
        updating_post = query_post
        updating_post.upvote += 1 if updating_relation.is_upvote else -1 
        crud.post.update(
            db=db,
            db_obj=query_post,
            obj_in=updating_post.__dict__
        )

    if updating_relation.is_downvote != query_relation.is_downvote:
        query_post = crud.post.get_by_post_id(db=db, post_id=updating_relation.post_id)
        updating_post = query_post 
        updating_post.downvote += 1 if updating_relation.is_downvote else -1
        crud.post.update(
            db=db,
            db_obj=query_post,
            obj_in=updating_post.__dict__
        )

    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    print(updating_relation.is_downvote)
    print(query_relation.post_id)
    print(query_relation.user_id)
    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        
    relation = crud.userpostrelation.update(
        db=db,
        db_obj=query_relation,
        obj_in=updating_relation
    )

    
    return relation

    
@router.delete("/delete", response_model=schemas.UserPostRelation)
def delete_relation(db: Session = Depends(deps.get_db), user_id:str = None, post_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Delete relation
    """
    relation = crud.userpostrelation.delete(
        db=db,
        user_id=user_id, 
        post_id=post_id
    )
    if not relation:
        raise HTTPException(status_code=404, detail=msg.INVALID_USERPOST_ID)
    
    return relation