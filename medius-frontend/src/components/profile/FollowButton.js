import React from 'react';
import { Button } from '@material-ui/core';
import { followUser, unFollowUser } from '../../api/user_functions';
import { getCurrentUser } from "../../utils/auth";
import { NotificationManager } from 'react-notifications';

class FollowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: getCurrentUser(),
            userId: props.userId
        };
    }

    handleFollow = () => {
        const { currentUserId, userId } = this.state;
        if (this.props.isOwner) {
            return;
        }
        if (this.props.isFollowing) {
            unFollowUser(currentUserId, userId)
            .then(() => {
                this.props.setIsFollowing(false);
                NotificationManager.success('User Unfollowed', 'Success', 3000);
            });
        } else {
            followUser(currentUserId, userId)
            .then(() => {
                this.props.setIsFollowing(true);
                NotificationManager.success('User Followed', 'Success', 3000);
            });
        }
    };

    render() {
        if (this.props.isOwner) {
            return null;
        } else {
            return (
                <Button
                    variant="contained"
                    color={this.props.isFollowing ? "inherit" : "primary"}
                    onClick={this.handleFollow}
                >
                    {this.props.isFollowing ? "Following" : "Follow"}
                </Button>
            );
        }
    }
}

export default FollowButton;