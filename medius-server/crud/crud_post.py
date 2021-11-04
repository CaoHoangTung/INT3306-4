from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from  sqlalchemy.sql.expression import func, null, update

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.post import Post
from schemas.post import PostBase, PostCreate, PostUpdate


class CRUDPost(CRUDBase[Post, PostCreate, PostUpdate]):
    """
    Get a post by id
    """
    def get_by_post_id(self, db: Session, *, post_id: int) -> Optional[Post]:
        try:
            return db.query(Post) \
                .filter(Post.post_id == post_id) \
                .first()
        except:
            return None
    
    """
    Get all posts with user_id 
    """  
    def get_by_user_id(self, db: Session, *, user_id: str) -> List[Post]:
        try:
            return db.query(Post) \
                .filter(Post.user_id == user_id) \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: PostCreate, user_id: int) -> Post:
        db_obj = Post(
            content=obj_in.content,
            title=obj_in.title,
            preview_image_path = obj_in.preview_image_path,
            cover_image_path = obj_in.cover_image_path,
            view_count = 0,
            upvote = 0,
            downvote = 0,
            published_at = func.now(), ##### TODO: need to fix this 
            created_at = func.now(),
            updated_at = func.now(),
            user_id = user_id
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Post, obj_in: Union[PostUpdate, Dict[str, Any]]
    ) -> Post:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, post_id: str) -> Any:
        query = db.query(Post).filter(Post.post_id == post_id)
        deleting_post = query.first()
        if deleting_post:
            deleting_post = Post(
                user_id = deleting_post.user_id, 
                title = deleting_post.title, 
                content = deleting_post.content, 
                created_at = deleting_post.created_at, 
                published_at = deleting_post.published_at, 
                preview_image_path = deleting_post.preview_image_path,
                cover_image_path = deleting_post.cover_image_path,
                upvote = deleting_post.upvote,
                downvote = deleting_post.downvote,
                post_id = deleting_post.post_id
            )
            query.delete()
            db.commit()
        return deleting_post

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

post = CRUDPost(Post)
