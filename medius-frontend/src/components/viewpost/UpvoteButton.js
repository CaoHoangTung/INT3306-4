import React from 'react';
import { Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
            userId: getCurrentUser(),
            numUpvotes: this.props.post.upvote
        };
    }

    handleUpvote = () => {
        const { post, userId } = this.state;
        if (this.props.isUpvoted) {
            upvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsUpvoted(false);
                this.setState({
                    numUpvotes: this.state.numUpvotes - 1
                });
            });
        } else {
            unupvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsUpvoted(true);
                this.setState({
                    numUpvotes: this.state.numUpvotes + 1
                });
            });
        }
    };

    render() {
        const { classes } = this.props;
        return(
            <Badge
                color="primary"
                badgeContent={ this.state.numUpvotes }
                showZero
            >
                <FavoriteIcon
                    className={this.props.isUpvoted ? classes.upvotedIcon : ""}
                    onClick={this.handleUpvote}
                />
            </Badge>
        )
    }
}

export default withStyles(styles)(UpvoteButton);