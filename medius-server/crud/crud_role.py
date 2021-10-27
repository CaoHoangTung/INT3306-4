from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase

from models.role import Role
from schemas.role import RoleBase, RoleCreate, RoleUpdate


class CRUDRole(CRUDBase[Role, RoleCreate, RoleUpdate]):
    """
    Get a role by id
    """
    def get_by_role_id(self, db: Session, *, role_id: int) -> Optional[Role]:
        try:
            return db.query(role_id) \
                .filter(Role.role_id == role_id) \
                .first()
        except:
            return None
    
    """
    Get all roles 
    """  
    def get_all(self, db: Session) -> List[Role]:
        try:
            return db.query(Role) \
                .filter() \
                .all()
        except Exception as e:
            print(e)
            return None

    def create(self, db: Session, *, obj_in: RoleCreate) -> Role:
        db_obj = Role(
            role_name=obj_in.role_name, 
            is_admin=obj_in.is_admin
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Role, obj_in: Union[RoleUpdate, Dict[str, Any]]
    ) -> Role:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, role_id: str) -> Any:
        query = db.query(Role).filter(Role.role_id == role_id)
        deleting_role = query.first()
        if deleting_role:
            deleting_role = Role(
                role_id = deleting_role.role_id, 
                role_name = deleting_role.role_name, 
                is_admin = deleting_role.is_admin 
            )
            query.delete()
            db.commit()
        return deleting_role

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

role = CRUDRole(Role)
