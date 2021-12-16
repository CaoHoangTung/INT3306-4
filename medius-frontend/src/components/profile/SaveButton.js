import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { savePost, unsavePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";

class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.post_id,
            userId: getCurrentUser()
        };
    }

    handleSave = () => {
        const { postId, userId } = this.state;
        if (this.props.isSaved) {
            unsavePost(postId, userId)
            .then(() => {
                this.props.setIsSaved(false);
            });
        } else {
            savePost(postId, userId)
            .then(() => {
                this.props.setIsSaved(true);
            });
        }
    };

    render() {
        return(
            <BookmarkIcon
            color={this.props.isSaved ? "primary" : "inherit"}
            onClick={this.handleSave}
            >
            </BookmarkIcon>
        )
    }
}

export default SaveButton;