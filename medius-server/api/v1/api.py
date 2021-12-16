from fastapi import APIRouter

from api.v1.endpoints import login, users, posts, topics, posttopics, userpostrelations, usertopics, userrelations, comments, roles, notifications, passwordreset, files

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])

api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
api_router.include_router(files.router, prefix="/files", tags=["files"])
api_router.include_router(topics.router, prefix="/topic", tags=["topic"])
api_router.include_router(posttopics.router, prefix="/posttopic", tags=["posts-topic"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(userpostrelations.router, prefix="/userpost", tags=["users-posts"])
api_router.include_router(usertopics.router, prefix="/usertopic", tags=["users-topics"])
api_router.include_router(userrelations.router, prefix="/userrelation", tags=["users-users"])
api_router.include_router(comments.router, prefix="/comment", tags=["comments"])
api_router.include_router(roles.router, prefix="/role", tags=["role"])
api_router.include_router(notifications.router, prefix="/notification", tags=["notification"])
api_router.include_router(passwordreset.router, prefix="/passwordreset", tags=["passwordreset"])
