import { Button, Container } from '@material-ui/core';
import React from 'react';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ProfileMenu from '../../components/main/AccountMenu.js';

function NewPostNavBar() {
    return (
        <div className="NewPostNavBar">
            <Container>
                <div className="NewPost_NavBar_Container">
                    <img
                        src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                        alt="logo"
                    />
                    <div className="NewPost_NavBar_List">
                        <ul>
                            <li><BookmarksIcon /></li>
                            <li><ProfileMenu /></li>
                        </ul>
                    </div>
                </div>

            </Container>
        </div>
    );
}

export default NewPostNavBar;
