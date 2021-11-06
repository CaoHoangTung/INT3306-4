import { Container } from "@material-ui/core";
import Search from "../components/Search.js";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
                            <li><Search/></li>
                            <li><BookmarksIcon/></li>
                            <li><NotificationsNoneIcon/></li>
                            <li><AccountCircleIcon/></li>
                        </ul>
                    </div>
                </div>

            </Container>
        </div>
    );
}
export default MainNavBar;