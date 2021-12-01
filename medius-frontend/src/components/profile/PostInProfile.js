import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from "@mui/material/Typography";
import { Link } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SaveButton from "./SaveButton";

export default function PostInProfile(props) {
    const post = props.post;
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
                    <MoreHorizIcon></MoreHorizIcon>
                </div>
            </div>
            <div className="content">
                <img
                    src="../../logo.svg"
                    alt="Logo"
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
                        isSaved={post.isSaved}
                    ></SaveButton>
                </div>
            </div>
            <hr></hr>
        </Grid>
    );
}