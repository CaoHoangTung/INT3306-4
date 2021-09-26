from datetime import date
from typing import Any, List
import json

from fastapi import APIRouter, Body, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import inspect
import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.user import UserCreate, UserUpdate
from schemas.category import Category
from schemas.conversation import ConversationCreate
from schemas.message import Message
import tempfile
from starlette.responses import FileResponse

router = APIRouter()


"""
TODO (NOT WORKING YET)
"""
@router.post("/import/")
def create_upload_file(db: Session = Depends(deps.get_db), file: UploadFile = File(...),  current_user: models.User = Depends(deps.get_current_admin)):
    try:
        contents = file.file.read()
        upload_obj = json.loads(contents)
        
        category_success, conversation_success, message_success = 0, 0, 0
        category_import_messages, conversation_import_messages, message_import_messages = [], [], []
        
        if "categories" in upload_obj:
            for category in upload_obj["categories"]:
                try:
                    creating_category = Category(
                        **category
                    )
                    crud.category.create(db=db, obj_in=creating_category)
                    category_success += 1
                except Exception as e:
                    print(e)
                    category_import_messages.append(f"Duplicate category {category}")
                
        if "conversations" in upload_obj:
            bulk_conversations = []
            for conversation in upload_obj["conversations"]:
                conversation["is_finished"] = 0
                
                messages = []
                if "messages" in conversation:
                    messages = conversation["messages"]
                    conversation.pop("messages")
                
                try:
                    creating_conversation = ConversationCreate(
                        **conversation
                    )
                    bulk_conversations.append(creating_conversation)
                    # crud.conversation.create(db=db, obj_in=creating_conversation)
                    # conversation_success += 1
                except Exception as e:
                    print(e)
                    conversation_import_messages.append(f"Error conversation {conversation['conversation_id']}, {conversation['category_id']}")
                # for message_idx, message in enumerate(messages):
                #     try:
                #         creating_message = Message(
                #             **message
                #         )
                #         crud.message.create(db=db, obj_in=creating_message)   
                #         message_success += 1
                #     except Exception as e:
                #         print(e)
                #         message_import_messages.append(f"Error message {message_idx} of conversation {conversation.conversation_id}")
            
            print("CREATING")
            result = crud.conversation.bulk_create(db=db, bulk_objects=bulk_conversations)                           
            print(result) 
            
        return {
            "success": {
                "category": category_success,
                "conversation": conversation_success,
                "message": message_success
            },
            "messages": {
                "category": category_import_messages,
                "conversation": conversation_import_messages,
                "message": message_import_messages
            }
        }
    except Exception as e:
        print(e)
        raise HTTPException(500, msg.INVALID_IMPORT_FILE_FORMAT)

"""
Return dashboard statistics 
"""
@router.get("/stats") 
def stats(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    categories = crud.category.get_all(db=db)
    conversation_groups = {
        category.category_id: crud.conversation.get_by_category_id(db=db, category_id=category.category_id)
        for category in categories
    }
    
    result = []
    for group in conversation_groups:
        conversations = conversation_groups[group]
        count, in_review, done = len(conversations), 0, 0

        for conversation in conversations:
            if conversation.is_finished == 1:
                in_review += 1
            elif conversation.is_finished == 2:
                done += 1
                            
        result.append({
            "category_id": group,
            "count": count,
            "in_review": in_review,
            "done": done
        })
        
    return result

"""
Export all annotation from database
"""
@router.get("/export")
def export_all(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    conversations = crud.conversation.get_all(db=db)
    categories = crud.category.get_all(db=db)
    
    full_conversations = []
    for idx, conversation in enumerate(conversations):
        messages = crud.message.get_by_conversation_id(db=db, conversation_id=conversation.conversation_id)
        if not messages:
            messages = []
            
        full_conversations.append({
            **jsonable_encoder(conversation),
            "messages": jsonable_encoder(messages)
        })
    data = {
        "categories": jsonable_encoder(categories),
        "conversations": full_conversations,
    }
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".json", delete=False) as fout:
        json.dump(data, fout, ensure_ascii=False, indent=4)
        return FileResponse(fout.name, media_type='application/octet-stream', filename=f"export-{date.today().strftime('%d-%m-%Y')}.json")

"""
Delete all annotation from database
"""
@router.delete("/delete")
def export_all(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete all data
    """
    try:
        db.execute("SET FOREIGN_KEY_CHECKS = 0;")
        crud.message.truncate(db=db)
        crud.conversation.truncate(db=db)
        crud.category.truncate(db=db)
        db.execute("SET FOREIGN_KEY_CHECKS = 1;")
        return "ok"
    except Exception as e:
        print(e)
        raise HTTPException(500, msg.DATABASE_ERROR)
    
