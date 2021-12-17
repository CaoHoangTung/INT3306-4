import React from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { Button } from '@material-ui/core';
import { blockUser, unBlockUser } from "../../api/user_functions";
import { getCurrentUser } from "../../utils/auth";
import { NotificationManager } from 'react-notifications';

class BlockButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: getCurrentUser(),
            userId: props.userId
        };
    }

    handleBlock = () => {
        const { currentUserId, userId } = this.state;
        if (this.props.isOwner) {
            return;
        } else if (this.props.isBlocking === false) {
            if (window.confirm("Are you sure you want to block this user?")) {
                blockUser(currentUserId, userId)
                    .then(() => {
                        this.props.setIsBlocking(true);
                        NotificationManager.success('User Blocked', 'Success', 3000);
                    });
            }
        } else {
            unBlockUser(currentUserId, userId)
                .then(() => {
                    this.props.setIsBlocking(false);
                    NotificationManager.success('User Unblocked', 'Success', 3000);
                });
        }
    };

    render() {
        if (this.props.isOwner) {
            return null;
        } else {
            return (
                <Button
                    onClick={this.handleBlock}
                    variant="contained"
                    color={this.props.isBlocking ? "secondary" : "primary"}
                >
                    {this.props.isBlocking ? "BLOCKING" : "BLOCK"} <BlockIcon/>
                </Button>
            )
        }
    }
}

export default BlockButton;