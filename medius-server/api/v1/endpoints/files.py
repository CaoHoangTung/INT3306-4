from fastapi import APIRouter, UploadFile, File, HTTPException

import schemas 
from api import deps, msg
from core import security, send_email
from settings import settings
import crud
from core.s3 import upload_file

router = APIRouter()

@router.post("/upload")
async def create_upload_file(file: UploadFile = File(...)):
    print(file)
    try:
        result = upload_file(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=msg.S3_UPLOAD_ERROR)