import { Button, Container, FormLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import './newpost.scss';
import { TextField } from "@mui/material";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { createPost, getPost, updatePost } from "../../api/posts.js";
import draftToHtml from 'draftjs-to-html';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import MainNavBar from "../main/MainNavBar.js";
import { convertFileToBase64, uploadFile } from "../../api/file.js";
import htmlToDraft from 'html-to-draftjs';
import TopicSelector from "./TopicSelector";
import { getAllTopics } from "../../api/topic";
import { getPostTopicByPostId } from "../../api/posts_topic";
import { setCredential } from "../../utils/auth";

function WritePost({ editMode = false, postId = null }) {

    const [title, setTitle] = useState("");
    const [previewImagePath, setPreviewImagePath] = useState("");
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [topicOptions, setTopicOptions] = useState([]);
    const [selectedTopicOptionsId, setSelectedTopicOptionsId] = useState([]);
    const [creatingPost, setCreatingPost] = useState(false);

    useEffect(() => {
        setCreatingPost(true);
        let p0, p1, p2;
        p0 = getAllTopics()
            .then(topics => {
                setTopicOptions(topics);
            });

        if (editMode) {
            p1 = getPost(postId)
                .then(post => {
                    setTitle(post.title);
                    setPreviewImagePath(post.preview_image_path);

                    const contentBlock = htmlToDraft(post.content);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        setEditorState(editorState);
                    }
                });
            p2 = getPostTopicByPostId(postId)
                .then(topics => setSelectedTopicOptionsId(topics.map(topic => topic.topic_id)))

        }
        Promise.all([p0, p1, p2]).then(() => {
            setCreatingPost(false);
        })
    }, []);

    const publish = (event) => {
        setCreatingPost(true);
        event.preventDefault();
        const post = {
            title: title,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            preview_image_path: previewImagePath,
            cover_image_path: previewImagePath,
            topic_ids: [...selectedTopicOptionsId.map(topic => topic.topic_id)]
        }

        if (editMode) {
            post.post_id = postId;
            console.log("UPDATE", post)
            updatePost(post)
                .then(data => {
                    console.log("DAT", data)
                    // window.location.href = "/post/" + postId;
                }).catch(err => {
                    alert("Error editing post");
                    console.error(err);
                });
        } else {
            createPost(post)
                .then(data => {
                    window.location.href = "/post/" + data.post_id;
                }).catch(err => {
                    alert("Error creating post");
                    console.error(err);
                });
        }
    }

    const uploadImageCallBack = (file) => {
        return uploadFile(file)
            .then(response => {
                return {
                    data: {
                        link: response.url
                    }
                };
            }).catch(error => {
                console.error(error);
            });
    }

    const handleSelectImage = (e) => {
        return uploadFile(e.target.files[0])
            .then(response => {
                setPreviewImagePath(response.url);
            }).catch(err => {
                console.error(err);
            });
    }

    return (
        <div>
            <MainNavBar />
            <Container>
                <h1>Create new post</h1>
                <TextField
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    label='Title'
                    placeholder='Enter Title'
                    fullWidth
                    variant="standard"
                    required />
                <br />
                <FormLabel>Cover image</FormLabel>
                <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleSelectImage}
                />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture"
                        component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <br />
                {!!previewImagePath && <img style={{ maxWidth: "100%" }} src={previewImagePath} alt="preview" />}

                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        inline: { inDropdown: false },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: true }
                        },
                    }}
                />
                <TopicSelector
                    topicOptions={topicOptions}
                    selectedTopicOptionsId={selectedTopicOptionsId}
                    setSelectedTopicOptionsId={setSelectedTopicOptionsId}
                />

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    fullWidth
                    onClick={publish}
                    disabled={creatingPost || !title}
                >
                    {editMode ? "Save" : "Publish"}
                </Button>
            </Container>
        </div>
    );
}
export default WritePost;