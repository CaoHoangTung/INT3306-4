import { Container } from "@material-ui/core";
import RecommendedTopic from "./RecommendedTopic.js";

function RightSection(){
    return(
        <div className="RightSection">
            <Container>
                <RecommendedTopic/>
            </Container>
        </div>
    )
}
export default RightSection;