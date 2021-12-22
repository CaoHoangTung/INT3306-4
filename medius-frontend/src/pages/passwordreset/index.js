import { Button, TextField } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { resetPassword, updateUser } from "../../api/users";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword = () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);

    const query = useQuery();

    const checkPassword = async () => {
        setDisabled(true);
        if (password.length < 8) {
            document.getElementById("password").innerHTML = "Password must have at 8 characters";
            setDisabled(false)
            return;
        } else {
            document.getElementById("password").innerHTML = "";
        }
        if (password != confirmPassword) {
            document.getElementById("confirmPassword").innerHTML = "The password does not match";
            setDisabled(false)
            return;
        } else {
            document.getElementById("confirmPassword").innerHTML = "";
        }

        const signUpIsSuccess = await resetPassword(query.get("token"), password);
        console.log(signUpIsSuccess);
        if (signUpIsSuccess !== false) {
            alert("Your password has been changed")
            window.location.href = "/";
        } else {
            document.getElementById("confirmPassword").innerHTML = "Invalid password";
            setDisabled(false);
            return;
        }
    }

    return (
        <div style={{
            height: "100vh",
            background: 'url("https://coolbackgrounds.io/images/backgrounds/index/sea-edge-79ab30e2.png")',
            backgroundSize: "cover",
            padding: "20px",
        }}>
            <div style={{ width: "30%", margin: "30px auto" }}>
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
                    <small id="password" style={{ color: "red" }}></small>
                </div>
                <br />
                <div>
                    <TextField
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        label='Repeat password'
                        placeholder='We are done!'
                        type='password'
                        fullWidth
                        required
                    />
                    <small id="confirmPassword" style={{ color: "red" }}></small>
                </div>
                <br />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    fullWidth
                    onClick={checkPassword}
                >
                    Reset your password
                </Button>
            </div>
        </div>
    )
}

export default ResetPassword;