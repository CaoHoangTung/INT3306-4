from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase

from models.userpostrelation import UserPostRelation
from schemas.userpostrelation import UserPostRelationBase, UserPostRelationCreate, UserPostRelationUpdate



class CRUDUserPostRelation(CRUDBase[UserPostRelation, UserPostRelationCreate, UserPostRelationUpdate]):
    """
    Get an relationship by user id and post by id
    """
    def get_by_id(self, db: Session, *, user_id: int, post_id: int) -> Optional[UserPostRelation]:
        try:
            return db.query(UserPostRelation) \
                .filter(UserPostRelation.post_id == post_id, UserPostRelation.user_id == user_id) \
                .first()
        except:
            return None

    """
    Get relationships by user id
    """
    def get_by_user_id(self, db: Session, *, user_id: int) -> List[UserPostRelation]:
        try:
            return db.query(UserPostRelation) \
                .filter(UserPostRelation.user_id == user_id) \
                .all()
        except:
            return None

    """
    Get relationships by post_id
    """
    def get_by_post_id(self, db: Session, *, post_id: int) -> List[UserPostRelation]:
        try:
            return db.query(UserPostRelation) \
                .filter(UserPostRelation.post_id == post_id) \
                .all()
        except:
            return None

    
    """
    Get all relationships  
    """  
    def get_all(self, db: Session) -> List[UserPostRelation]:
        try:
            return db.query(UserPostRelation) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: UserPostRelationCreate) -> UserPostRelation:
        db_obj = UserPostRelation(
            user_id=obj_in.user_id, 
            post_id=obj_in.post_id,
            is_saved = obj_in.is_saved, 
            is_blocking = obj_in.is_blocking, 
            is_upvote = obj_in.is_upvote, 
            is_downvote = obj_in.is_downvote
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj

    def update(
        self, db: Session, *, db_obj: UserPostRelation, obj_in: Union[UserPostRelationUpdate, Dict[str, Any]]
    ) -> UserPostRelation:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, user_id: str, post_id: str) -> Any:
        query = db.query(UserPostRelation).filter(UserPostRelation.user_id == user_id, UserPostRelation.post_id == post_id)
        deleting_relation = query.first()
        if deleting_relation:
            deleting_relation = UserPostRelation(
                user_id = deleting_relation.user_id,
                post_id = deleting_relation.post_id,
                is_saved = deleting_relation.is_saved,
                is_blocking = deleting_relation.is_blocking, 
                is_upvote = deleting_relation.is_upvote, 
                is_downvote = deleting_relation.is_downvote 
            )
            query.delete()
            db.commit()
        return deleting_relation

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

userpostrelation = CRUDUserPostRelation(UserPostRelation)
