import { Container } from "@material-ui/core";
import Search from "./Search.js";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import '../../pages/main/Main.scss'
import { logout } from "../../api/login.js";
import ProfileMenu from "./ProfileMenu.js";
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
                            <li><NotificationsNoneIcon /></li>
                            <li><ProfileMenu/></li>
                        </ul>
                    </div>
                </div>

            </Container>
        </div>
    );
}

export default MainNavBar;
