import Topic from "../components/shared/Topic.js";

function RecommendedTopic() {
    return (
        <div className="RecommendedTopic">
            <p>
                Recommended topics
            </p>
            <div className="RecommendedTopic_Container">
                <Topic/>
                <Topic/>
            </div>
        </div>
    )
}
export default RecommendedTopic;