import { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
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
import CommentBox from '../shared/CommentBox';
import { getUserPost } from "../../api/users_posts";
import { getCurrentUser } from '../../utils/auth';
import { getPostTopicByPostId } from "../../api/posts_topic";

export default function PostDetail(props) {
    const post = props.post;
    const [isSaved, setIsSaved] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

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
                        src={props.author_avatar}
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
                    <div style={{
                        marginRight: "30px",
                    }}>
                        <UpvoteButton
                            key={"Upvote" + post.post_id}
                            post={post}
                            isUpvoted={isUpvoted}
                            setIsUpvoted={setIsUpvoted}
                            className="upvote"
                            fontSize="large"
                        ></UpvoteButton>
                    </div>
                    <div style={{
                        marginRight: "30px",
                    }}>
                        <DownvoteButton
                            key={"Downvote" + post.post_id}
                            post={post}
                            isDownvoted={isDownvoted}
                            setIsDownvoted={setIsDownvoted}
                            className="downvote"
                            fontSize="large"
                        ></DownvoteButton>
                    </div>
                </div>
            </div>
            <hr></hr>
            <CommentBox 
                key={"CommentBox" + post.post_id}
                postId={post.post_id}
                isOwner={props.isOwner}
            />
        </Grid>
    );
}