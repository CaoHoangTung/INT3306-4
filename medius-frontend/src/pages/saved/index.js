import './style.scss'
import MainNavBar from "../../components/main/MainNavBar";
import Container from "@mui/material/Container";
import NewsFeed from "../../components/main/NewsFeed";
import React from "react";
import { Typography } from '@material-ui/core';

function Saved(props) {
    return (
        <div className="TopicPage">
            <div className="header">
                <MainNavBar />
            </div>
            <div className="content">
                <div className="topicName">
                    <Container>
                        <Typography variant="h4" gutterBottom>
                            Saved Posts
                        </Typography>
                    </Container>
                </div>
                <div className="left">
                    <div className="LeftSection">
                        <Container>
                            <NewsFeed />
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Saved;