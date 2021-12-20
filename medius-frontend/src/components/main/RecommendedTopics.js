import { useEffect, useState } from "react";
import { getAllTopics } from "../../api/topic.js";
import Topic from "../../components/shared/Topic.js";
import '../../pages/main/Main.scss'
import React from 'react';
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
                <b>Recommended topics</b>
            </p>
            <div className="RecommendedTopic_Container">
                {topics.map(topic => (
                    <Topic
                        key={topic.topic_id}
                        topicId={topic.topic_id}
                        topicName={topic.topic_name}
                    />
                )
                )}
            </div>
        </div>
    )
}
export default RecommendedTopics;