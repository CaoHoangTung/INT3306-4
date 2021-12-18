import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import { getCurrentUser } from "../../utils/auth";

class DeleteCommentButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentId: this.props.commentId,
            userId: getCurrentUser()
        };
    }

    render() {
        if (this.props.deletePermission) {
            return (
                <DeleteIcon
                    onClick={this.props.handleDelete}
                >
                </DeleteIcon>
            )
        } else {
            return null;
        }
    }
}

export default DeleteCommentButton;