import { Container } from "@material-ui/core";
import '../../pages/main/Main.scss'
import NewsFeed from "./NewsFeed.js";
import YourTopics from "./YourTopics.js";
import React from 'react';
function LeftSection() {
    return (
        <div className="LeftSection">
            <Container>
                {/* <YourTopics/> */}
                <NewsFeed
                    user_id={null}
                    topic_ids={[]}
                    sort_by_upvotes={false}
                    page={0}
                    limit={5}
                />
            </Container>
        </div>
    )
}
export default LeftSection;