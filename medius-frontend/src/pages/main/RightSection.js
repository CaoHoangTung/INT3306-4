import { Container } from "@material-ui/core";
import RecommendedTopics from "./RecommendedTopics.js";
import { Grid } from "@material-ui/core";
import WhoToFollow from "./WhoToFollow.js";
function RightSection(){
    return(
        <div className="RightSection">
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
        </div>
    )
}
export default RightSection;