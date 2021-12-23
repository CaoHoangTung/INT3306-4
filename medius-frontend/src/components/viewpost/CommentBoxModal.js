import NewCommentBox from './NewCommentBox.js';
import CloseIcon from '@mui/icons-material/Close';
const CommentBoxModal = props => {
    if (!props.show) {
        return null;
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
                    <NewCommentBox />
                    <div>
                        Comment listed here
                    </div>
                </div>




            </div>
        </div>
    )
}
export default CommentBoxModal;