import { Button, Grid, TextField, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { login, register } from "../../api/login";

const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
                        if (email.search("@") == -1) {
                            document.getElementById("email").innerHTML = "Invalid email";
                            setDisabled(false);
                            return;
                        } else {
                            document.getElementById("email").innerHTML = "";
                        }
                        if (password.length < 8) {
                            document.getElementById("password").innerHTML = "Password must have at 8 characters";
                            setDisabled(false)
                            return;
                        } else {
                            document.getElementById("password").innerHTML = "";
                        }
                        if (password != repassword) {
                            document.getElementById("repassword").innerHTML = "The password does not match";
                            setDisabled(false)
                            return;
                        } else {
                            document.getElementById("repassword").innerHTML = "";
                        }
                        const newUser = {
                            "first_name": firstName,
                            "last_name": lastName,
                            "email": email,
                            "password": password
                        }
                        const signUpIsSuccess = await register(firstName, lastName, email, password);
                        console.log(signUpIsSuccess);
                        if (signUpIsSuccess !== false) {
                            login(email, password)
                                .then(() => {
                                    window.location.href = "/";
                                }).catch(err => {
                                    console.log(err);
                                    alert("Something went wrong, please try again later");
                                });
                        } else {
                            document.getElementById("repassword").innerHTML = "Email exists or invalid password";
                            setDisabled(false);
                            return;
                        }
                    }}
                >
                    Sign up
                </Button>
                <Typography >
                    <Link href="/passwordforgot" >
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