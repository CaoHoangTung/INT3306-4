import MediumPosts from "../home/PostPreview.js";
import React, { useEffect, useState } from 'react';
import '../../pages/main/Main.scss'
import CommentModal from "../shared/CommentModal";
import { getPosts } from "../../api/posts.js";

function NewsFeed() {
    const [show, setShow] = useState();
    const [posts, setPosts] = React.useState([]);

    useEffect(() => {
        getPosts().then(posts => {
            setPosts(posts);
            console.log(posts);
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