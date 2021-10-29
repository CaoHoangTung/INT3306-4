import os

class Settings():
    API_V1_STR: str = "/api"
    
    SECRET_KEY: str = "vinbdi-dgtool"
    
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    
    
    FIRST_SUPERUSER: str = "vinbdi"
    FIRST_SUPERUSER_PASSWORD: str = "Vinbdi@2021"
    # SQLALCHEMY_DATABASE_URI: str = "mysql://vinbdi:Vinbdi@2021@dg-db:3306/dialog-generation-db" if os.environ.get('PRODUCTION') == "1" else "mysql://vinbdi:Vinbdi@2021@127.0.0.1:3306/dialog-generation-db"
    SQLALCHEMY_DATABASE_URI: str = "mysql://root:uet@2021@165.22.106.61:3306/medius"
    
settings = Settings()