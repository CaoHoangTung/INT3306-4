import { Card, CardContent, CardMedia, Avatar, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';
import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import FollowButton from './FollowButton';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      card: "#fff",
    },
  },
});

const useStyles = makeStyles(() => ({
    text: {
        margin: theme.spacing(0, 0, 0.5),
        //color: theme.palette.secondary.contrastText,
    },
    avatar: {
        verticalAlign: "middle",
        marginRight: theme.spacing(0.5),
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: theme.spacing(2, 2, 0),
    },
    card: {
        borderRadius: 15,
        maxWidth: "270px",
        minWidth: "270px",
        height: "330px",
        backgroundColor: theme.palette.background.card,
    },
    cardContent: {
        padding: theme.spacing(2, 0, 0, 0),
    },
}));


function ProfileCard(props) {
    const classes = useStyles();
    return (

        <Grid item xs = {12}>
            <Card
                variant="outlined"
                className={classes.card}
                style={{ display: "inline-block" }}
            >
                <CardMedia align="center">
                    <Avatar
                    alt={props?.first_name}
                    src={props?.avatar}
                    className={classes.large}
                    />
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography
                        className={classes.text}
                        color="textSecondary"
                        variant="h6"
                        align="center"
                    >
                        {props?.first_name} {props?.last_name}
                    </Typography>
                    <Typography
                        className={classes.text}
                        color="textSecondary"
                        variant="subtitle1"
                        align="center"
                    >
                        <LocalPostOfficeIcon className={classes.avatar} fontSize="small" />
                        {props?.email}
                    </Typography>{" "}
                    <Typography
                        className={classes.text}
                        color="textSecondary"
                        variant="subtitle1"
                        align="center"
                    >
                        <FollowButton 
                            isFollowing={props.isFollowing} 
                            setIsFollowing={props.setIsFollowing}
                        />
                    </Typography>{" "}
                    <Typography
                        className={classes.text}
                        color="textSecondary"
                        variant="subtitle1"
                        align="center"
                    >
                        <PeopleIcon className={classes.avatar} fontSize="small" />
                        {props?.numFollowers} Followers
                    </Typography>{" "}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ProfileCard;