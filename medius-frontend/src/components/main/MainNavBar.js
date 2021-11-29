import { Container } from "@material-ui/core";
import Search from "./Search.js";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import '../../pages/main/Main.scss'
import ProfileMenu from "./AccountMenu.js";
import NotificationsBox from "./NotificationsBox.js";
import React from 'react';
function MainNavBar() {
    return (
        <div className="MainNavBar">
            <Container>
                <div className="Main_NavBar_Container">
                    <img
                        src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                        alt="logo"
                    />
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
