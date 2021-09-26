from datetime import timedelta
from typing import Any, List
import time
import random as rand

from sqlalchemy.sql.functions import random

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.conversation import ConversationCreate, ConversationUpdate, FullConversation

router = APIRouter()

@router.get("/count")
def count_conversation(
        db: Session = Depends(deps.get_db), 
        current_user: models.User = Depends(deps.get_current_user),
        category_id=None,
        is_finished=None,
    ) -> Any:
    """
    Count conversation
    """
    return crud.conversation.count(db=db, category_id=category_id, is_finished=is_finished)


@router.get("/all", response_model=List[schemas.Conversation])
def view_all_conversation(
        db: Session = Depends(deps.get_db), 
        current_user: models.User = Depends(deps.get_current_user), 
        category_id=None,
        is_finished=None,
        offset=0, 
        limit=None
    ) -> Any:
    """
    Get all conversations
    """
    conversations = crud.conversation.get_all(db=db, category_id=category_id, is_finished=is_finished, limit=limit, offset=offset)

    if not isinstance(conversations, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return conversations

@router.get("/view/{conversation_id}", response_model=schemas.FullConversation)
def view_conversation(db: Session = Depends(deps.get_db), conversation_id:int = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View conversation
    """
    conversation = crud.conversation.get_by_conversation_id(
        db=db, 
        conversation_id=conversation_id
    )
    messages = crud.message.get_by_conversation_id(
        db=db,
        conversation_id=conversation_id
    )
    
    if not conversation:
        raise HTTPException(status_code=404, detail=msg.INVALID_CONVERSATION_ID)
    if not messages:
        messages = []
        
    full_conversation = schemas.FullConversation(
        conversation_id=conversation_id,
        conversation_goal=conversation.conversation_goal,
        category_id=conversation.category_id,
        active_user=conversation.active_user,
        is_finished=conversation.is_finished,
        messages=messages
    )
    
    return full_conversation


@router.post("/create", response_model=schemas.Conversation)
def create_conversation(db: Session = Depends(deps.get_db), creating_conversation: ConversationCreate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Create new conversation
    """
    try:
        conversation = crud.conversation.create(
            db=db, 
            obj_in=creating_conversation
        )
        return conversation
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_CATEGORY_ID)
    

CONVERSATION_ASSIGN_MAX_RETRIES = 5
"""
An user request to assign a conversation
Return the assigned conversatoin
"""
@router.post("/assign", response_model=schemas.FullConversation)
def assign_conversation(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)):   
    crud.conversation.unassign_user_conversations(
        db=db,
        user_id=current_user.user_id
    )
    
    num_retries = CONVERSATION_ASSIGN_MAX_RETRIES
    while True:
        try:
            unassigned_conversation = crud.conversation.get_unassigned_conversation(db=db)
            if unassigned_conversation is None:
                raise HTTPException(status_code=404, detail=msg.NO_UNASSIGNED_CONVERSATION)
            
            updating_conversation = ConversationUpdate(
                conversation_id=unassigned_conversation.conversation_id,
                category_id=unassigned_conversation.category_id,
                conversation_goal=unassigned_conversation.conversation_goal,
                active_user=current_user.user_id,
                is_finished=unassigned_conversation.is_finished,
            )
            
            updated_conversation = crud.conversation.update(
                db=db, 
                db_obj=unassigned_conversation, 
                obj_in=updating_conversation
            )
            messages = crud.message.get_by_conversation_id(
                db=db,
                conversation_id=updated_conversation.conversation_id
            )

            full_conversation = FullConversation(
                conversation_id=updated_conversation.conversation_id,
                category_id=updated_conversation.category_id,
                conversation_goal=updated_conversation.conversation_goal,
                active_user=current_user.user_id,
                is_finished=updated_conversation.is_finished,
                messages=messages
            )
            return full_conversation
            
        except Exception as e:
            if num_retries == 0:
                raise HTTPException(status_code=404, detail=msg.NO_UNASSIGNED_CONVERSATION)
            if e.__class__ == HTTPException:
                raise HTTPException(status_code=404, detail=msg.NO_UNASSIGNED_CONVERSATION)
            print(f"Cannot assign conversation for {current_user.user_id}. Retrying")
            print("Error:", e)
            time.sleep(0.5+rand.random())
            num_retries -= 1

@router.put("/status", response_model=schemas.Conversation)
def update_conversation_status(db: Session = Depends(deps.get_db), conversation_id:int=None, is_finished=0, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    query_conversation = crud.conversation.get_by_conversation_id(db=db, conversation_id=conversation_id)
    if not query_conversation:
        raise HTTPException(status_code=404, detail=msg.INVALID_CONVERSATION_ID)
    updating_conversation = jsonable_encoder(query_conversation)
    updating_conversation["is_finished"] = is_finished
    
    conversation = crud.conversation.update(
        db=db,
        db_obj=query_conversation,
        obj_in=updating_conversation
    )
    return conversation

@router.put("/update", response_model=schemas.Conversation)
def update_conversation(db: Session = Depends(deps.get_db), updating_conversation: ConversationUpdate = Depends(), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update conversation
    """
    query_conversation = crud.conversation.get_by_conversation_id(db=db, conversation_id=updating_conversation.conversation_id)
    if not query_conversation:
        raise HTTPException(status_code=404, detail=msg.INVALID_CONVERSATION_ID)
        
    conversation = crud.conversation.update(
        db=db,
        db_obj=query_conversation,
        obj_in=updating_conversation
    )
    return conversation
    
    
@router.delete("/delete", response_model=schemas.Conversation)
def delete_conversation(db: Session = Depends(deps.get_db), conversation_id:str = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete conversation
    """
    conversation = crud.conversation.delete(
        db=db,
        conversation_id=conversation_id
    )
    if not conversation:
        raise HTTPException(status_code=404, detail=msg.INVALID_CONVERSATION_ID)
    
    return conversation

