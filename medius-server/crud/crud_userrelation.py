from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase

from models.userrelation import UserRelation
from schemas.userrelation import UserRelationBase, UserRelationCreate, UserRelationUpdate, UserRelationDelete



class CRUDUserRelation(CRUDBase[UserRelation, UserRelationCreate, UserRelationUpdate]):
    """
    Get a relation by id
    """
    def get_by_id(self, db: Session, *, user_id_1: int, user_id_2: int) -> Optional[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_1 == user_id_1, UserRelation.user_id_2 == user_id_2) \
                .first()
        except:
            return None

    """
    Get all relations by user_id_1
    """
    def get_all_relations_by_user_id_1(self, db: Session, *, user_id_1: int) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_1 == user_id_1) \
                .all()
        except:
            return None

    """
    Get all relations by user_id_2
    """
    def get_all_relations_by_user_id_2(self, db: Session, *, user_id_2: int) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_2 == user_id_2) \
                .all()
        except:
            return None

    """
    Get all users is blocked by an user 
    """
    def get_all_users_is_blocked_by_user_id(self, db: Session, *, user_id: int) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_1 == user_id, UserRelation.is_blocking == True) \
                .all()
        except:
            return None

    """
    Get all users is followed by an user 
    """
    def get_all_users_is_followed_by_user_id(self, db: Session, *, user_id: int) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_1 == user_id, UserRelation.is_following == True) \
                .all()
        except:
            return None

    """
    Get all users block an user 
    """
    def get_all_users_block_user_id(self, db: Session, *, user_id: int) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_2 == user_id, UserRelation.is_blocking == True) \
                .all()
        except:
            return None

    """
    Get all users follow an user 
    """
    def get_all_users_follow_user_id(self, db: Session, *, user_id: int) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter(UserRelation.user_id_2 == user_id, UserRelation.is_following == True) \
                .all()
        except:
            return None

    """
    Get all relations 
    """  
    def get_all(self, db: Session) -> List[UserRelation]:
        try:
            return db.query(UserRelation) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: UserRelationCreate) -> UserRelation:
        db_obj = UserRelation(
            user_id_1=obj_in.user_id_1, 
            user_id_2=obj_in.user_id_2,
            is_following=obj_in.is_following,
            is_blocking=obj_in.is_blocking             
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: UserRelation, obj_in: Union[UserRelationUpdate, Dict[str, Any]]
    ) -> UserRelation:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, user_id_1: int, user_id_2: int) -> Any:
        query = db.query(UserRelation).filter(UserRelation.user_id_1 == user_id_1, UserRelation.user_id_2 == user_id_2)

        relation = query.first()
        if relation:
            relation = UserRelation(
                user_id_1=relation.user_id_1, 
                user_id_2=relation.user_id_2,
                is_following=relation.is_following, 
                is_blocking=relation.is_blocking
            )
            query.delete()
            db.commit()
        return relation

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

userrelation = CRUDUserRelation(UserRelation)
