import NewPostNavBar from "../../components/newpost/NewPostNavBar.js";
import { Button, Container } from "@material-ui/core";
import React, { useState } from "react"
import './newpost.scss';
import { TextField } from "@mui/material";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { createPost } from "../../api/posts.js";
import draftToHtml from 'draftjs-to-html';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
function WritePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pushlishedTime, setpushlishedTime] = useState("");
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    
      
    const publish = (event) => {
        event.preventDefault();
        const post = {
            title: title,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            preview_image_path: "test",
            cover_image_path: "test"
        }
        // createPost({
        //     "title": "lamtest123",
        //     "content": "stringdsad",
        //     "preview_image_path": "string",
        //     "cover_image_path": "string",
        //     "published_at": "2021-12-10T08:17:14.270Z"
        //   });
        createPost(post);
    }

    function getBase64(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => {};
      }
    
    function  uploadFile(file) {
        return new Promise((resolve, reject) => {
          this.getBase64(file, data => resolve({ data: { link: data } }));
        });
    }

    
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
                <input accept="image/*" id="icon-button-file"
                    type="file" style={{ display: 'none' }} />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture"
                        component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
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
                        // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                      }}
                />
                {/* <EditorContainer/> */}
                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    fullWidth
                    onClick={publish}
                >Publish</Button>
            </Container>
        </div>
    );
}
export default WritePost;