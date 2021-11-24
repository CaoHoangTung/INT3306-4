import Button from "@mui/material/Button";
import {Avatar} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from "@mui/material/Typography";
import {Link} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Grid from "@mui/material/Grid";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function PostInProfile(props) {
    return (
        <Grid item xs = {12}>
            <div className="title">
                <Typography variant="h2" gutterBottom component="div">
                    {props.title}
                </Typography>
            </div>
            <div className="author">
                <div className="first">
                    <Avatar alt="username" src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"/>
                    <Link>userName</Link>
                </div>
                <div className="second">
                    <BookmarkBorderIcon/>
                    <MoreHorizIcon></MoreHorizIcon>
                </div>
            </div>
            <div className="content">
                <img
                    src="../../logo.svg"
                />
                <Typography>
                    {props.content}
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
                        {props.upvote}
                    </div>
                    <div className="downvote">
                        <ThumbDownIcon></ThumbDownIcon>
                        {props.downvote}
                    </div>
                </div>
                <div>
                    <BookmarkBorderIcon></BookmarkBorderIcon>
                    <MoreHorizIcon></MoreHorizIcon>
                </div>
            </div>
            <hr></hr>
        </Grid>
    );
}