import {Container, Link} from "@material-ui/core";
import Search from "./Search.js";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import '../../pages/main/Main.scss'
import ProfileMenu from "./AccountMenu.js";
import NotificationsBox from "./NotificationsBox.js";
import React from 'react';
import logo from '../../test.png'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function MainNavBar() {
    return (
        <div className="MainNavBar">
            <NotificationContainer />
            <Container>
                <div className="Main_NavBar_Container">
                    <Link href="/">
                        <img
                            id ="logo"
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                    <Search />
                    <div className="Main_NavBar_List">
                        <ul>
                            <li>
                                <BookmarksIcon 
                                    onClick={() => window.location.href = "/saved"}
                                />
                            </li>
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
