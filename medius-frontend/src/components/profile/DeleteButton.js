import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost } from "../../api/posts";
import { getCurrentUser } from "../../utils/auth";
import { withStyles } from '@mui/styles';

const styles = theme => ({
    savedIcon: {
        color: "#ff6d00"
    }
});

class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.post_id,
            userId: getCurrentUser()
        };
    }

    handleDelete = () => {
        const { postId, userId } = this.state;
        if (this.props.isOwner) {
            if (window.confirm("Are you sure you want to delete this post?")) {
                deletePost(postId)
                    .then(() => {
                        window.location.href = "/my-profile";
                    })
            }
        } else {
            return;
        }
    };

    render() {
        if (this.props.isOwner) {
            return (
                <DeleteIcon
                    onClick={this.handleDelete}
                >
                </DeleteIcon>
            )
        } else {
            return null;
        }
    }
}

export default withStyles(styles)(DeleteButton);