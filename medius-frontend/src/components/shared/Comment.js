import { Avatar, Container, Typography } from "@mui/material";
import { Link } from "@material-ui/core";
import moment from "moment";
import * as React from "react";
import DeleteCommentButton from "./DeleteCommentButton";
import { getCurrentUser } from "../../utils/auth";
import { deleteComment } from "../../api/comments";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
            userId: this.props.userId,
            deletePermission: (this.props.comment.user_id == getCurrentUser()) || this.props.isOwner
        }
    }

    handleDelete = () => {
        const commentId = this.state.comment.comment_id;
        if (this.state.deletePermission) {
            if (window.confirm("Are you sure you want to delete this comment?")) {
                deleteComment(commentId)
                    .then(() => {
                        this.props.handleDelete(commentId);
                    })
            }
        } else {
            return;
        }
    }

    render() {
        const comment = this.state.comment;
        return (
            <Container>
                <div className="Comment">
                    <div className="author">
                        <div className="first">
                            <Avatar alt="username" src={comment.user_detail?.avatar_path} />
                            <Link style={{
                                marginLeft: "10px",
                                href: `/profile/${comment.user_id}`,
                            }}>
                                <Typography>
                                    {comment.user_detail?.first_name + " " + comment.user_detail?.last_name}
                                </Typography>
                                <div className="time">
                                    {moment(new Date(comment.created_at)).add(7, 'h').fromNow()}
                                </div>
                            </Link>
                        </div>
                        {/* <Typography>
                            {comment.content}
                        </Typography> */}
                        <div className="delete-button">
                            <DeleteCommentButton
                                key={"DeleteCommentButton" + comment.comment_id}
                                commentId={comment.comment_id}
                                deletePermission={this.state.deletePermission}
                                handleDelete={this.handleDelete}
                            />
                        </div>
                    </div>
                    <div>
                        {/* <div className="time">
                            {moment(new Date(comment.created_at)).add(7, 'h').fromNow()}
                        </div> */}
                        <Typography>
                            {comment.content}
                        </Typography>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Comment;