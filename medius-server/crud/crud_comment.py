from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from  sqlalchemy.sql.expression import func, update

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.comment import Comment
from schemas.comment import CommentBase, CommentCreate, CommentUpdate


class CRUDComment(CRUDBase[Comment, CommentCreate, CommentUpdate]):
    """
    Get a comment by id
    """
    def get_by_comment_id(self, db: Session, *, comment_id: int) -> Optional[Comment]:
        try:
            return db.query(Comment) \
                .filter(Comment.comment_id == comment_id) \
                .first()
        except:
            return None

    """
    Get all comments 
    """  
    def get_all(self, db: Session) -> List[Comment]:
        try:
            return db.query(Comment) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None
    
    """
    Get all comments with post_id 
    """  
    def get_by_post_id(self, db: Session, *, post_id: str) -> List[Comment]:
        try:
            return db.query(Comment) \
                .filter(Comment.post_id == post_id) \
                .all()
        except Exception as e:
            print(e)
            return None

    """
    Get all comments with user_id 
    """  
    def get_by_user_id(self, db: Session, *, user_id: str) -> List[Comment]:
        try:
            return db.query(Comment) \
                .filter(Comment.user_id == user_id) \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: CommentCreate, user_id: int) -> Comment:
        db_obj = Comment(
            post_id=obj_in.post_id,
            user_id=user_id,
            content=obj_in.content,
            created_at=func.now(),
            upvote=0,
            downvote=0
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Comment, obj_in: Union[CommentUpdate, Dict[str, Any]]
    ) -> Comment:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, comment_id: str) -> Any:
        query = db.query(Comment).filter(Comment.comment_id == comment_id)
        deleting_comment = query.first()
        if deleting_comment:
            deleting_comment = Comment(
                comment_id=deleting_comment.comment_id,
                post_id=deleting_comment.post_id,
                user_id=deleting_comment.user_id, 
                content=deleting_comment.content,
                created_at=deleting_comment.created_at,
                upvote=deleting_comment.upvote,
                downvote=deleting_comment.downvote
            )
            query.delete()
            db.commit()
        return deleting_comment

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

comment = CRUDComment(Comment)
