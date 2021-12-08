import { Button, Grid, TextField, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import {createUser} from "../../api/users"
const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    const btnstyle = { margin: '8px 0' }
    return (
        <Grid className="SignUp">
            <div>
                <Grid align='center'>
                    <h2>Sign Up</h2>
                </Grid>
                <div>
                    <TextField
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        label='First name'
                        placeholder='What is your first name ?'
                        fullWidth
                        required />
                    <small id="firstname"></small>
                </div>
                <div>
                    <TextField
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        label='Last name'
                        placeholder='And your last name ?'
                        fullWidth
                        required />
                    <small id="lastname"></small>
                </div>
                <div>
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label='Email'
                        placeholder='Just a little more.'
                        fullWidth
                        required />
                    <small id="email"></small>
                </div>
                <div>
                    <TextField
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        label='Username'
                        placeholder="Let's choose a cool username"
                        fullWidth
                        required />
                    <small id="username"></small>
                </div>
                <div>
                    <TextField
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label='Password'
                        placeholder="It's a secret!"
                        type='password'
                        fullWidth
                        required
                    />
                    <small id="password"></small>
                </div>
                <div>
                    <TextField
                        value={repassword}
                        onChange={e => setRePassword(e.target.value)}
                        label='Repeat password'
                        placeholder='We are done!'
                        type='password'
                        fullWidth
                        required
                    />
                    <small id="repassword"></small>
                </div>
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    disabled={disabled}
                    onClick={async () => {
                        setDisabled(true);
                        if (false) {
                            document.getElementById("username").innerHTML = "Username existed";
                            setDisabled(false)
                        }
                        if (email.search("@") == -1) {
                            document.getElementById("email").innerHTML = "Invalid email";
                            setDisabled(false)
                        }
                        if (password.length < 8) {
                            document.getElementById("password").innerHTML = "Password must have at 8 characters";
                            setDisabled(false)
                        }
                        if (password != repassword) {
                            document.getElementById("repassword").innerHTML = "The password does not match";
                            setDisabled(false)
                        }
                        const newUser = {
                            "user_id": 0,
                            "profile": "string",
                            "avatar_path": "string",
                            "cover_image_path": "string",
                            "role_id": 0,
                            "first_name": {firstName},
                            "last_name": {lastName},
                            "email": {email},
                            "password": {password}
                        }
                        const signUpIsSuccess = await createUser(newUser);
                        console.log(signUpIsSuccess);
                        if (signUpIsSuccess) {
                            window.location.href = "/";
                        } else {
                            setDisabled(false);
                        }
                        // const signUpIsSuccess =
                        //     await createUser(
                        //         0,
                        //         "bio",
                        //         "avatar",
                        //         "cover",
                        //         0,
                        //         firstName,
                        //         lastName,
                        //         email,
                        //         password
                        //     );
                        // if (signUpIsSuccess) {
                        //     window.location.href = "/";
                        //     console.log("Ok");
                        // } else {
                        //     setDisabled(false);
                        // }
                    }}
                >
                    Sign up
                </Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > You already have an account?
                    <Link href="#" onClick={() => { props.setIsLogin(true) }}>
                        Sign In
                    </Link>
                </Typography>
            </div>
        </Grid>
    )
}

export default SignUp;