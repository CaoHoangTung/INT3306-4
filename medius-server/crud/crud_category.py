from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.category import Category
from schemas.category import CategoryBase


class CRUDCategory(CRUDBase[Category, CategoryBase, CategoryBase]):
    def get_all(self, db: Session) -> Optional[List[Category]]:
        return db.query(Category).all()
    
    def get_by_category_id(self, db: Session, *, category_id: str) -> Optional[Category]:
        try:
            return db.query(Category).filter(Category.category_id == category_id).first()
        except:
            return None

    def create(self, db: Session, *, obj_in: CategoryBase) -> Category:
        db_obj = Category(
            category_id=obj_in.category_id,
            category_description=obj_in.category_description,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Category, obj_in: Union[CategoryBase, Dict[str, Any]]
    ) -> Category:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
            
        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, category_id: str) -> Any:
        query = db.query(Category).filter(Category.category_id == category_id)
        deleting_category = query.first()
        if deleting_category:
            query.delete()
            db.commit()
        return deleting_category
    
    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM category WHERE 1;
        """)
        db.commit()
        return result

category = CRUDCategory(Category)
