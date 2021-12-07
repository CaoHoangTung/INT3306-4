import { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from "@mui/material/Typography";
import { Link } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import { getUserPost } from "../../api/users_posts";
import { getCurrentUser } from '../../utils/auth';

export default function PostInProfile(props) {
    const post = props.post;
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        getUserPost(getCurrentUser(), post.post_id)
        .then(data => {
            if (data.is_saved === true) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <Grid item xs={12}>
            <Link href={"post/" + post.post_id} underline="none">
                <div className="title">
                    <Typography variant="h2" gutterBottom component="div">
                        {post.title}
                    </Typography>
                </div>
            </Link>
            <div className="author">
                <div className="first">
                    <Avatar alt="username" src={props.author_avatar} />
                    <Link>{props.author_name}</Link>
                </div>
                <div className="second">
                    <MoreHorizIcon></MoreHorizIcon>
                </div>
            </div>
            <Link href={"post/" + post.post_id} underline="none">
                <div className="content">
                    <img
                        src={post.preview_image_path}
                        alt="preview"
                    />
                    <Typography>
                        {post.content.slice(0, 200)}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Continue reading...
                    </Typography>
                </div>
            </Link>
            <div className="relatedTopic">
                <Button>topic1</Button>
                <Button>topic2</Button>
                <Button>topic3</Button>
            </div>
            <div className="react">
                <div className="vote">
                    <div className="upvote">
                        <ThumbUpIcon></ThumbUpIcon>
                        {post.upvote}
                    </div>
                    <div className="downvote">
                        <ThumbDownIcon></ThumbDownIcon>
                        {post.downvote}
                    </div>
                </div>
                <div>
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
            <hr></hr>
        </Grid>
    );
}