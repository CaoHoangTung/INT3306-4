from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase

from models.usertopic import UserTopic
from schemas.usertopic import UserTopicBase, UserTopicCreate, UserTopicUpdate



class CRUDUserTopic(CRUDBase[UserTopic, UserTopicCreate, UserTopicUpdate]):
    """
    Get a usertopic by id
    """
    def get_by_id(self, db: Session, *, user_id: int, topic_id: int) -> Optional[UserTopic]:
        try:
            return db.query(UserTopic) \
                .filter(UserTopic.user_id == user_id, UserTopic.topic_id == topic_id) \
                .first()
        except:
            return None

    """
    Get all usertopics by topic_id
    """
    def get_by_topic_id(self, db: Session, *, topic_id: int) -> List[UserTopic]:
        try:
            return db.query(UserTopic) \
                .filter(UserTopic.topic_id == topic_id) \
                .all()
        except:
            return None

    """
    Get all usertopics by user_id
    """
    def get_by_user_id(self, db: Session, *, user_id: int) -> List[UserTopic]:
        try:
            return db.query(UserTopic) \
                .filter(UserTopic.user_id == user_id) \
                .all()
        except:
            return None
    
    """
    Get all usertopics 
    """  
    def get_all(self, db: Session) -> List[UserTopic]:
        try:
            return db.query(UserTopic) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: UserTopicCreate) -> UserTopic:
        db_obj = UserTopic(
            topic_id=obj_in.topic_id, 
            user_id=obj_in.user_id,
            score=obj_in.score
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: UserTopic, obj_in: Union[UserTopicUpdate, Dict[str, Any]]
    ) -> UserTopic:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, user_id: str, topic_id: str) -> Any:
        query = db.query(UserTopic).filter(UserTopic.topic_id == topic_id, UserTopic.user_id == user_id)

        deleting_usertopic = query.first()
        if deleting_usertopic:
            deleting_usertopic = UserTopic(
                topic_id = deleting_usertopic.topic_id, 
                user_id = deleting_usertopic.user_id,
                score = deleting_usertopic.score  
            )
            query.delete()
            db.commit()
        return deleting_usertopic

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

usertopic = CRUDUserTopic(UserTopic)
