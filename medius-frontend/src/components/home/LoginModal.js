import SignUp from "./SignUp";
import { Button, Checkbox, FormControlLabel, Grid, TextField, Link,Typography } from "@material-ui/core"
import { useState } from "react"
import { login } from "../../api/login";
import Login from "./Login";
const LoginModal = props => {

    if (!props.show) {
        return null;
    }
    if (props.isLogin) {
        return (
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title " id='model-header'>Login</h4>
                    </div>
                    <div className="modal-body">
                        <Login setIsLogin = {props.setIsLogin} />
                    </div>
                    <div className="modal-footer">
                        <Button onClick={props.onClose}>
                            Close
                        </Button>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title " id='model-header'>Sign Up</h4>
                    </div>
                    <div className="modal-body">
                        <SignUp setIsLogin = {props.setIsLogin}/>
                    </div>
                    <div className="modal-footer">
                        <Button onClick={props.onClose}>
                            Close
                        </Button>
                    </div>

                </div>
            </div>
        )
    }

}
export default LoginModal;