from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import conv
from  sqlalchemy.sql.expression import func

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.conversation import Conversation
from models.message import Message
from schemas.conversation import ConversationBase, ConversationCreate, ConversationUpdate


class CRUDConversation(CRUDBase[Conversation, ConversationCreate, ConversationUpdate]):
    def count(self, db: Session, category_id:Optional[str]=None, is_finished:Optional[int]=None) -> int:
        result = db.query(Conversation)
        if category_id is not None:
            result = result.filter(Conversation.category_id == category_id)
        if is_finished is not None:
            result = result.filter(Conversation.is_finished == is_finished)
            
        return result.count()
        
    """
    Get all conversation
    """
    def get_all(self, db: Session, category_id:Optional[str]=None, is_finished:Optional[int]=None, offset:Optional[int]=0, limit:Optional[int]=None) -> Optional[List[Conversation]]:
        result = db.query(Conversation)
        
        if category_id is not None:
            result = result.filter(Conversation.category_id == category_id)
        if is_finished is not None:
            result = result.filter(Conversation.is_finished == is_finished)
        if limit is not None:
            result = result.limit(limit)
        if offset is not None:
            result = result.offset(offset)
            
        return result.all()
        
    """
    Get a conversation by id
    """
    def get_by_conversation_id(self, db: Session, *, conversation_id: str) -> Optional[Conversation]:
        try:
            return db.query(Conversation) \
                .filter(Conversation.conversation_id == conversation_id) \
                .first()
        except:
            return None
    
    """
    Get conversation list by category id
    """  
    def get_by_category_id(self, db: Session, *, category_id: str) -> List[Conversation]:
        try:
            return db.query(Conversation) \
                .filter(Conversation.category_id == category_id) \
                .all()
        except Exception as e:
            print(e)
            return None

    """
    Unassign an user from all active conversations
    """
    def unassign_user_conversations(self, db: Session, user_id: str) -> Optional[bool]:
        try:
            conversation = db.query(Conversation) \
                .filter(Conversation.active_user == user_id) \
                .first()

            self.update(
                db=db,
                db_obj=conversation,
                obj_in=ConversationUpdate(
                    conversation_id=conversation.conversation_id,
                    conversation_goal=conversation.conversation_goal,
                    category_id=conversation.category_id,
                    active_user=None,
                    is_finished=conversation.is_finished
                )
            )
            return True
        except Exception as e:
            print("ERR", e)
            return False

    """
    Get a random conversation that was not assigned to any user
    """
    def get_unassigned_conversation(self, db: Session) -> Optional[Conversation]:       
        return db.query(Conversation) \
            .filter(Conversation.is_finished == 0 and Conversation.active_user is not None) \
            .order_by(func.rand()) \
            .first()
    
    def create(self, db: Session, *, obj_in: ConversationCreate) -> Conversation:
        db_obj = Conversation(
            conversation_id=obj_in.conversation_id,
            conversation_goal=obj_in.conversation_goal,
            category_id=obj_in.category_id,
            is_finished=0,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    """
    TODO
    """
    def bulk_create(self, db: Session, bulk_objects: List[ConversationCreate]) -> List[Conversation]:
        return db.bulk_save_objects(bulk_objects)
    

    def update(
        self, db: Session, *, db_obj: Conversation, obj_in: Union[ConversationUpdate, Dict[str, Any]]
    ) -> Conversation:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        
        # for key in ["conversation_goal", "category_id", "is_finished"]:
        #     if update_data[key] is None:
        #         update_data[key] = getattr(db_obj, key)

        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, conversation_id: str) -> Any:
        query = db.query(Conversation).filter(Conversation.conversation_id == conversation_id)
        deleting_conversation = query.first()
        if deleting_conversation:
            deleting_conversation = Conversation(
                conversation_id=deleting_conversation.conversation_id,
                category_id=deleting_conversation.category_id,
                active_user=deleting_conversation.active_user,
                conversation_goal=deleting_conversation.conversation_goal,
                is_finished=deleting_conversation.is_finished,   
            )
            query.delete()
            db.commit()
        return deleting_conversation

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM conversation WHERE 1;
        """)
        db.commit()
        return result

conversation = CRUDConversation(Conversation)
