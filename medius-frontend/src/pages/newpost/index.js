import NewPostNavBar from "../../components/newpost/NewPostNavBar.js";
import { Button, Container, FormControl } from "@material-ui/core";
import TextEditor from "./TextEditor.js";
import React, { useState } from "react"
import './newpost.scss';
import { TextField } from "@mui/material";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import EditorContainer from "./EditorContainer.js";
import { createPost } from "../../api/posts.js";
function WritePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pushlishedTime, setpushlishedTime] = useState("");
    const [postPreview, setpostPreview] = useState("");
    return (
        <div>
            {<NewPostNavBar />}
            <Container>
                <TextField
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    label='Title'
                    placeholder='Enter Title'
                    fullWidth
                    variant="standard"
                    required />
                <TextField
                    label='Post preview'
                    placeholder='Write somethings about your post'
                    fullWidth
                    variant="standard"
                    onChange={e => setpostPreview(e.target.value)}
                />
                <EditorContainer
                />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    fullWidth
                >Publish</Button>
            </Container>
        </div>
    );
}
export default WritePost;