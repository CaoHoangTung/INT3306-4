import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { savePost, unsavePost } from "../../api/post_functions";
import { getCurrentUser } from "../../utils/auth";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    savedIcon : {
        color: "#ff6d00"
    }
}));

export default function SaveButton(props) {
    const classes = useStyles();
    return (
        <BookmarkBorderIcon
            className={props.isSaved ? classes.savedIcon : ""}
            onClick={() => {
                if (props.isSaved) {
                    savePost(props.postId, getCurrentUser());
                    props.setIsSaved(false);
                } else {
                    unsavePost(props.postId, getCurrentUser());
                    props.setIsSaved(true);
                }
            }}
        >
        </BookmarkBorderIcon>
    );
}