import MediumPosts from "../home/PostPreview.js";
import React, { useEffect, useState } from 'react';
import '../../pages/main/Main.scss'
import CommentBox from "../shared/CommentBox";
import { getPosts } from "../../api/posts.js";
import { getUser } from "../../api/users.js";

function NewsFeed({ user_id = null, topic_ids = [], sort_by_upvote = false, page = 0, limit = 100 }) {
    const [show, setShow] = useState();
    const [posts, setPosts] = React.useState([]);

    useEffect(() => {
        console.log("TOPICS", topic_ids)
        getPosts(
            user_id, topic_ids, sort_by_upvote, page, limit
        ).then(posts => {
            console.log(posts);
            const promises = [];
            for (let i = 0; i < posts.length; i++) {
                promises.push(getUser(posts[i].user_id));
            }
            Promise.all(promises).then(users => {
                console.log("USERS", users);
                for (let i = 0; i < posts.length; i++) {
                    posts[i].author = users[i].first_name + " " + users[i].last_name;
                }
                setPosts(posts);
            });
        });
    }, []);

    return (
        <div>
            {/* <CommentBox onClose={() => { setShow(false) }} show={show} /> */}
            {posts.map(post => {
                return (
                    <MediumPosts
                        key={post.post_id}
                        postId={post.post_id}
                        author={post.author}
                        // topic="topic"
                        title={post.title}
                        postTime={post.published_at}
                        previewImagePath={post.preview_image_path}
                    />
                )
            })}

        </div>
    )
}
export default NewsFeed;