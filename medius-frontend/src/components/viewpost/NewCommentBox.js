import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import { Avatar, Link } from "@mui/material";
import { getCurrentUser } from "../../utils/auth";
import { getUser } from "../../api/users";
import { commentPost } from "../../api/post_functions";
import { getComment } from "../../api/comments";
import { NotificationManager } from 'react-notifications';

const INITIAL_HEIGHT = 210;

const NewCommentBox = (props) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [commentValue, setCommentValue] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser(getCurrentUser())
        .then(data => {
            setUser(data);
        });
    }, []);

    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    }
    const onChange = (e) => {
        setCommentValue(e.target.value);
    }

    const onClose = () => {
        setCommentValue("");
        setIsExpanded(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        commentPost(props.postId, getCurrentUser(), commentValue).then(data => {
            getComment(data.comment_id).then(data => {
                props.setComments(props.comments.concat(data));
                NotificationManager.success('Comment posted successfully!', 'Success', 3000);
            });
        }).catch(err => console.error(err));
    }


    return (
        <div className="CommentContainer">
        <form
            onSubmit={onSubmit}
            ref={containerRef}
            className={cn("comment-box", {
                expanded: isExpanded,
                collapsed: !isExpanded,
                modified: commentValue.length > 0,
            })}
            style={{
                minHeight: INITIAL_HEIGHT
            }}
        >
            <div className="header">
                <div className="user">
                    <Avatar
                        alt="username"
                        src={user.avatar_path}
                    />
                    <Link href={"/profile/" + user.user_id}>
                        {user.first_name + " " + user.last_name}
                    </Link>
                </div>
            </div>

            <label htmlFor="comment">What are your thoughts?</label>
            <textarea
                ref={textRef}
                onClick={onExpand}
                onFocus={onExpand}
                onChange={onChange}
                className="comment-field"
                placeholder="What are your thoughts?"
                value={commentValue}
                name="comment"
                id="comment"
            />

            <div className="actions">
                <button type="button" className="cancel" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" disabled={commentValue.length < 1}>
                    Respond
                </button>
            </div>
        </form>
        </div>
    );
};

export default NewCommentBox;