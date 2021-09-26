from datetime import timedelta
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.message import MessageCreate, MessageUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.Message])
def view_all_message(db: Session = Depends(deps.get_db)) -> Any:
    """
    Get all messages
    """
    messages = crud.message.get_all(db=db)

    if not isinstance(messages, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return messages

@router.get("/view/{message_id}", response_model=schemas.Message)
def view_message(db: Session = Depends(deps.get_db), message_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View message
    """
    message = crud.message.get_by_message_id(
        db=db, 
        message_id=message_id
    )
    if not message:
        raise HTTPException(status_code=404, detail=msg.INVALID_MESSAGE_ID)
            
    return message

@router.post("/create", response_model=schemas.Message)
def create_message(db: Session = Depends(deps.get_db), creating_message: MessageCreate = Depends(), current_user: models.User = Depends(deps.get_current_user)) -> Any:
# def create_message(db: Session = Depends(deps.get_db), creating_message: MessageCreate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Create new message
    """
    try:
        message = crud.message.create(
            db=db, 
            obj_in=creating_message,
            active_user=current_user.user_id
        )
        return message
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_CONVERSATION_ID)
    
@router.put("/update", response_model=schemas.Message)
def update_message(db: Session = Depends(deps.get_db), updating_message: MessageUpdate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update message
    """
    query_message = crud.message.get_by_message_id(db=db, message_id=updating_message.message_id)
    if not query_message:
        raise HTTPException(status_code=404, detail=msg.INVALID_MESSAGE_ID)
        
    message = crud.message.update(
        db=db,
        db_obj=query_message,
        obj_in=updating_message
    )
    return message

    
@router.delete("/delete", response_model=schemas.Message)
def delete_message(db: Session = Depends(deps.get_db), message_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete message
    """
    message = crud.message.delete(
        db=db,
        message_id=message_id
    )
    if not message:
        raise HTTPException(status_code=404, detail=msg.INVALID_CONVERSATION_ID)
    
    return message