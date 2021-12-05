import React from 'react';
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { savePost, unsavePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { withStyles } from '@mui/styles';

const styles = theme => ({
    savedIcon : {
        color: "#ff6d00"
    }
});

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
        const { classes } = this.props;
        return(
            <BookmarkBorderIcon
            className={this.props.isSaved ? classes.savedIcon : ""}
            onClick={this.handleSave}
            >
            </BookmarkBorderIcon>
        )
    }
}

export default withStyles(styles)(SaveButton);