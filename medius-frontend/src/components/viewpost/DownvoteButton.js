import React from 'react';
import { Badge } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { downvotePost, undownvotePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { withStyles } from '@mui/styles';

const styles = theme => ({
    downvotedIcon : {
        color: "#ff6d00"
    }
});

class DownvoteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            userId: getCurrentUser()
        };
    }

    handleDownvote = () => {
        const { post, userId } = this.state;
        if (this.props.isDownvoted) {
            downvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsDownvoted(false);
            });
        } else {
            undownvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsDownvoted(true);
            });
        }
    };

    render() {
        const { post } = this.state;
        const { classes } = this.props;
        return(
            <Badge
                color="primary"
                badgeContent={ post.downvote }
                showZero
            >
                <ThumbDownIcon
                className={this.props.isDownvoted ? classes.downvotedIcon : ""}
                onClick={this.handleDownvote}
                />
            </Badge>
        )
    }
}

export default withStyles(styles)(DownvoteButton);