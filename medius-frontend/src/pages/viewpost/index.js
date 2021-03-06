import './style.scss'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React from 'react';
import MainNavBar from "../../components/main/MainNavBar.js";
import ProfileCard from '../../components/profile/ProfileCard';
import PostDetail from '../../components/viewpost/PostDetail';
import Footer from "../../components/home/Footer";
import { useState, useEffect } from 'react';
import { getUser } from '../../api/users';
import { getCurrentUser } from '../../utils/auth';
import { getPost } from '../../api/posts';
import { getUserRelation } from '../../api/users_users';
import { useParams } from 'react-router';

function ViewPost(props) {
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const { postId } = useParams();
    useEffect(() => {
        getPost(postId)
            .then(postData => {
                setPost(postData)
                getUser(postData.user_id)
                    .then(data => {
                        setAuthor(data);
                        if (String(data.user_id) === getCurrentUser()) {
                            setIsOwner(true);
                        } else {
                            getUserRelation(getCurrentUser(), data.user_id)
                                .then(data => {
                                    if (data.is_following === true) {
                                        setIsFollowing(true);
                                    } else {
                                        setIsFollowing(false);
                                    }
                                })
                        }
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }, [isFollowing]);

    return (
        <div>
            <MainNavBar />
            <div className="viewPost">
                <Container>
                    <div style={{ minHeight: "100vh" }}>
                        {!!post && !!author ?
                            <Grid container spacing={2}>
                                <Grid item xs={12}></Grid>
                                <Grid item xs={3}>
                                    <ProfileCard
                                        key={"ProfileCard" + author.user_id}
                                        author={author}
                                        isFollowing={isFollowing}
                                        setIsFollowing={setIsFollowing}
                                        isOwner={isOwner}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <PostDetail
                                        key={"PostDetail" + post?.post_id}
                                        author_name={author?.first_name + " " + author?.last_name}
                                        avatar_path={author.avatar_path}
                                        author_id={post?.user_id}
                                        post={post}
                                        isOwner={isOwner}
                                        postId={postId}
                                    />
                                </Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={12}></Grid>
                                <Grid item xs={12}></Grid>
                            </Grid> : <></>
                        }
                    </div>
                </Container>
                <Footer />
            </div>
        </div>
    );
}
export default ViewPost;