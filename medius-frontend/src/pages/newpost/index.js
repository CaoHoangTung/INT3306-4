import MainNavBar from "../../components/main/MainNavBar.js";
import { Container } from "@material-ui/core";
import TextEditor from "./TextEditor.js";
import React from 'react';
import EditorContainer from "./EditorContainer.js";
function WritePost() {
    return (
        <div>
            <MainNavBar />
            <Container>
                <TextEditor />
            </Container>
        </div>
    );
}
export default WritePost;