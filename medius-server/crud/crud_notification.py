from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import and_, func, update
from sqlalchemy.sql.operators import is_natural_self_precedent

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.notification import Notification
from schemas.notification import NotificationInDBBase, NotificationDelete, NotificationBase, NotificationCreate, NotificationUpdate


class CRUDNotification(CRUDBase[Notification, NotificationCreate, NotificationUpdate]):
    """
    Get a notification by id
    """
    def get_by_notification_id(self, db: Session, *, notification_id: int) -> Optional[Notification]:
        try:
            return db.query(Notification) \
                .filter(Notification.notification_id == notification_id) \
                .first()
        except:
            return None

    """
    Get all notifications  
    """  
    def get_all(self, db: Session, unseen_filter: bool) -> List[Notification]:
        try:
            if unseen_filter:
                return db.query(Notification) \
                    .filter(Notification.is_seen == 0) \
                    .all()
            else: 
                return db.query(Notification) \
                    .filter() \
                    .all()
        except Exception as e:
            print(e)
            return None

    """
    Get all notifications with user_id_1 
    """  
    def get_by_user_id_1(self, db: Session, *, user_id: str, unseen_filter: bool) -> List[Notification]:
        try:
            if unseen_filter: 
                return db.query(Notification) \
                    .filter(and_(Notification.user_id_1 == user_id, Notification.is_seen == 0)) \
                    .all()
            else: 
                return db.query(Notification) \
                    .filter(Notification.user_id_1 == user_id) \
                    .all()
        except Exception as e:
            print(e)
            return None
    
    """
    Get all notifications with user_id_2 
    """  
    def get_by_user_id_2(self, db: Session, *, user_id: str, unseen_filter: bool) -> List[Notification]:
        try:
            if unseen_filter:
                return db.query(Notification) \
                    .filter(and_(Notification.user_id_2 == user_id, Notification.is_seen == 0)) \
                    .all()
            else: 
                return db.query(Notification) \
                    .filter(Notification.user_id_2 == user_id) \
                    .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: NotificationCreate) -> Notification:
        db_obj = Notification(
            user_id_1=obj_in.user_id_1,
            user_id_2=obj_in.user_id_2,
            post_id=obj_in.post_id,
            type=obj_in.type,
            is_seen=obj_in.is_seen,
            created_at=obj_in.created_at
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Notification, obj_in: Union[NotificationUpdate, Dict[str, Any]]
    ) -> Notification:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, notification_id: str) -> Any:
        query = db.query(Notification).filter(Notification.notification_id == notification_id)
        deleting_notification = query.first()
        if deleting_notification:
            deleting_notification = Notification(
                notification_id=deleting_notification.notification_id,
                user_id_1=deleting_notification.user_id_1,
                user_id_2=deleting_notification.user_id_2,
                post_id=deleting_notification.post_id,
                type=deleting_notification.type,
                is_seen=deleting_notification.is_seen,
                created_at=deleting_notification.created_at
            )
            query.delete()
            db.commit()
        return deleting_notification

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

notification = CRUDNotification(Notification)
