import { Button, TextField } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { resetPassword, sendResetPasswordRequest, updateUser } from "../../api/users";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const resetPassword = () => {
        setDisabled(true);
        setSuccessMessage("");
        setErrorMessage("");
        sendResetPasswordRequest(email)
            .then(response => {
                setSuccessMessage("A password reset link has been sent to your email");
            }).catch(error => {
                setErrorMessage("Email not found");
                setErrorMessage(error?.detail)
            }).finally(() => {
                setTimeout(() => setDisabled(false), 10000);
            });
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label='Email'
                        placeholder="Type your account email"
                        type='text'
                        fullWidth
                        required
                    />
                    <small id="password" style={{ color: "red" }}>{errorMessage}</small>
                    <small id="password" style={{ color: "green" }}>{successMessage}</small>
                </div>
                <br />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    fullWidth
                    onClick={() => resetPassword()}
                    disabled={disabled}
                >
                    {disabled ? "Please wait a moment..." : "Send reset password link"}
                </Button>
            </div>
        </div>
    )
}

export default ForgotPassword;