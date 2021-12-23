import { useEffect, useState } from 'react';
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import SaveButton from "../profile/SaveButton";
import DeleteButton from "../profile/DeleteButton";
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';
import Topic from "../../components/shared/Topic";
import { getUserPost } from "../../api/users_posts";
import { getCurrentUser } from '../../utils/auth';
import { getPostTopicByPostId } from "../../api/posts_topic";
import Clap from './Clap';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CommentBoxModal from './CommentBoxModal.js';
export default function PostDetail(props) {
    const post = props.post;
    const [isSaved, setIsSaved] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        getUserPost(getCurrentUser(), props.postId)
            .then(data => {
                if (data.is_saved === true) {
                    setIsSaved(true);
                } else {
                    setIsSaved(false);
                }

                if (data.is_upvote === true) {
                    setIsUpvoted(true);
                } else {
                    setIsUpvoted(false);
                }

                if (data.is_downvote === true) {
                    setIsDownvoted(true);
                } else {
                    setIsDownvoted(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const [postTopics, setPostTopics] = useState([]);
    useEffect(() => {
        getPostTopicByPostId(props.postId).then(postTopics => {
            console.log("TOPICS", postTopics);
            setPostTopics(postTopics);
        }).catch(err => console.error(err));
    }, [props.postId]);

    return (
        <Grid item xs={12}>
            <div className="title">
                <Typography variant="h3" gutterBottom component="div">
                    {post.title}
                </Typography>
            </div>
            <div className="author">
                <div className="first">
                    <Avatar
                        alt="username"
                        src={props.avatar_path}
                        sx={{ marginRight: 2, marginBottom: 1 }}
                    />
                    <Link href={"/profile/" + props.author_id}>
                        {props.author_name}
                    </Link>
                </div>
                <div className="second">
                    <EditIcon onClick={() => window.location.href = `/edit-post/${post.post_id}`}></EditIcon>
                    <SaveButton
                        post_id={post.post_id}
                        isSaved={isSaved}
                        setIsSaved={setIsSaved}
                    ></SaveButton>
                    <DeleteButton
                        post_id={post.post_id}
                        isOwner={props.isOwner}
                    ></DeleteButton>
                </div>
            </div>
            <div className="content">
                <img
                    src={post.preview_image_path}
                    alt="preview"
                />
                <Typography>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Typography>
            </div>
            <div className="relatedTopic">
                {postTopics.map(postTopic => (
                    <Topic
                        key={"Topic" + postTopic.topic_id}
                        topicId={postTopic.topic_id}
                        topicName={postTopic.topic_name}
                    />
                )
                )}
            </div>
            <br />
            <div className="react">
                <div className="vote">
                    <div>
                        <Clap
                            key={"Clap" + post.post_id}
                            post={post}
                        />
                    </div>
                </div>
                <div className="chat-icon">
                    <ChatBubbleOutlineRoundedIcon
                        onClick={() => {setShow(true);window.scrollTo(0, 0)}}
                    />
                    <CommentBoxModal show={show} onClose={() => setShow(false)}/>

                </div>
            </div>
            <hr></hr>
            {/* <CommentBox 
                key={"CommentBox" + post.post_id}
                postId={post.post_id}
                isOwner={props.isOwner}
            /> */}
        </Grid>
    );
}