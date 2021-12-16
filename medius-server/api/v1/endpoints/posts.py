from datetime import timedelta
from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user
from sqlalchemy import func, and_
from starlette import responses 

import crud, models, schemas
from api import deps, msg
from core import security
from settings import settings
from core.security import get_password_hash
from fastapi import FastAPI, Form, Depends, HTTPException
from schemas.post import PostCreate, PostDelete, PostUpdate
from schemas.posttopic import PostTopicCreate

router = APIRouter()

@router.get("/all", response_model=List[schemas.Post])
def view_all_posts(db: Session = Depends(deps.get_db), user_id: str = Query(None), topic_ids: Optional[List[str]] = Query(None), sort_by_upvote: bool = Query(None), offset: int = Query(0), limit: int = Query(None)) -> Any:
    """
    Get all posts with user_id 
    """
    print("TOPCI", topic_ids)
    if topic_ids:
        if not user_id: 
            posts = db.query(models.Post).outerjoin(models.PostTopic).filter(models.PostTopic.topic_id.in_(topic_ids)).\
                group_by(models.Post.post_id).\
                having(func.count(models.PostTopic.topic_id) == len(topic_ids)).all()
        else:
            posts = db.query(models.Post).outerjoin(models.PostTopic).\
                filter(and_(models.PostTopic.topic_id.in_(topic_ids), models.Post.user_id == user_id)).\
                group_by(models.Post.post_id).\
                having(func.count(models.PostTopic.topic_id) == len(topic_ids)).all()
    elif user_id: 
        posts = crud.post.get_by_user_id(db=db, user_id=user_id)
    else: 
        posts = crud.post.get_all(db=db)
    
    if sort_by_upvote: 
        posts = sorted(posts, key = lambda post: post.upvote, reverse=False)

    posts.reverse()

    if limit:
        posts = posts[offset:offset+limit]

    if not isinstance(posts, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    print('A')
    schemas_posts = []
    for post in posts: 
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.get_user_detail(db=db)
        schemas_posts.append(schemas_post)
    print('B')

    return posts #schemas_posts    

@router.get("/saved-posts", response_model=List[schemas.Post])
def view_saved_posts(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    "Get saved posts of current users"
    posts = crud.post.get_saved_post_by_user_id(db=db, user_id=current_user.user_id)
    
    if not isinstance(posts, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_posts = []
    for post in posts: 
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.get_user_detail(db=db)
        schemas_posts.append(schemas_post)
            
    return schemas_posts    


@router.get("/view/{post_id}", response_model=schemas.Post)
def view_post(db: Session = Depends(deps.get_db), post_id:str = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    View post
    """
    post = crud.post.get_by_post_id(
        db=db, 
        post_id=post_id
    )
    if not post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)

    schemas_post = schemas.Post.from_orm(post)
    schemas_post.get_user_detail(db=db)
    return schemas_post

@router.post("/create", response_model=schemas.Post)
def create_post(db: Session = Depends(deps.get_db), creating_post: PostCreate = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Create new post
    """
    try:
        post = crud.post.create(
            db=db, 
            obj_in=creating_post,
            # user_id =  creating_post.user_id
            user_id=current_user.user_id
        )
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.get_user_detail(db=db)
        return schemas_post
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=msg.INVALID_POST_ID)
    
    
@router.put("/update", response_model=schemas.Post)
def update_post(db: Session = Depends(deps.get_db), updating_post: PostUpdate = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Update post
    """

    query_post = crud.post.get_by_post_id(db=db, post_id=updating_post.post_id)
    if not query_post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)

    if query_post.user_id != current_user.user_id and not crud.user.is_admin(db=db, user=current_user):
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)
        
    post = crud.post.update(
        db=db,
        db_obj=query_post,
        obj_in=updating_post
    )
    schemas_post = schemas.Post.from_orm(post)
    schemas_post.get_user_detail(db=db)
    return schemas_post

    
@router.delete("/delete", response_model=schemas.Post)
def delete_post(db: Session = Depends(deps.get_db), deleting_post: PostDelete = None, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Delete post
    """

    query_post = crud.post.get_by_post_id(db=db, post_id=deleting_post.post_id)
    if not query_post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)
    if query_post.user_id != current_user.user_id and not crud.user.is_admin(db=db, user=current_user):
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)

    post = crud.post.delete(
        db=db,
        post_id=deleting_post.post_id
    )
    if not post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)
    
    return post

# additional routers 
@router.get("/search", response_model=List[schemas.Post]) 
def search(db: Session = Depends(deps.get_db), *, searched_text: Optional[str] = Query(None), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    raw_posts = crud.post.search_post_by_text(
        db=db,
        searched_text=searched_text
    )

    posts = []
    for row in raw_posts:
        post = models.Post(
            user_id=row.user_id,
            title=row.title, 
            content=row.content,
            created_at=row.created_at,
            updated_at=row.updated_at,
            published_at=row.published_at,
            preview_image_path=row.preview_image_path,
            cover_image_path=row.cover_image_path,
            upvote=row.upvote,
            downvote=row.downvote,
            post_id=row.post_id,
            view_count=row.view_count
        )
        posts.append(post)

    if not isinstance(posts, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_posts = []
    for post in posts: 
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.get_user_detail(db=db)
        schemas_posts.append(schemas_post)
    return schemas_posts    

@router.get("/view-topics/{post_id}", response_model=List[schemas.Topic])
def get_topic_title(db: Session = Depends(deps.get_db), *, post_id, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    post = crud.post.get_by_post_id(
        db=db,
        post_id=post_id
    )

    if not post:
        raise HTTPException(status_code=404, detail=msg.INVALID_POST_ID)

    topics = []
    for relationtopic in post.topics:
        topic = crud.topic.get_by_topic_id(db, topic_id=relationtopic.topic_id) 
        topics.append(topic)

    return topics 

@router.delete("/truncate", response_model=schemas.Post)
def delete_post(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_admin)) -> Any:
    """
    Delete all posts
    """

    crud.post.truncate(db=db)
    return None