import './style.scss'
import MainNavBar from "../../components/main/MainNavBar";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import RecommendedTopics from "../../components/main/RecommendedTopics";
import WhoToFollow from "../../components/main/WhoToFollow";
import RightSection from "../../components/main/RightSection";
import LeftSection from "../../components/main/LeftSection";

function TopicPage(props) {
    return(
        <div className="TopicPage">
            <div className="header">
                <MainNavBar/>
            </div>
            <div className="content">
                <Grid container spacing={0}>
                    <Grid item xs = {8}>
                        <div className="topicName">
                            <Container>
                                <p>
                                    Name Of Topic
                                </p>
                            </Container>
                        </div>
                        <div className="left">
                            <LeftSection/>
                        </div>
                    </Grid>
                    <Grid item xs = {4}>
                        <div>
                            <Container>
                                <div className="numWriter">Number of writers</div>
                                <div className="numPost"> Number of post </div>
                            </Container>
                            <RightSection/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
export default TopicPage;