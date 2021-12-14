import React from 'react';
import { Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { upvotePost, unupvotePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { withStyles } from '@mui/styles';

class UpvoteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            userId: getCurrentUser(),
            numUpvotes: this.props.post.upvote,
            color: this.props.isUpvoted ? "primary" : "inherit"
        };
    }

    handleUpvote = () => {
        const { post, userId } = this.state;
        if (this.props.isUpvoted) {
            unupvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsUpvoted(false);
                this.setState({
                    numUpvotes: this.state.numUpvotes - 1,
                    color: "inherit"
                });
            });
        } else {
            upvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsUpvoted(true);
                this.setState({
                    numUpvotes: this.state.numUpvotes + 1,
                    color: "primary"
                });
            });
        }
    };

    render() {
        return(
            <Badge
                color="primary"
                badgeContent={ this.state.numUpvotes }
                showZero
            >
                <FavoriteIcon
                    color={this.state.color}
                    onClick={this.handleUpvote}
                />
            </Badge>
        )
    }
}

export default UpvoteButton;