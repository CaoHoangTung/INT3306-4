from typing import Any, Dict, Optional, Union, List

from sqlalchemy import asc
from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.message import Message
from schemas.message import MessageBase, MessageCreate, MessageUpdate
import time

class CRUDMessage(CRUDBase[Message, MessageCreate, MessageUpdate]):
    def get_all(self, db: Session) -> Optional[List[Message]]:
        return db.query(Message).all()
    
    def get_by_message_id(self, db: Session, *, message_id: str) -> Optional[Message]:
        try:
            return db.query(Message).filter(Message.message_id == message_id).first()
        except:
            return None

    def get_by_conversation_id(self, db: Session, *, conversation_id: str) -> List[Message]:
        try:
            return db.query(Message) \
                .order_by(asc(Message.sent_time)) \
                .filter(Message.conversation_id == conversation_id) \
                .all()
        except:
            return None

    def create(self, db: Session, *, obj_in: MessageCreate, active_user:str) -> Message:
        db_obj = Message(
            message=obj_in.message,
            sender=active_user,
            conversation_id=obj_in.conversation_id,
            sent_as=obj_in.sent_as
        )
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Message, obj_in: Union[MessageUpdate, Dict[str, Any]]
    ) -> Message:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        
        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def delete(self, db: Session, *, message_id: str) -> Any:
        query = db.query(Message).filter(Message.message_id == message_id)
        deleting_message = query.first()
        if deleting_message:
            deleting_message = Message(
                message_id=deleting_message.message_id,
                message=deleting_message.message,
                sender=deleting_message.sender,
                conversation_id=deleting_message.conversation_id,
                sent_as=deleting_message.sent_as,
                sent_time=deleting_message.sent_time
            )
            query.delete()
            db.commit()
        return deleting_message

    def truncate(self, db: Session) -> bool:
        result = db.execute("""
            DELETE FROM message WHERE 1;
        """)
        db.commit()
        return result
        
message = CRUDMessage(Message)
