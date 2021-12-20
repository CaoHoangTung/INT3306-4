from datetime import timedelta
from os import unsetenv
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.param_functions import Query
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
def get_all(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_admin), user_detail: bool = Query(None), unseen_filter: bool = Query(None), offset: int = Query(0), limit: int = Query(10)) -> Any:
    """
    Get all notifications 
    """
    notifications = crud.notification.get_all(db=db, unseen_filter=unseen_filter)

    if not isinstance(notifications, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_notifications = []
    for notification in notifications: 
        schemas_notification = schemas.Notification.from_orm(notification)
        if user_detail:
            schemas_notification.get_user_1_detail(db=db)
        schemas_notifications.append(schemas_notification)
            
    return schemas_notifications[offset:offset+limit]


@router.get("/view-by-user-id-1/{user_id}", response_model=List[schemas.Notification])
def view_by_user_id_1(db: Session = Depends(deps.get_db), user_id: str = None, unseen_filter: bool = None, user_detail: bool = Query(None), current_user: models.User = Depends(deps.get_current_admin), offset: int = Query(0), limit: int = Query(10)) -> Any:
    """
    Get all notifications with user_id 
    """
    notifications = crud.notification.get_by_user_id_1(db=db, user_id=user_id, unseen_filter=unseen_filter)

    if not isinstance(notifications, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_notifications = []
    for notification in notifications: 
        schemas_notification = schemas.Notification.from_orm(notification)
        if user_detail:
            schemas_notification.get_user_1_detail(db=db)
        schemas_notifications.append(schemas_notification)
            
    return schemas_notifications[offset:offset+limit]


@router.get("/view-by-user-id-2", response_model=List[schemas.Notification])
def view_by_user_id_2(db: Session = Depends(deps.get_db), unseen_filter: bool = None, user_detail: bool = Query(None), current_user: models.User = Depends(deps.get_current_user), offset: int = Query(0), limit: int = Query(10)) -> Any:
    """
    Get all notifications with user_id 
    """
    notifications = crud.notification.get_by_user_id_2(db=db, user_id=current_user.user_id, unseen_filter=unseen_filter)

    if not isinstance(notifications, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_notifications = []
    for notification in notifications: 
        schemas_notification = schemas.Notification.from_orm(notification)
        if user_detail:
            schemas_notification.get_user_1_detail(db=db)
        schemas_notifications.append(schemas_notification)
            
    return schemas_notifications


@router.get("/view/{notification_id}", response_model=schemas.Notification)
def view_notification(db: Session = Depends(deps.get_db), notification_id: str = None, user_detail: bool = Query(None), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View notification
    """

    notification = crud.notification.get_by_notification_id(
        db=db, 
        notification_id=notification_id
    )
    if not crud.user.is_admin(db=db, user=current_user) and notification.user_id_2 != current_user.user_id:
        raise HTTPException(status_code=404, detail=msg.INVALID_NOTIFICATION_ID)

    if not notification:
        raise HTTPException(status_code=404, detail=msg.INVALID_NOTIFICATION_ID)
    
    return_notification = schemas.Notification.from_orm(notification)
    return_notification.get_user_1_detail(db=db)

    return return_notification


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
def update_notification(db: Session = Depends(deps.get_db), updating_notification: NotificationUpdate = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
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