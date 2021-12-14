import { Avatar } from "@mui/material";
import { Link } from "@material-ui/core";
import * as React from "react";
const Comment = props => {
    return (
        <div className="Comment">
            <hr />
            <div className="author">
                <div className="first">
                    <Avatar alt="username" src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png" />
                    <Link href="#">Firstname + lastname</Link>
                </div>
            </div>
            <div>
                {props.comment.content}
            </div>
        </div>
    );
}
export default Comment;