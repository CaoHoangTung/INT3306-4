import MediumPosts from "../home/PostPreview.js";
import React, { useEffect, useState } from 'react';
import '../../pages/main/Main.scss'
import CommentModal from "../shared/CommentModal";
import { getPosts } from "../../api/posts.js";

function NewsFeed({ user_id = null, topic_ids = [], sort_by_upvote = false, page = 0, limit = 100 }) {
    const [show, setShow] = useState();
    const [posts, setPosts] = React.useState([]);

    useEffect(() => {
        getPosts(
            user_id, topic_ids, sort_by_upvote, page, limit
        ).then(posts => {
            setPosts(posts);
        })
    }, []);

    return (
        <div>
            <CommentModal onClose={() => {setShow(false)} } show={show}/>
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />

        </div>
    )
}
export default NewsFeed;