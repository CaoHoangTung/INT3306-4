from typing import Counter
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Boolean

from db.base_class import Base


class Notification(Base):
    notification_id = Column(Integer, primary_key=True)
    user_id_1 = Column(Integer, nullable=False)
    user_id_2 = Column(Integer, nullable=False)
    post_id = Column(Integer, nullable=True)
    type = Column(String)
    is_seen = Column(Boolean, default=False)
    created_at = Column(DateTime)