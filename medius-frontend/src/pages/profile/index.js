import './style.scss'
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React from 'react';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Search from "../../components/main/Search.js";
import ProfileMenu from "../../components/main/AccountMenu.js";
import NotificationsBox from "../../components/main/NotificationsBox.js";
import ProfileCard from '../../components/profile/ProfileCard';
import PostInProfile from '../../components/profile/PostInProfile';
import { useState, useEffect } from 'react';
import { getUser } from '../../api/users';
import { getCurrentUser } from '../../utils/auth';
import { getAllPostsOfUserId } from '../../api/posts';
import { getUserRelation } from '../../api/users_users';
import FollowButton from '../../components/profile/FollowButton';

function Profile(props) {
    const [author, setAuthor] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUser(props.userId)
            .then(data => {
                setAuthor(data);
                if (data.user_id === getCurrentUser()) {
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
                for (let post of data) {
                    console.log(post);
                    post.is_saved = false;
                }
                setPosts(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.userId]);

    return (
        <div className="viewPost">
            <div className="header">
                <div className="leftHeader">
                    <Button variant="text">{author.first_name + " " + author.last_name}</Button>
                    <Button variant="text">{author.num_followers} Followers</Button>
                    <FollowButton
                        isFollowing={isFollowing}
                        setIsFollowing={setIsFollowing}
                        isOwner={isOwner}
                    />
                    <EmailIcon></EmailIcon>
                </div>
                <div className="rightHeader">
                    <Search />
                    <BookmarksIcon />
                    <NotificationsBox />
                    <ProfileMenu />
                </div>
            </div>

            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ProfileCard
                            email={author.email}
                            first_name={author.first_name}
                            last_name={author.last_name}
                            avatar="https://picsum.photos/seed/picsum/200/300"
                            profile="I am a software engineer at UET"
                            numberOfPost="10"
                            numFollowers={author.num_followers}
                            isFollowing={isFollowing}
                            setIsFollowing={setIsFollowing}
                            isOwner={isOwner}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {posts.map(post => (
                            <PostInProfile
                                author_name={author.first_name + " " + author.last_name}
                                author_avatar="https://picsum.photos/seed/picsum/200/300"
                                post={post}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </Container>
            <div className="footer">
            </div>
        </div>
    );
}
export default Profile;