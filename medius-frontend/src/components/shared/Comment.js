import { Avatar, Typography } from "@mui/material";
import { Link } from "@material-ui/core";
import moment from "moment";
import * as React from "react";
const Comment = props => {
    const comment = props.comment;
    return (
        <div className="Comment">
            <div className="author">
                <div className="first">
                    <Avatar alt="username" src={comment.user} />
                    <Link style={{
                        marginLeft: "10px",
                        href: `/profile/${comment.user_id}`,
                    }}>
                        <Typography>
                            {comment.user_detail?.first_name + " " + comment.user_detail?.last_name}
                        </Typography>
                    </Link>
                </div>
                <div className="time">
                    {moment(new Date(comment.created_at), "YYYY-MM-DD").fromNow()}
                </div>
            </div>
            <div style={{
                marginLeft: "50px",
            }}>
                <Typography>
                    {comment.content}
                </Typography>
            </div>
        </div>
    );
}
export default Comment;