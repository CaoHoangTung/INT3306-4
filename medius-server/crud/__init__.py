from .crud_user import user
from .crud_category import category
from .crud_conversation import conversation
from .crud_message import message
from .crud_post import post
from .crud_topic import topic

# For a new basic set of CRUD operations you could just do

# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)
