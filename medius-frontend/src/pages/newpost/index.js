import NewPostNavBar from "../../components/newpost/NewPostNavBar.js";
import { Container } from "@material-ui/core";
import TextEditor from "./TextEditor.js";
import React from 'react';
import './newpost.scss';
import { TextField } from "@mui/material";

function WritePost() {
    return (
        <div>
            {<NewPostNavBar />}
            <Container>
                <div>

                </div>
                <TextField
                    label='Title'
                    placeholder='Enter Title'
                    fullWidth
                    variant="standard"
                />
                <TextField
                    label='Add photo cover link'
                    fullWidth
                    variant="standard"
                />
                <TextField
                    label='Post preview'
                    placeholder='Write somethings about your post'
                    fullWidth
                    variant="standard"
                />
                <TextField
                    label='Topics'
                    placeholder='Add some topics to your post'
                    variant="standard"
                    fullWidth
                />
                <TextEditor />
            </Container>
        </div>
    );
}
export default WritePost;