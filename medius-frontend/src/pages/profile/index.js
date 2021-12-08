import './style.scss'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React from 'react';
import MainNavBar from "../../components/main/MainNavBar.js";
import ProfileCard from '../../components/profile/ProfileCard';
import PostInProfile from '../../components/profile/PostInProfile';
import { useState, useEffect } from 'react';
import { getUser } from '../../api/users';
import { getCurrentUser } from '../../utils/auth';
import { getAllPostsOfUserId } from '../../api/posts';
import { getUserRelation } from '../../api/users_users';

function Profile(props) {
    const [author, setAuthor] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUser(props.userId)
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
            })
            .catch(err => {
                console.log(err)
            });
    }, [props.userId]);

    useEffect(() => {
        getAllPostsOfUserId(props.userId)
            .then(data => {
                setPosts(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.userId]);
    return (
        <div>
            <MainNavBar/>
            <div className="viewPost">
                <Container>
                    <Grid container spacing={2}>
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
                            {posts.map(post => (
                                <PostInProfile
                                    key={"PostInProfile" + post.post_id}
                                    author_name={author.first_name + " " + author.last_name}
                                    author_avatar="https://picsum.photos/seed/picsum/200/300"
                                    post={post}
                                    isOwner={isOwner}
                                    />
                                    ))}
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </Container>
                <div className="footer">
                </div>
            </div>
        </div>
    );
}
export default Profile;