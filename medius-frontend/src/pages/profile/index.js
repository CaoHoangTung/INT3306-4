import './style.scss'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React from 'react';
import MainNavBar from "../../components/main/MainNavBar.js";
import ProfileCard from '../../components/profile/ProfileCard';
// import PostInProfile from '../../components/profile/PostInProfile';
import ProfileFeed from '../../components/profile/ProfileFeed';
import Footer from "../../components/home/Footer";
import { useState, useEffect } from 'react';
import { getUser } from '../../api/users';
import { getCurrentUser } from '../../utils/auth';
import { getAllPostsOfUserId } from '../../api/posts';
import { getUserRelation } from '../../api/users_users';

function Profile(props) {
    const [author, setAuthor] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false);

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
                            if (data.is_blocking === true) {
                                setIsBlocking(true);
                            } else {
                                setIsBlocking(false);
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }, [isFollowing]);

    return (
        <div>
            <MainNavBar/>
            <div className="Profile">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={3}>
                            <ProfileCard
                                key={"ProfileCard" + author.user_id}
                                author={author}
                                isFollowing={isFollowing}
                                setIsFollowing={setIsFollowing}
                                isBlocking={isBlocking}
                                setIsBlocking={setIsBlocking}
                                isOwner={isOwner}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <ProfileFeed 
                                user_id={props.userId}
                                limit={5}
                                isOwner={isOwner}
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
export default Profile;