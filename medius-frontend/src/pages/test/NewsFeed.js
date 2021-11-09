import MediumPosts from "../../components/PostPreview.js";
function NewsFeed() {
    return (
        <div>
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
            <MediumPosts
                author="author"
                topic="topic"
                title="title"
                contentPreview="contentPreview"
                postTime="2:00:00 PM 10/29/2021"
            />
        </div>
    )
}
export default NewsFeed;