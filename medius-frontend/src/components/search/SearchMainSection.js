import { Container, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from 'react';
import MediumPosts from "../home/PostPreview.js";
import UserIntro from "../home/UserIntro";
import Topic from "../shared/Topic.js";

function MainSection(props) {
    return (
        <div className="MainSection_Container">
            <Container>
            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Typography variant="h4" gutterBottom>
                        Search Results "{props.queryString}"
                    </Typography>
                    <div className="LeftSection">
                        <Container>
                        <div>
                            {props.posts.map(post => {
                                return (
                                    <MediumPosts
                                        key={post.post_id}
                                        postId={post.post_id}
                                        author={post.author}
                                        // topic="topic"
                                        title={post.title}
                                        // contentPreview="contentPreview"
                                        postTime={post.published_at}
                                        previewImagePath={post.preview_image_path}
                                    />
                                )
                            })}
                        </div>
                        </Container>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="RightSection">
                        <Container>
                            <Grid container>
                            <Grid item xs={8}>
                            <div className="RecommendedTopic">
                                <Typography variant="h5" gutterBottom>
                                    Topics Search Results
                                </Typography>
                                <div className="RecommendedTopic_Container">
                                    {props.topics.map(topic => (
                                        <Topic
                                            key={topic.topic_id}
                                            topicId={topic.topic_id}
                                            topicName={topic.topic_name}
                                        />
                                    )
                                    )}
                                </div>
                            </div>
                            </Grid>
                            <Grid item xs={8}>
                            <div className="WhoToFollow">
                                <Typography variant="h5" gutterBottom>
                                    User Search Results
                                </Typography>
                                <div className="WhoToFollow_Container">
                                    {props.users.map((user, idx) => {
                                        return (
                                            <UserIntro
                                                key={idx}
                                                author={`${user.first_name} ${user.last_name}`}
                                                image={user.avatar_path}
                                                description={`${user.num_followers} followers`}
                                                link={`/profile/${user.user_id}`}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                            </Grid>
                            </Grid>
                        </Container>
                    </div>
                </Grid>
            </Grid>
            </Container>
        </div>
    );
}
export default MainSection;