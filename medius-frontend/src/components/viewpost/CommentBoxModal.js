import NewCommentBox from './NewCommentBox.js';
import Comment from '../shared/Comment.js';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { getCommentByPostId } from '../../api/comments.js';

const CommentBoxModal = props => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getCommentByPostId(
            props.postId
            ).then(data => {
                setComments(data);
            }).catch(err => console.error(err));
        }, []);
        
    if (!props.show) {
        return null;
    }

    const handleDelete = (commentId) => {
        const newComments = comments.filter((item) => item.comment_id != commentId);
        setComments(newComments);
    }

    return (
        <div className="comment-modal" onClick={props.onClose}>
            <div className="comment-modal-content" onClick={e => e.stopPropagation()}>
                <div className="comment-modal-header">
                    <h2>
                        Responses
                    </h2>
                    <CloseIcon onClick={props.onClose}/>
                </div>

                <div className="comment-modal-content">
                    <NewCommentBox 
                        postId={props.postId}
                        comments={comments}
                        setComments={setComments}
                    />
                    <div>
                        {comments.map(comment => (
                            <Comment 
                                key={"Comment" + comment.comment_id}
                                comment={comment}
                                isOwner={props.isOwner}
                                handleDelete={(commendId) => handleDelete(commendId)}
                            />
                        ))}
                    </div>
                </div>




            </div>
        </div>
    )
}
export default CommentBoxModal;