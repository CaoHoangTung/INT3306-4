from datetime import timedelta
from re import S
from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from requests.api import post
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
import random 

router = APIRouter()

@router.get("/all", response_model=List[schemas.Post])
def view_all_posts(db: Session = Depends(deps.get_db), user_id: str = Query(None), topic_ids: Optional[List[str]] = Query(None), sort_by_upvote: bool = Query(None), offset: int = Query(0), limit: int = Query(10)) -> Any:
    """
    Get all posts with user_id 
    """
    query = db.query(models.Post, models.User)
    query = query.join(models.User, models.User.user_id == models.Post.user_id)
    if topic_ids:
        query = query.outerjoin(models.PostTopic).filter(models.PostTopic.topic_id.in_(topic_ids))
    
        if user_id:
            query = query.filter(models.Post.user_id == user_id)
    elif user_id:
        query = query.filter(models.Post.user_id == user_id)
    else:
        pass
    
    if sort_by_upvote: 
        query = query.order_by(models.Post.upvote.desc())
        
    query = query.order_by(models.Post.created_at.desc())
    
    if limit:
        query = query.limit(limit).offset(offset)

    results = query.all()

    if not isinstance(results, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_posts = []
    for post, user in results: 
        assert post.user_id == user.user_id
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.user_detail = user
        schemas_posts.append(schemas_post)
    return schemas_posts

@router.get("/saved-posts", response_model=List[schemas.Post])
def view_saved_posts(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user), user_id: str = Query(None), topic_ids: Optional[List[str]] = Query(None), sort_by_upvote: bool = Query(None), offset: int = Query(0), limit: int = Query(10)) -> Any:
    """
    Get saved posts of current users
    """
    query = db.query(models.Post, models.User)
    query = query.join(models.User, models.User.user_id == models.Post.user_id)
    query = query.join(models.UserPostRelation, and_(models.UserPostRelation.is_saved == True, models.UserPostRelation.post_id == models.Post.post_id))
    if topic_ids:
        query = query.outerjoin(models.PostTopic).filter(models.PostTopic.topic_id.in_(topic_ids))
    
        if user_id:
            query = query.filter(models.Post.user_id == user_id)
    elif user_id:
        query = query.filter(models.Post.user_id == user_id)
    else:
        pass
    
    
    if sort_by_upvote: 
        query = query.order_by(models.Post.upvote.desc())
        
    query = query.order_by(models.Post.created_at.desc())
    
    if limit:
        query = query.limit(limit).offset(offset)

    results = query.all()

    if not isinstance(results, List):
        raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    schemas_posts = []
    for post, user in results: 
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.user_detail = user
        schemas_posts.append(schemas_post)
    return schemas_posts
    # posts = crud.post.get_saved_post_by_user_id(db=db, user_id=current_user.user_id)
    
    # if not isinstance(posts, List):
    #     raise HTTPException(status_code=500, detail=msg.DATABASE_ERROR)

    # schemas_posts = []
    # for post in posts: 
    #     schemas_post = schemas.Post.from_orm(post)
    #     schemas_post.get_user_detail(db=db)
    #     schemas_posts.append(schemas_post)
            
    # return schemas_posts    


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
            user_id = creating_post.user_id
            # user_id=current_user.user_id
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


@router.get("/suggest", response_model=List[schemas.Post]) 
def suggest_posts(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Get list of suggestible posts 
    """

    # print(current_user.user_id)
    schemas_posts = []

    # post suggested from following user  
    query = db.query(models.User, models.Post)
    query = query.join(models.User, models.User.user_id == models.Post.user_id)
    query = query.join(models.UserRelation, and_(
        models.UserRelation.is_following == True,
        models.UserRelation.user_id_1 == current_user.user_id,
        models.UserRelation.user_id_2 == models.User.user_id))

    results = query.all()
    random.shuffle(results)

    taken_post_id = []
    for user, post in results: 
        assert post.user_id == user.user_id
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.user_detail = user
        schemas_posts.append(schemas_post)

        taken_post_id.append(int(post.post_id))

    # post suggested from list liked topics
    query = db.query(models.Topic, models.PostTopic) 
    query = query.join(models.PostTopic, models.Topic.topic_id == models.PostTopic.topic_id)

    query = query.join(models.UserPostRelation, and_(
        models.PostTopic.post_id == models.UserPostRelation.post_id,
        models.UserPostRelation.user_id == current_user.user_id,
        models.UserPostRelation.is_upvote == True  
    ))

    liked_topics = []
    for post, topic in query.all():
        liked_topics.append(topic.topic_id)

    query = db.query(models.User, models.Post)
    query = query.join(models.User, models.User.user_id == models.Post.user_id)

    query = query.join(models.PostTopic, and_(
        models.Post.post_id == models.PostTopic.post_id, 
        models.PostTopic.topic_id.in_(liked_topics),
        models.Post.post_id.notin_(taken_post_id)
    ))

    results = query.all()
    random.shuffle(results)
    for user, post in results: 
        assert post.user_id == user.user_id
        schemas_post = schemas.Post.from_orm(post)
        schemas_post.user_detail = user
        schemas_posts.append(schemas_post)
    
    return schemas_posts

    # for user, post in query.all():

    # query = db.query(models.Topic)
    # query = query.join(models.PostTopic, models.PostTopic.topic_id == models.Topic.topic_id)
    # # query = db.query(models.Topic, models.PostTopic).filter(models.PostTopic.topic_id == models.Topic.topic_id)
    # query = query.join(models.UserPostRelation, and_(\
    #     models.UserPostRelation.post_id == models.PostTopic.post_id,\
    #     models.UserPostRelation.user_id == 9))

    # schemas_topic = []
    # for topic in query.all():
    #     schemas_topic.append(topic)
    
    # return schemas_topic
    
