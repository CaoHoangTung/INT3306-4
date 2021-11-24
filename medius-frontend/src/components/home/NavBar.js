import {Button, Container, Link} from "@material-ui/core";
import LoginModal from "./LoginModal";
import { useState } from 'react';
const NavBar = () => {
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="NavBar">
            <Container>
                <div className="NavBar_Container">
                    <img
                        src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                        alt="logo"
                    />
                    <div className="NavBar_Lists">
                        <ul>
                            <li><Link> Our Story </Link></li>
                            <li onClick={() => {setShow(true); setIsLogin(true)}}>Sign in</li>
                            <li>
                                <Button id='get_start' onClick={() => {setShow(true); setIsLogin(false)}}>
                                    Get started
                                </Button >
                                <LoginModal onClose={() => {setShow(false)} } show={show} isLogin = {isLogin} setIsLogin = {setIsLogin}/>
                            </li>
                        </ul>
                    </div>
                </div>  
            </Container>
        </div>
    )
}

export default NavBar;