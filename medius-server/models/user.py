from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relation, relationship
from sqlalchemy import and_
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import DateTime

from db.base_class import Base
from .userrelation import UserRelation

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
    
    posts = relationship("UserPostRelation", back_populates="user")

    # users2 = relationship("User",
    #     secondary="UserRelation",
    #     primaryjoin=(UserRelation.user_id_1==user_id),
    #     secondaryjoin=(UserRelation.user_id_2==user_id),
    #     back_populates=("users1"),
    #     lazy="dynamic" 
    # )
    # users1 = relationship("User",
    #     secondary="UserRelation",
    #     primaryjoin=(UserRelation.user_id_2==user_id),
    #     secondaryjoin=(UserRelation.user_id_1==user_id),
    #     back_populates=("users2"),
    #     lazy="dynamic" 
    # )

    following_relationships = relationship("UserRelation",
        # secondary="UserRelation",
        primaryjoin=(and_(UserRelation.user_id_2==user_id, UserRelation.is_following==True)),
        lazy="dynamic" 
    )