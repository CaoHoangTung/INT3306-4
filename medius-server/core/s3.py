import os
import boto3
import time
import random
from settings import get_settings
from dotenv import load_dotenv

load_dotenv()

S3_REGION = os.getenv("S3_REGION")
S3_ENDPOINT = os.getenv("S3_ENDPOINT")
S3_BUCKET = os.getenv("S3_BUCKET")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY")

session = boto3.session.Session()
client = session.client('s3',
                        region_name=S3_REGION,
                        endpoint_url=S3_ENDPOINT,
                        aws_access_key_id=S3_ACCESS_KEY,
                        aws_secret_access_key=S3_SECRET_KEY)


def upload_file(file):
    filename = f"{time.time()}-{random.randrange(1000)}-{file.filename}"
    result = client.put_object(Bucket=S3_BUCKET,
                    Key=filename,
                    Body=file.file.read(),
                    ACL='public-read',
                    )
    return {
        "url": f"{S3_ENDPOINT}/{S3_BUCKET}/{filename}",
        "detail": result
    }