import { Button, Grid, TextField, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { login } from "../../api/login";
const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    const btnstyle = { margin: '8px 0' }
    return (
        <Grid>
            <div>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <div>
                    <TextField
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        label='Username'
                        placeholder='Enter username'
                        fullWidth
                        required />
                    <TextField
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label='Password'
                        placeholder='Enter password'
                        type='password'
                        fullWidth
                        required
                    />
                    <small id="fail"></small>
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
                        const loginIsSuccess = await login(username, password);
                        if (loginIsSuccess) {
                            window.location.href = "/";
                        } else {
                            document.getElementById("fail").innerHTML = "Wrong username or password";
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
                <Typography > Do you have an account?
                    <Link href="#" onClick={() => { props.setIsLogin(false) }}>
                        Sign Up
                    </Link>
                </Typography>
            </div>
        </Grid>
    )
}

export default Login