import './style.scss'
import Button from "@mui/material/Button";
import { Avatar, IconButton, MenuItem } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from "@mui/material/Typography";
import { Link, Menu } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Grid from "@mui/material/Grid";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useEffect, useState } from "react";
import { getUser } from "../../api/users";
import { getPost } from "../../api/posts";
import { getPostTopicByPostId } from "../../api/posts_topic";
import Topic from "../../components/shared/Topic";
import Search from "../../components/main/Search";
import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from 'react-router';

function ViewPost(props) {
    const [author, setAuthors] = useState([]);

    const { postId } = useParams();

    useEffect(() => {
        getUser(3).then(author => {
            console.log(author);
            setAuthors(author);
        }
        ).catch(err => console.error(err));
    }, []
    );

    const [post, setPost] = useState([]);
    useEffect(() => {
        getPost(postId).then(post => {
            console.log(post);
            setPost(post);
        }).catch(err => console.error(err));
    }, []);


    const [postTopics, setPostTopics] = useState([]);
    useEffect(() => {
        getPostTopicByPostId(postId).then(postTopics => {
            console.log(postTopics);
            setPostTopics(postTopics);
        }).catch(err => console.error(err));
    }, []);

    function increaseUpvote() {
        console.log("dsfdsfdsdf");
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="viewPost">
            <div className="header">
                <div className="leftHeader">
                    <Button variant="text">{author.first_name} {author.last_name}</Button>
                    <Button variant="text">number of follower</Button>
                    <Button variant="text">Follow</Button>
                    <EmailIcon></EmailIcon>
                </div>
                <div className="rightHeader">
                    <Search />
                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="More">
                                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                    <MoreHorizIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                Report this user
                            </MenuItem>
                            <MenuItem>
                                Report this post
                            </MenuItem>
                        </Menu>
                    </div>

                    <img
                        src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                        alt="logo"
                    />
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <div className="title">
                        <Typography variant="h2" gutterBottom component="div">
                            {post.title}
                        </Typography>
                    </div>
                    <div className="author">
                        <div className="first">
                            <Avatar alt="username" src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png" />
                            <Link href="#">{author.first_name} {author.last_name}</Link>
                        </div>
                        <div className="second">
                            <BookmarkBorderIcon />
                            <MoreHorizIcon></MoreHorizIcon>
                        </div>
                    </div>
                    <div className="content">
                        <img
                            src="../../logo.svg"
                            alt="Medius"
                        />
                        <Typography>
                            {post.content}
                        </Typography>
                    </div>
                    <div className="relatedTopic">
                        {postTopics.map(postTopic => (
                            <Topic
                                key={postTopic.topic_id}
                                topic={postTopic.topic_id}
                                link={`/topic/${postTopic.topic_id}`}
                            />
                        )
                        )}
                    </div>
                    <div className="react">
                        <div className="vote">
                            <div onClick={increaseUpvote} className="upvote">
                                <ThumbUpIcon></ThumbUpIcon>
                                #upvote
                            </div>
                            <div className="downvote">
                                <ThumbDownIcon></ThumbDownIcon>
                                #downvote
                            </div>
                        </div>
                        <div>
                            <BookmarkBorderIcon></BookmarkBorderIcon>
                            <MoreHorizIcon></MoreHorizIcon>
                        </div>
                    </div>
                    {/*<Grid container spacing = {2}>*/}
                    {/*    <Grid item xs = {1}>*/}
                    {/*        <ThumbUpIcon></ThumbUpIcon>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs = {1}>*/}
                    {/*        <ThumbDownIcon></ThumbDownIcon>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs = {10}></Grid>*/}
                    {/*</Grid>*/}
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
            <div className="footer">
            </div>
        </div>
    );
}
export default ViewPost;