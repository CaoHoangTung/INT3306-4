import NewCommentBox from './NewCommentBox.js';
const CommentBoxModal = props =>{
    if(!props.show){
        return null;
    }
    return(
        <div className ="comment-modal" onClick={props.onClose}>
            <div className = "comment-modal-content" onClick={e=> e.stopPropagation()}>
                <div className="comment-modal-header">
                    <h4>
                       Comments
                    </h4>
                </div>

                <div className="comment-modal-body">
                    <NewCommentBox/>
                </div>

                <div className="comment-modal-footer">
                    <button className="button" onClick={props.onClose}>
                        Close
                    </button>
                </div>

            </div>
        </div>
    )
}
export default CommentBoxModal;