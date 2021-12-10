import React from 'react';
import { Badge } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { upvotePost, unupvotePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { withStyles } from '@mui/styles';

const styles = theme => ({
    upvotedIcon : {
        color: "#ff6d00"
    }
});

class UpvoteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            userId: getCurrentUser()
        };
    }

    handleUpvote = () => {
        const { post, userId } = this.state;
        if (this.props.isUpvoted) {
            upvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsUpvoted(false);
            });
        } else {
            unupvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsUpvoted(true);
            });
        }
    };

    render() {
        const { post } = this.state;
        const { classes } = this.props;
        return(
            <Badge
                color="primary"
                badgeContent={ post.upvote }
                showZero
            >
                <ThumbUpIcon
                    className={this.props.isUpvoted ? classes.upvotedIcon : ""}
                    onClick={this.handleUpvote}
                />
            </Badge>
        )
    }
}

export default withStyles(styles)(UpvoteButton);