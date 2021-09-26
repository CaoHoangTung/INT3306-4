import logging
import time

from db.init_db import init_db
from db.session import SessionLocal

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    db = SessionLocal()
    init_db(db)


def main() -> None:
    logger.info("Creating initial user")
    while True:
        try:
            init()
            break
        except Exception as e:
            logger.error(str(e))
            logger.info("Fail to create initial user, the database might be on the initial process. If this message occured for more than 10 minutes, check your db container connection")
            time.sleep(10)
            
    logger.info("Initial data created")


if __name__ == "__main__":
    main()
