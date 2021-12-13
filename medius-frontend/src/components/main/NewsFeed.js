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
            console.log(posts)
            setPosts(posts);
        })
    }, []);

    return (
        <div>
            <CommentModal onClose={() => { setShow(false) }} show={show} />
            {posts.map(post => {
                return (
                    <MediumPosts
                        author={post.author}
                        // topic="topic"
                        title={post.title}
                        // contentPreview="contentPreview"
                        postTime={post.published_at}
                    />
                )
            })}

        </div>
    )
}
export default NewsFeed;