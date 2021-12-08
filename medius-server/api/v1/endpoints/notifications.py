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
from schemas.notification import Notification, NotificationCreate, NotificationDelete, NotificationUpdate

router = APIRouter()

@router.get("/all", response_model=List[schemas.Notification])
def get_all(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Get all notifications 
    """
    notifications = crud.notification.get_all(db=db)

    if not isinstance(notifications, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return notifications

@router.get("/view-by-user-id-1/{user_id}", response_model=List[schemas.Notification])
def view_by_user_id_1(db: Session = Depends(deps.get_db), user_id: str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all notifications with user_id 
    """
    notifications = crud.notification.get_by_user_id_1(db=db, user_id=user_id)

    if not isinstance(notifications, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return notifications

@router.get("/view-by-user-id-2/{user_id}", response_model=List[schemas.Notification])
def view_by_user_id_2(db: Session = Depends(deps.get_db), user_id: str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get all notifications with user_id 
    """
    notifications = crud.notification.get_by_user_id_2(db=db, user_id=user_id)

    if not isinstance(notifications, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)
            
    return notifications 

@router.get("/view/{notification_id}", response_model=schemas.Notification)
def view_notification(db: Session = Depends(deps.get_db), notification_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View notification
    """
    notification = crud.notification.get_by_notification_id(
        db=db, 
        notification_id=notification_id
    )
    if not notification:
        raise HTTPException(status_code=404, detail=msg.INVALID_NOTIFICATION_ID)
            
    return notification

@router.post("/create", response_model=schemas.Notification)
def create_notification(db: Session = Depends(deps.get_db), creating_notification: NotificationCreate = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Create new notification
    """
    try:
        notification = crud.notification.create(
            db=db, 
            obj_in=creating_notification,
            user_id=current_user.user_id
        )
        return notification
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_NOTIFICATION_ID)
    
    
@router.put("/update", response_model=schemas.Notification)
def update_notification(db: Session = Depends(deps.get_db), updating_notification: NotificationUpdate = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Update notification
    """

    query_notification = crud.notification.get_by_notification_id(db=db, notification_id=updating_notification.notification_id)
    if not query_notification:
        raise HTTPException(status_code=404, detail=msg.INVALID_NOTIFICATION_ID)
        
    notification = crud.notification.update(
        db=db,
        db_obj=query_notification,
        obj_in=updating_notification
    )
    return notification

    
@router.delete("/delete", response_model=schemas.Notification)
def delete_notification(db: Session = Depends(deps.get_db), deleting_notification: NotificationDelete = None, current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete notification 
    """
    notification = crud.notification.delete(
        db=db,
        notification_id=deleting_notification.notification_id 
    )
    if not notification:
        raise HTTPException(status_code=404, detail=msg.INVALID_NOTIFICATION_ID)
    
    return notification