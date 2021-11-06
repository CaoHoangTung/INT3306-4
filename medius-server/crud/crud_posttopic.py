from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase

from models.posttopic import PostTopic
from schemas.posttopic import PostTopicBase, PostTopicCreate, PostTopicUpdate



class CRUDPostTopic(CRUDBase[PostTopic, PostTopicCreate, PostTopicUpdate]):
    """
    Get a posttopic by id
    """
    def get_by_id(self, db: Session, *, post_id: int, topic_id: int) -> Optional[PostTopic]:
        try:
            return db.query(PostTopic) \
                .filter(PostTopic.topic_id == topic_id, PostTopic.post_id == post_id) \
                .first()
        except:
            return None

    """
    Get all posttopics by topic_id
    """
    def get_by_topic_id(self, db: Session, *, topic_id: int) -> List[PostTopic]:
        try:
            return db.query(PostTopic) \
                .filter(PostTopic.topic_id == topic_id) \
                .all()
        except:
            return None

    """
    Get all posttopics by post_id
    """
    def get_by_post_id(self, db: Session, *, post_id: int) -> List[PostTopic]:
        try:
            return db.query(PostTopic) \
                .filter(PostTopic.post_id == post_id) \
                .all()
        except:
            return None
    
    """
    Get all posttopics 
    """  
    def get_all(self, db: Session) -> List[PostTopic]:
        try:
            return db.query(PostTopic) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: PostTopicCreate) -> PostTopic:
        db_obj = PostTopic(
            topic_id=obj_in.topic_id, 
            post_id=obj_in.post_id,
            score=obj_in.score
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: PostTopic, obj_in: Union[PostTopicUpdate, Dict[str, Any]]
    ) -> PostTopic:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, post_id: str, topic_id: str) -> Any:
        query = db.query(PostTopic).filter(PostTopic.topic_id == topic_id, PostTopic.post_id == post_id)

        deleting_posttopic = query.first()
        if deleting_posttopic:
            deleting_posttopic = PostTopic(
                topic_id = deleting_posttopic.topic_id, 
                post_id = deleting_posttopic.post_id,
                score = deleting_posttopic.score  
            )
            query.delete()
            db.commit()
        return deleting_posttopic

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

posttopic = CRUDPostTopic(PostTopic)
