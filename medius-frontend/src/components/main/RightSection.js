import { Container } from "@material-ui/core";
import RecommendedTopics from "./RecommendedTopics.js";
import { Grid } from "@material-ui/core";
import WhoToFollow from "./WhoToFollow.js";
import SearchUser from "./SearchUser.js";
import '../../pages/main/Main.scss'
import React  from 'react';
function RightSection(){
    return(
        <div className="RightSection">
            <Container>
                <Grid container>
                <Grid item xs={12}>
                <RecommendedTopics/>
                </Grid>
                <Grid item xs={12}>
                <SearchUser />
                </Grid>
                <Grid item xs={12}>
                <WhoToFollow/>
                </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default RightSection;