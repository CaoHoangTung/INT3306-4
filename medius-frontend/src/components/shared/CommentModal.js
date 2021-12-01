import Comment from "../shared/Comment"
import CloseIcon from '@mui/icons-material/Close';
const CommentModal = props => {
    if (!props.show) {
        return null;
    }
    return(
        <div className="CommentModal">
            <div>
                <div className="modal-content">
                    <div className="header">
                        <div>
                            sdfdsf
                        </div>
                        <div>
                            <CloseIcon onClick={props.onClose}/>
                        </div>
                    </div>
                    <div>
                        <input type="text"
                               placeholder="What are your thought?"
                        />
                        <input type="submit"/>
                    </div>
                    <div>
                        <Comment></Comment>
                        <Comment></Comment>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommentModal;