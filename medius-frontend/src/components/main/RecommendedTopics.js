import Topic from "../../components/shared/Topic.js";
import '../../pages/main/Main.scss'
function RecommendedTopics() {
    return (
        <div className="RecommendedTopic">
            <p>
                Recommended topics
            </p>
            <div className="RecommendedTopic_Container">
                <Topic />
                <Topic />
                <Topic />
                <Topic />
                <Topic />
            </div>
        </div>
    )
}
export default RecommendedTopics;