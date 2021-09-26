import os

class Settings():
    API_V1_STR: str = "/api"
    
    SECRET_KEY: str = "vinbdi-dgtool"
    
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    
    
    FIRST_SUPERUSER: str = "vinbdi"
    FIRST_SUPERUSER_PASSWORD: str = "Vinbdi@2021"
    SQLALCHEMY_DATABASE_URI: str = "mysql://vinbdi:Vinbdi@2021@dg-db:3306/dialog-generation-db" if os.environ.get('PRODUCTION') == "1" else "mysql://vinbdi:Vinbdi@2021@127.0.0.1:3306/dialog-generation-db"

    
settings = Settings()