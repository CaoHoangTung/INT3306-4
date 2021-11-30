import MediumPosts from "../home/PostPreview.js";
import React, {useState} from 'react';
import '../../pages/main/Main.scss'
import CommentModal from "../shared/CommentModal"
import LoginModal from "../home/LoginModal";
function NewsFeed() {
    const [show, setShow] = useState(true);
    return (
        <div>
            {/*<CommentModal onClose={() => {setShow(false)} } show={show}/>*/}
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