import os
from functools import lru_cache

class Settings():
    API_V1_STR: str = "/api"
    
    SECRET_KEY: str = "vinbdi-dgtool"
    
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    
    
    FIRST_SUPERUSER: str = "vinbdi"
    FIRST_SUPERUSER_PASSWORD: str = "Vinbdi@2021"
    # SQLALCHEMY_DATABASE_URI: str = "mysql://root:uet@2021@165.22.106.61:3306/medius"
    SQLALCHEMY_DATABASE_URI: str = "mysql://root:uet@2021@159.223.79.135:3306/medius"

    DOMAIN_NAME: str = "medius.tk"
    
    S3_REGION: str
    S3_ENDPOINT: str
    S3_BUCKET: str
    S3_ACCESS_KEY: str
    S3_SECRET_KEY: str
    
    class Config:
        env_file = ".env"
    
settings = Settings()

@lru_cache()
def get_settings():
    return Settings()