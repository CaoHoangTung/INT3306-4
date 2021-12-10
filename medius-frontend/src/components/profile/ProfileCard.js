import React from 'react';
import '../../pages/profile/style.scss'
import { Card, CardContent, CardMedia, Avatar, Typography, Grid } from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PeopleIcon from '@mui/icons-material/People';
import FollowButton from './FollowButton';
import { withStyles } from '@mui/styles';

// A custom theme for this app
// const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#556cd6",
//         },
//         secondary: {
//             main: "#19857b",
//         },
//         error: {
//             main: red.A400,
//         },
//         background: {
//             default: "#fff",
//             card: "#fff",
//         },
//     },
// });

const styles = theme => ({
    // text: {
    //     margin: theme.spacing(0, 0, 0.5),
    //     color: theme.palette.secondary.contrastText,
    // },
    // avatar: {
    //     verticalAlign: "middle",
    // },
    // large: {
    //     width: theme.spacing(12),
    //     height: theme.spacing(12),
    //     margin: theme.spacing(2, 2, 0),
    // },
    // pcard: {
    //     borderRadius: 15,
    //     maxWidth: "270px",
    //     minWidth: "270px",
    //     height: "330px",
    //     backgroundColor: theme.palette.background.card,
    // },
    // cardContent: {
    //     padding: theme.spacing(2, 0, 0, 0),
    // },
});

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { author, classes } = this.props;
        return (
    
            <Grid item xs={12}>
                <Card
                    variant="outlined"
                    style={{ 
                        display: "inline-block",
                        borderRadius: 15,
                        maxWidth: "270px",
                        minWidth: "270px",
                        height: "330px"
                    }}
                >
                    <CardMedia align="center">
                        <Avatar
                            alt={author?.first_name}
                            src={author?.avatar_path}
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                        />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography
                            className={classes.text}
                            color="textSecondary"
                            variant="h6"
                            align="center"
                        >
                            {author?.first_name} {author?.last_name}
                        </Typography>
                        <Typography
                            className={classes.text}
                            color="textSecondary"
                            variant="subtitle1"
                            align="center"
                        >
                            <LocalPostOfficeIcon className={classes.avatar} fontSize="small" />
                            {author.email}
                        </Typography>{" "}
                        <Typography
                            className={classes.text}
                            color="textSecondary"
                            variant="subtitle1"
                            align="center"
                        >
                            <FollowButton
                                isFollowing={this.props.isFollowing}
                                setIsFollowing={this.props.setIsFollowing}
                                isOwner={this.props.isOwner}
                                userId={author.user_id}
                            />
                        </Typography>{" "}
                        <Typography
                            className={classes.text}
                            color="textSecondary"
                            variant="subtitle1"
                            align="center"
                        >
                            <PeopleIcon className={classes.avatar} fontSize="small" />
                            {author.num_followers} Followers
                        </Typography>{" "}
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(ProfileCard);