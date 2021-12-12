import { Container } from "@material-ui/core";
import '../../pages/main/Main.scss'
import NewsFeed from "./NewsFeed.js";
import YourTopics from "./YourTopics.js";
import React from 'react';
function LeftSection(){
    return(
        <div className="LeftSection">
            <Container>
                <YourTopics/>
                <NewsFeed/>
            </Container>
        </div>
    )
}
export default LeftSection;