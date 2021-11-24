import NewPostNavBar from "../../components/newpost/NewPostNavBar.js";
import { Container } from "@material-ui/core";
import TextEditor from "./TextEditor.js";
import React from 'react';
import EditorContainer from "./EditorContainer.js";
import './newpost.scss';
function WritePost() {
    return (
        <div>
            {<NewPostNavBar />}
            <Container>
                <TextEditor />
            </Container>
        </div>
    );
}
export default WritePost;