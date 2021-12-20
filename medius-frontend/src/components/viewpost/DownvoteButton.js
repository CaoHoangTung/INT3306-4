import React from 'react';
import { Badge } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { downvotePost, undownvotePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { NotificationManager } from 'react-notifications';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
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
            undownvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsDownvoted(false);
                this.setState({
                    numDownvotes: this.state.numDownvotes - 1,
                });
               
            });
        } else {
            downvotePost(post.post_id, userId)
            .then(() => {
                this.props.setIsDownvoted(true);
                this.setState({
                    numDownvotes: this.state.numDownvotes + 1,
                });
                
            });
        }
    };

    render() {
        return(
            <Badge
                color="primary"
                badgeContent={ this.state.numDownvotes }
                showZero
            >
                <ArrowCircleDownTwoToneIcon
                color={this.props.isDownvoted ? "warning" : "inherit"}
                onClick={this.handleDownvote}
                />
            </Badge>
        )
    }
}

export default DownvoteButton;