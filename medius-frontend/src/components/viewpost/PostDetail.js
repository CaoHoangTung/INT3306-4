import { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import SaveButton from "../profile/SaveButton";
import DeleteButton from "../profile/DeleteButton";
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';
import { getUserPost } from "../../api/users_posts";
import { getCurrentUser } from '../../utils/auth';

export default function PostInProfile(props) {
    const post = props.post;
    const [isSaved, setIsSaved] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    useEffect(() => {
        getUserPost(getCurrentUser(), post.post_id)
        .then(data => {
            if (data.is_saved === true) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }

            if (data.is_upvoted === true) {
                setIsUpvoted(true);
            } else {
                setIsUpvoted(false);
            }

            if (data.is_downvoted === true) {
                setIsDownvoted(true);
            } else {
                setIsDownvoted(false);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <Grid item xs={12}>
            <div className="title">
                <Typography variant="h2" gutterBottom component="div">
                    {post.title}
                </Typography>
            </div>
            <div className="author">
                <div className="first">
                    <Avatar alt="username" src={props.author_avatar} />
                    <Link>{props.author_name}</Link>
                </div>
                <div className="second">
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
                    {post.content}
                </Typography>
            </div>
            <div className="relatedTopic">
                <Button>topic1</Button>
                <Button>topic2</Button>
                <Button>topic3</Button>
            </div>
            <div className="react">
                <div className="vote">
                    <UpvoteButton
                        key={"Upvote" + post.post_id}
                        post={post}
                        isUpvoted={isUpvoted}
                        setIsUpvoted={setIsUpvoted}
                    ></UpvoteButton>
                    <DownvoteButton
                        key={"Downvote" + post.post_id}
                        post={post}
                        isDownvoted={isDownvoted}
                        setIsDownvoted={setIsDownvoted}
                    >
                        {post.downvote}
                    </DownvoteButton>
                </div>
            </div>
        </Grid>
    );
}