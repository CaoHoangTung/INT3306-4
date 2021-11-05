import { AppBar, Container } from "@material-ui/core";
import { color } from "@mui/system";
import './Main.scss';
import MainNavBar from "./MainNavBar.js";
function Main() {
    return (
        <div className="Main">
            <MainNavBar />
        </div>
    );
}

export default Main;