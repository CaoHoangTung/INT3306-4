import { Button, Grid, TextField, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { login } from "../../api/login";
import React from 'react';
const SignUp = (props) => {
    const [firstName] = useState("");
    const [lastName] = useState("");
    const [email] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    const btnstyle = { margin: '8px 0' }
    return (
        <Grid>
            <div>
                <Grid align='center'>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField
                    value={firstName}
                    onChange={e => setUsername(e.target.value)}
                    label='First name'
                    placeholder='What is your first name ?'
                    fullWidth
                    required />
                <TextField
                    value={lastName}
                    onChange={e => setUsername(e.target.value)}
                    label='Last name'
                    placeholder='And your last name ?'
                    fullWidth
                    required />
                <TextField
                    value={email}
                    onChange={e => setUsername(e.target.value)}
                    label='Email'
                    placeholder='Just a little more.'
                    fullWidth
                    required />
                <TextField
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    label='Username'
                    placeholder="Let's choose a cool username"
                    fullWidth
                    required />
                <TextField
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    label='Password'
                    placeholder="It's a secret!"
                    type='password'
                    fullWidth
                    required
                />
                <TextField
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    label='Repeat password'
                    placeholder='We are done!'
                    type='password'
                    fullWidth
                    required
                />

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    disabled={disabled}
                    onClick={async () => {
                        setDisabled(true);
                        const loginIsSuccess = await login(username, password);
                        if (loginIsSuccess) {
                            window.location.href = "/";
                        } else {
                            setDisabled(false);
                        }
                    }}
                >
                    Sign in
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