import { Container } from "@material-ui/core";
import './Main.scss';
import YourTopics from "./YourTopics.js";
function LeftSection(){
    return(
        <div className="LeftSection">
            <Container>
                <YourTopics/>
            </Container>
        </div>
    )
}
export default LeftSection;