import {Avatar} from "@mui/material";
import {Link} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
const Comment = props => {
    return(
        <div className="Comment">
            <hr/>
            <div className="author">
                <div className="first">
                    <Avatar alt="username" src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png" />
                    <Link href="#">Firstname + lastname</Link>
                </div>
            </div>
            <div>
                Content
            </div>
            <div>
                <ThumbUpIcon></ThumbUpIcon>
                <ThumbDownIcon></ThumbDownIcon>
            </div>
        </div>
    );
}
export default Comment;