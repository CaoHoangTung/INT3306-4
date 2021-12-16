import { useParams } from "react-router";
import WritePost from "../../components/editor";

function EditPost() {
    const { postId } = useParams();

    return (
        <WritePost editMode={true} postId={postId} />
    )
}
export default EditPost;