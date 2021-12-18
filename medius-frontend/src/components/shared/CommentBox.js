import Comment from "./Comment";
import Input from "@mui/material/Input";
import { Typography } from "@mui/material";
import React from "react";
import { getCommentByPostId, getComment } from "../../api/comments";
import { commentPost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { NotificationManager } from 'react-notifications';


class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            comments: [],
            commentText: "",
        }
    }

    componentDidMount() {
        getCommentByPostId(
            this.state.postId
        ).then(data => {
            this.setState({
                comments: data,
            });
        }).catch(err => console.error(err));
    }

    handleDelete(commentId) {
        const newComments = this.state.comments.filter((item) => item.comment_id != commentId);
        this.setState({
            comments: newComments,
        });
    }

    handleSubmit() {
        commentPost(this.state.postId, getCurrentUser(), this.state.commentText).then(data => {
            getComment(data.comment_id).then(data => {
                this.setState({
                    comments: this.state.comments.concat(data)
                });
                NotificationManager.success('Comment posted successfully!', 'Success', 3000);
            });
        }).catch(err => console.error(err));
    }

    render() {
        return (
            <div className="CommentModal">
                <div className="modal-content">
                    <div className="header">
                        <div>
                            <Typography variant="h5" gutterBottom component="div">
                                Comments
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Input type="text" label="Outlined" id="comment-text" onChange={(e) => {
                            this.setState({
                                commentText: e.target.value
                            });
                        }}
                                placeholder="What are your thought?"
                        />
                        <Input type="submit" onClick={(e) => this.handleSubmit(e)}/>
                    </div>
                    <div>
                        {this.state.comments.map(comment => (
                            <Comment 
                                key={"Comment" + comment.comment_id}
                                comment={comment}
                                isOwner={this.props.isOwner}
                                handleDelete={(commendId) => this.handleDelete(commendId)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentBox;