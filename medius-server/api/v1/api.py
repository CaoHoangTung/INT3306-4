from fastapi import APIRouter

from api.v1.endpoints import login, users, categories, conversations, messages, utils, posts, topics, posttopics, userpostrelations

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["conversations"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])

api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
api_router.include_router(topics.router, prefix="/topic", tags=["topic"])
api_router.include_router(posttopics.router, prefix="/posttopic", tags=["posts", "topic"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(userpostrelations.router, prefix="/userpost", tags=["users", "posts"])