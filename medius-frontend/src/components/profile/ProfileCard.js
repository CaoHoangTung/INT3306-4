import React from 'react';
import '../../pages/profile/style.scss'
import { Card, CardContent, CardMedia, Avatar, Typography, Grid } from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PeopleIcon from '@mui/icons-material/People';
import FollowButton from './FollowButton';
import BlockButton from './BlockButton';

class ProfileCard extends React.Component {
    render() {
        const { author } = this.props;
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
                    <CardContent>
                        <Typography
                            color="textSecondary"
                            variant="h6"
                            align="center"
                        >
                            {author?.first_name} {author?.last_name}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="subtitle1"
                            align="center"
                        >
                            <LocalPostOfficeIcon fontSize="small" />
                            {author.email}
                        </Typography>{" "}
                        <Typography
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
                            {author.role_id !== 1 && (
                                <BlockButton
                                    isBlocking={this.props.isBlocking}
                                    setIsBlocking={this.props.setIsBlocking}
                                    isOwner={this.props.isOwner}
                                    userId={author.user_id}
                                />
                            )}
                        </Typography>{" "}
                        <Typography
                            color="textSecondary"
                            variant="subtitle1"
                            align="center"
                        >
                            <PeopleIcon fontSize="small"
                                sx={{ marginTop: 1 }}
                            />
                            {author.num_followers} Followers
                        </Typography>{" "}
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default ProfileCard;