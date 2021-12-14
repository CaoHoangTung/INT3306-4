import Comment from "../shared/Comment"
import CloseIcon from '@mui/icons-material/Close';
import Input from "@mui/material/Input";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCommentByPostId } from "../../api/comments";

const CommentModal = props => {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        getCommentByPostId(props.postId).then(comments => {
            setComments(comments);
        }).catch(err => console.error(err));
    }, [props.postId]);
    
    if (!props.isShow) {
        return null;
    }
    return(
        <div className="CommentModal">
            <div>
                <div className="modal-content">
                    <div className="header">
                        <div>
                            <Typography variant="h5" gutterBottom component="div">
                                Comments
                            </Typography>
                        </div>
                        <div>
                            <CloseIcon onClick={() => props.setIsShow(false)}/>
                        </div>
                    </div>
                    <div style={{
                        alignContent: "center",
                    }}>
                        <Input type="text"
                               placeholder="What are your thought?"
                        />
                        <Input type="submit"/>
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
        </div>
    );
}
export default CommentModal;