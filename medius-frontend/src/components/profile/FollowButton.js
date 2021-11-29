import { Button } from '@material-ui/core';

export default function FollowButton(props) {
    if (props.isFollowing) {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={props.onClick}
            >
                Following
            </Button>
        );
    } else {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={props.onClick}
            >
                Follow
            </Button>
        );
    }
}