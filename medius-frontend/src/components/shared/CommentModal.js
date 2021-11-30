import Comment from "../shared/Comment"
const CommentModal = props => {
    if (!props.show) {
        return null;
    }
    return(
        <div className="CommentModal" onClick={props.onClose}>
            <div>
                <div className="modal-content">
                    <div>
                        Respont +  close
                    </div>
                    <div>
                        <input type="text"
                               placeholder="What are your thought?"
                        />

                    </div>
                    <div>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommentModal;