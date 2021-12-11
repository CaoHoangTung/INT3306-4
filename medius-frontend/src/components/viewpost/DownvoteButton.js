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
            userId: getCurrentUser(),
            numDownvotes: this.props.post.downvote
        };
    }

    handleDownvote = () => {
        const { post, userId } = this.state;
        if (this.props.isDownvoted) {
            downvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsDownvoted(false);
                this.setState({
                    numDownvotes: this.state.numDownvotes - 1
                });
            });
        } else {
            undownvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsDownvoted(true);
                this.setState({
                    numDownvotes: this.state.numDownvotes + 1
                });
            });
        }
    };

    render() {
        const { classes } = this.props;
        return(
            <Badge
                color="primary"
                badgeContent={ this.state.numDownvotes }
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