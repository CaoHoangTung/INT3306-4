import { AppBar, Container } from "@material-ui/core";
import { color } from "@mui/system";
import Footer from "../home/Footer.js";
import './Main.scss';
import MainNavBar from "./MainNavBar.js";
import MainSection from "./MainSection.js";
function Main() {
    return (
        <div className="Main">
            <MainNavBar />
            <MainSection/>
        </div>
    );
}

export default Main;