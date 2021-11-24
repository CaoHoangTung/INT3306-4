import './style.scss'
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import ProfileCard from '../../components/profile/ProfileCard';
import PostInProfile from '../../components/profile/PostInProfile';
import { useState, useEffect } from 'react';
import { getUser } from '../../api/users';
import { getCurrentUser } from '../../utils/auth';
import { getAllPostsOfUserId } from '../../api/posts';
// import { followUser, unFollowUser } from '../../api/user_functions';

function Profile(props) {
    const [author, setAuthor] = useState({});
    const [isFollowing, setIsFollowing] = useState(true);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getUser(getCurrentUser())
        .then(data => {
            setAuthor(data);
        })
        .catch(err => {
            console.log(err)
        });
    }, []);

    useEffect(() => {
        getAllPostsOfUserId(getCurrentUser())
        .then(data => {
            console.log(data);
            setPosts(data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="viewPost">
            <div className="header">
                <div className="leftHeader">
                    <Button variant="text">author</Button>
                    <Button variant="text">number of follower</Button>
                    <Button variant="text">Follow</Button>
                    <EmailIcon></EmailIcon>
                </div>
                <div className="rightHeader">
                    <MoreHorizIcon></MoreHorizIcon>
                    <SearchIcon></SearchIcon>
                    <img
                        src="https://picsum.photos/1024/1024"
                        alt="logo"
                    />
                </div>
            </div>
            <Container>
            <Grid container spacing={2}>
                <Grid item xs = {3}>
                    <ProfileCard
                        email={author.email}
                        first_name={author.first_name}
                        last_name={author.last_name}
                        avatar="https://picsum.photos/seed/picsum/200/300"
                        profile="I am a software engineer at UET"
                        numberOfPost="10"
                        numFollowers="100"
                        isFollowing={isFollowing}
                        setIsFollowing={setIsFollowing}
                    />
                </Grid>
                <Grid item xs = {6}>
                    {posts.map(post => (
                        <PostInProfile
                            title={post.title}
                            date={post.published_at}
                            description={post.content}
                            image={post.preview_image_path}
                            link={`/post/${post.post_id}`}
                            key={post.post_id}
                            upvote={post.upvote}
                            downvote={post.downvote}
                        />
                    ))}
                </Grid>
                <Grid item xs = {3}></Grid>
            </Grid>
            </Container>
            <div className="footer">
            </div>
        </div>
    );
}
export default Profile;