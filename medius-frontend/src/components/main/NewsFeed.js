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
            <CommentModal onClose={() => { setShow(false) }} show={show} />
            {posts.map(post => (
                <MediumPosts
                    key={post.post_id}
                    post_id={post.post_id}
                    author={post.author}
                    title={post.title}
                    contentPreview={post.contentPreview}
                    postTime={post.published_at}
                    previewImagePath={post.preview_image_path}
                />
            ))}

        </div>
    )
}
export default NewsFeed;