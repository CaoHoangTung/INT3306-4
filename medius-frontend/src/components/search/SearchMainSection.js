import { Container, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from 'react';
import MediumPosts from "../home/PostPreview.js";

function MainSection(props) {
    return (
        <div className="MainSection_Container">
            <Container>
            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Typography variant="h4" gutterBottom>
                        Search Results
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
                    {/* <div className="RightSection">
                        <Container>
                            <Grid container>
                            <Grid item xs={8}>
                            <RecommendedTopics/>
                            </Grid>
                            <Grid item xs={8}>
                            <WhoToFollow/>
                            </Grid>
                            </Grid>
                        </Container>
                    </div> */}
                </Grid>
            </Grid>
            </Container>
        </div>
    );
}
export default MainSection;