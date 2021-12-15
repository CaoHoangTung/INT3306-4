import React from "react";
import StarIcon from "@material-ui/icons/Star";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import moment from "moment";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
const MediumPosts = (props) => {
    const mustLoginFirst = !!props?.mustLoginFirst;
    const postUrl = mustLoginFirst ? "/" : `/post/${props.postId}`;
    const target = mustLoginFirst ? "_blank" : "";

    console.log(props.previewImagePath)

    return (
        <Link style={{ textDecoration: "none", color: "inherit" }} push to={postUrl} target={target}>
            <div className="MediumPosts">
                <div className="MediumPosts_Text">
                    <h1>{props.title}</h1>
                    <p>{props.author} - {props.title}</p>
                    <p>{props.contentPreview}</p>
                    <div className="MediumPosts_TimeStamps">
                        <div className="MediumPosts_TimeStamp_Paragraph">
                            <span>
                                {moment(new Date(props.postTime), "YYYYMMDD").format("LL")}
                            </span>
                            &nbsp;-&nbsp;
                            <span style={{ display: "flex", alignItems: "center" }}>
                                {moment(new Date(props.postTime), "YYYYMMDD").fromNow()}
                                <StarIcon />
                            </span>
                        </div>
                        <BookmarkBorderIcon className="MediumPosts_Bookmark" />
                    </div>
                </div>
                <div
                    className="MediumPosts_image"
                    style={{ backgroundImage: `url("${props?.previewImagePath}")` }}
                />
            </div>
        </Link>
    );
};

export default MediumPosts;
