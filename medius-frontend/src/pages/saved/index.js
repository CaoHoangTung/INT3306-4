import './style.scss'
import MainNavBar from "../../components/main/MainNavBar";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import RecommendedTopics from "../../components/main/RecommendedTopics";
import WhoToFollow from "../../components/main/WhoToFollow";
import RightSection from "../../components/main/RightSection";
import LeftSection from "../../components/main/LeftSection";
import YourTopics from "../../components/main/YourTopics";
import NewsFeed from "../../components/main/NewsFeed";
import React from "react";

function Saved(props) {
    return(
        <div className="TopicPage">
            <div className="header">
                <MainNavBar/>
            </div>
            <div className="content">
                <div className="topicName">
                    <Container>
                        <p>
                            Saved Post
                        </p>
                    </Container>
                </div>
                <div className="left">
                    <div className="LeftSection">
                        <Container>
                            <NewsFeed/>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Saved;