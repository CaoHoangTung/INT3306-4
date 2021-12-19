from typing import Any, Dict, Optional, Union, List

from sqlalchemy import asc, and_, or_
from sqlalchemy.orm import Session

from  sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models import User, Role
from schemas.user import UserCreate, UserUpdate

from crud.crud_role import role


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_all(self, db: Session) -> Optional[List[User]]:
        return db.query(User).all()
    
    
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_id(self, db:Session, *, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.user_id == user_id).first()


    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            profile=obj_in.profile,
            avatar_path=obj_in.avatar_path,
            cover_image_path=obj_in.cover_image_path,
            role_id=obj_in.role_id,
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            email=obj_in.email,  
            password_hash=get_password_hash(obj_in.password),
            register_at = func.now(),
            last_seen_at = func.now() # TODO: need to fix this 
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

        if "password_hash" in update_data:
            hashed_password = get_password_hash(update_data["password_hash"])
            del update_data["password_hash"]
            update_data["password_hash"] = hashed_password

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    
    def delete(self, db: Session, *, user_id: int) -> Any:
        query = db.query(User).filter(User.user_id == user_id)
        deleting_user = query.first()
        if deleting_user:
            deleting_user = User( 
                user_id = deleting_user.user_id, 
                role_id = deleting_user.role_id,
                first_name = deleting_user.first_name, 
                last_name = deleting_user.last_name, 
                email = deleting_user.email, 
                password_hash = deleting_user.password_hash, 
                register_at = deleting_user.register_at, 
                last_seen_at = deleting_user.last_seen_at,
                profile = deleting_user.profile, 
                avatar_path = deleting_user.avatar_path, 
                cover_image_path = deleting_user.cover_image_path
            )
            query.delete()
            db.commit()
        return deleting_user


    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user


    def is_admin(self, db: Session, user: User) -> bool:
        matched_role = role.get_by_role_id(db=db, role_id=user.role_id)
        role_name = "not_admin"
        if matched_role:
            role_name = matched_role.role_name
        
        return role_name == "admin"


    def search(self, db: Session, text: str) -> List: 
        users = db.query(User).filter( or_(\
            User.email.like(str("%" + text + "%")), \
            func.concat(User.first_name, ' ', User.last_name).like(str("%" + text + "%"))) )\
            .all()    

        # res = "%" + text + "%"
        # users = db.query(User).filter(User.email.like(str("%" + text + "%"))).all()
        # users = db.query(User).filter(User.email.like(str())).all()

        return users 

user = CRUDUser(User)
