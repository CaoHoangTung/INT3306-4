import { useEffect, useState } from "react";
import { getAllTopics } from "../../api/topic.js";
import Topic from "../../components/shared/Topic.js";
import '../../pages/main/Main.scss'

function RecommendedTopics() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getAllTopics()
        .then(topics => {
            console.log(topics);
            setTopics(topics);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="RecommendedTopic">
            <p>
                Recommended topics
            </p>
            <div className="RecommendedTopic_Container">
                {topics.map(topic => (
                    <Topic 
                        key={topic.topic_id} 
                        topic={topic.topic_name}
                        link={`/topic/${topic.topic_id}`}
                    />
                    )
                )}
            </div>
        </div>
    )
}
export default RecommendedTopics;