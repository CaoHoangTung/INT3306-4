import './style.scss'
import { Typography } from '@material-ui/core';
import MainNavBar from "../../components/main/MainNavBar";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import RightSection from "../../components/main/RightSection";
import NewsFeed from "../../components/main/NewsFeed";
import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { getTopic } from '../../api/topic';

function TopicPage(props) {
    const { topicId } = useParams();
    const [topicName, setTopicName] = React.useState("");

    useEffect(() => {
        getTopic(topicId)
            .then(topic => {
                console.log(topic);
                setTopicName(topic.topic_name);
            });
    }, []);

    return (
        <div className="TopicPage">
            <div className="header">
                <MainNavBar />
            </div>
            <div className="content">
                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <div className="topicName">
                            <Container>
                                <Typography variant="h4" gutterBottom>
                                    Posts with topic {topicName}
                                </Typography>
                            </Container>
                        </div>
                        <div className="left">
                            <div className="LeftSection">
                                <Container>
                                    <NewsFeed topic_ids={[topicId]} />
                                </Container>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            <Container>
                                <div className="numWriter">Number of writers</div>
                                <div className="numPost"> Number of post </div>
                            </Container>
                            <RightSection />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
export default TopicPage;