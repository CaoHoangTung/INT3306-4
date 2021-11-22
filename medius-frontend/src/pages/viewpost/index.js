import './style.scss'
import Button from "@mui/material/Button";
import {Avatar, IconButton} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import {Link} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Grid from "@mui/material/Grid";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
function ViewPost(props) {
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
                        src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                        alt="logo"
                    />
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs = {3}></Grid>
                <Grid item xs = {6}>
                    <div className="title">
                        <Typography variant="h2" gutterBottom component="div">
                            title-
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
                            content
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
                <Grid item xs = {3}></Grid>
            </Grid>
            <div className="footer">
            </div>
        </div>
    );
}
export default ViewPost;