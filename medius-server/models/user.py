from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import DateTime

from db.base_class import Base


class User(Base):
    user_id = Column(Integer, primary_key=True, index=True)
    role_id = Column(Integer, ForeignKey("Role.role_id"))
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    register_at = Column(DateTime)
    last_seen_at = Column(DateTime)
    profile = Column(String)
    avatar_path = Column(String)
