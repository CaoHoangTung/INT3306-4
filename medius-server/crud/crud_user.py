from typing import Any, Dict, Optional, Union, List

from sqlalchemy import asc
from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.user import User
from schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_all(self, db: Session) -> Optional[List[User]]:
        return db.query(User).all()
    
    def get_by_user_id(self, db: Session, *, user_id: str) -> Optional[User]:
        return db.query(User).filter(User.user_id == user_id).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            user_id=obj_in.user_id,
            password=get_password_hash(obj_in.password),
            role=obj_in.role,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data["password"]:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["password"] = hashed_password
        else:
            update_data["password"] = db_obj.password
        
        if not update_data["role"]:
            update_data["role"] = db_obj.role
            
        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, user_id: str) -> Any:
        query = db.query(User).filter(User.user_id == user_id)
        deleting_user = query.first()
        if deleting_user:
            query.delete()
            db.commit()
        return deleting_user

    def authenticate(self, db: Session, *, user_id: str, password: str) -> Optional[User]:
        user = self.get_by_user_id(db, user_id=user_id)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    def is_admin(self, user: User) -> bool:
        return user.role == "admin"
        


user = CRUDUser(User)
