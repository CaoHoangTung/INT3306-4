import React from "react";
import StarIcon from "@material-ui/icons/Star";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import moment from "moment";

const MediumPosts = (props) => {
    return (
        <div className="MediumPosts">
            <div className="MediumPosts_Text">
                <h2>{props.title}</h2>
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
                style={{ backgroundImage: `url(logo512.png)` }}
            />
        </div>
    );
};

export default MediumPosts;
