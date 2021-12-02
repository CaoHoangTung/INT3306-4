import React from 'react';
import { Button } from '@material-ui/core';
import { followUser, unFollowUser } from '../../api/user_functions';
import { getCurrentUser } from "../../utils/auth";
import { withStyles } from '@mui/styles';

const styles = theme => ({
    followingButton : {
        color: "inherit",
    }
});

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
            });
        } else {
            followUser(currentUserId, userId)
            .then(() => {
                this.props.setIsFollowing(true);
            });
        }
    };

    render() {
        const { classes } = this.props;
        if (this.state.isOwner) {
            return null;
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleFollow}
                    className={this.props.isFollowing ? classes.followingButton : null}
                >
                    {this.props.isFollowing ? "Following" : "Follow"}
                </Button>
            );
        }
    }
}

export default withStyles(styles)(FollowButton);