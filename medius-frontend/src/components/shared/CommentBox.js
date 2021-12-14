import Comment from "./Comment"
import CloseIcon from '@mui/icons-material/Close';
import Input from "@mui/material/Input";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCommentByPostId } from "../../api/comments";
import { commentPost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";

const CommentBox = props => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    
    useEffect(() => {
        getCommentByPostId(props.postId).then(comments => {
            setComments(comments);
        }).catch(err => console.error(err));
    }, [props.postId, comments]);
    
    return(
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
                        setComment(e.target.value);
                    }}
                            placeholder="What are your thought?"
                    />
                    <Input type="submit" onClick={() => {
                        commentPost(props.postId, getCurrentUser(), comment).then(data => {
                            setComments(comments.concat(data));
                        }).catch(err => console.error(err));
                    }}/>
                </div>
                <div>
                    {comments.map(comment => (
                        <Comment 
                            key={"Comment" + comment.comment_id}
                            comment={comment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default CommentBox;