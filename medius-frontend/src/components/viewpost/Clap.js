import { ClapButton, Provider } from "@lyket/react"
import { upvotePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
const Clap = (props) => {
    return (
        <Provider apiKey="pt_9d1c6ad483372e1ee694536e75d588">
            <ClapButton
                namespace="my-blog-post"
                id={props.post.post_id}
            />
        </Provider>
    )
}

export default Clap;