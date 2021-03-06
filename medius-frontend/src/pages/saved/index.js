import './style.scss'
import MainNavBar from "../../components/main/MainNavBar";
import Container from "@mui/material/Container";
import SavedFeed from "../../components/saved/SavedFeed";
import React from "react";
import { Typography } from '@material-ui/core';
import { getCurrentUser, getLocalCredential } from '../../utils/auth';

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
                            <SavedFeed
                                user_id={Number(getLocalCredential().user_id)}
                                topic_ids={[]}
                                sort_by_upvotes={false}
                                page={0}
                                limit={10}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Saved;