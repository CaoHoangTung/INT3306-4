from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    is_admin: bool
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class TokenPayload(BaseModel):
    sub: Optional[str] = None
