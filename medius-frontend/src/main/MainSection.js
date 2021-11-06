import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import LeftSection from "./LeftSection.js";
import RightSection from "./RightSection.js";
function MainSection() {
    return (
        <div className="MainSection_Container">
            <Container>
            <Grid container spacing={0}>
                <Grid item xs={7}>
                    <LeftSection/>
                </Grid>
                <Grid item xs={5}>
                    <RightSection/>
                </Grid>
            </Grid>
            </Container>
        </div>
    );
}
export default MainSection;