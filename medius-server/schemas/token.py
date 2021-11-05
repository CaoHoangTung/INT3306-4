from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    is_admin: bool


class TokenPayload(BaseModel):
    sub: Optional[str] = None
