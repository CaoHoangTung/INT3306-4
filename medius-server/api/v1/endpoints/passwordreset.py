from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.param_functions import Query
from fastapi import Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import ValidationError
from datetime import timedelta
from jose import jwt

import schemas 
from api import deps, msg
from core import security, send_email
from settings import settings
import crud


router = APIRouter()


@router.post("/send-password-token")
def send_password_token(db: Session = Depends(deps.get_db), email: str = Body(..., embed=True)):
    # print(email)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        email, expires_delta=access_token_expires
    )

    send_email.smtp_send_reset_password_email(receive_email=email, url=settings.DOMAIN_NAME + "/passwordreset/?token=" + access_token)
    return access_token
    # send_email.postmark_send_reset_password_email(receive_email=email, url=settings.DOMAIN_NAME + "passwordreset/?token=" + access_token)


@router.post("/change-password", response_model=schemas.User)
def change_password(db: Session = Depends(deps.get_db), token: str = Query(...), hashed_password: str = Body(..., embed=True)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError) as e:
        print("ERROR get_current_user", str(e))
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    user = crud.user.get_by_email(db=db, email=token_data.sub)
    if not user: 
        raise HTTPException(status_code=404, detail="User not found")

    updating_user = schemas.UserUpdate(password_hash = hashed_password)

    crud.user.update(
        db=db,
        db_obj=user,
        obj_in=updating_user 
    )

    return user 