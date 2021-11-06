from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase

from models.topic import Topic
from schemas.topic import TopicBase, TopicCreate, TopicUpdate



class CRUDTopic(CRUDBase[Topic, TopicCreate, TopicUpdate]):
    """
    Get a topic by id
    """
    def get_by_topic_id(self, db: Session, *, topic_id: int) -> Optional[Topic]:
        try:
            return db.query(Topic) \
                .filter(Topic.topic_id == topic_id) \
                .first()
        except:
            return None
    
    """
    Get all topics 
    """  
    def get_all(self, db: Session) -> List[Topic]:
        try:
            return db.query(Topic) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: TopicCreate) -> Topic:
        db_obj = Topic(
            topic_name=obj_in.topic_name, 
            created_at=func.now()
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Topic, obj_in: Union[TopicUpdate, Dict[str, Any]]
    ) -> Topic:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, topic_id: str) -> Any:
        query = db.query(Topic).filter(Topic.topic_id == topic_id)
        deleting_topic = query.first()
        if deleting_topic:
            deleting_topic = Topic(
                topic_id = deleting_topic.topic_id, 
                topic_name = deleting_topic.topic_name, 
                created_at = deleting_topic.created_at 
            )
            query.delete()
            db.commit()
        return deleting_topic

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

topic = CRUDTopic(Topic)
