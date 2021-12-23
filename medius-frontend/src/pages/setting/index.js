import MainNavBar from "../../components/main/MainNavBar";
import { Container, Grid } from "@mui/material";
import Block from "./Block";
import { TextField } from "@mui/material";
import { useState } from "react";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import EditButton from "./EditButton.js";
import { Button } from "@material-ui/core";
function Setting(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedpassword,setretypedpassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <div className="setting">
            <div>
                <MainNavBar />
            </div>
            <Container>
                <div className="setting-container">
                    <div>
                        <h1>About you</h1>
                    </div>
                    <div>
                        <h3>Name</h3>
                        <TextField
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            label='Username'
                            placeholder='Enter username'
                            fullWidth
                            required />
                        <EditButton/>
                        <p>
                            Your name appears on your Profile page, as your byline, and in your responses. It is a required field.
                        </p>
                    </div>
                    <div>
                        <h3>Photo</h3>
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture"
                                component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <p>
                            Your photo appears on your Profile page and with your stories across Medium
                        </p>
                        <p>Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.</p>
                    </div>

                    <div className="Account">
                        <h1>Account</h1>
                        <div>
                            <h3>Reset Password</h3>
                            <TextField
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                label='Password'
                                placeholder='Enter new password'
                                fullWidth
                                required />
                            <h3>Retype your new password</h3>
                            <TextField
                                value={password}
                                onChange={e => setretypedpassword(e.target.value)}
                                label='Retype'
                                placeholder='Retype password'
                                fullWidth
                                required />
                            <Button>Reset</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default Setting;