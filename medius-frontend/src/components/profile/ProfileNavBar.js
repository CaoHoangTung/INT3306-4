import { Container } from "@material-ui/core";
import Search from "../main/Search.js";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import '../../pages/main/Main.scss'
import ProfileMenu from "../main/AccountMenu.js";
import NotificationsBox from "../main/NotificationsBox.js";
import React from 'react';
import { Typography } from "@mui/material";
function MainNavBar(props) {
    const author = props.author;
    return (
        <div className="MainNavBar">
            <Container>
                <div className="Main_NavBar_Container">
                    <Typography variant="h5" component={'span'}>
                        {author.first_name} {author.last_name}
                    </Typography>
                    <div className="Main_NavBar_List">
                        <ul>
                            <li><Search /></li>
                            <li><BookmarksIcon /></li>
                            <li><NotificationsBox/></li>
                            <li><ProfileMenu/></li>
                        </ul>
                    </div>
                </div>

            </Container>
        </div>
    );
}

export default MainNavBar;
