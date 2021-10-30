import { Button, Container } from "@material-ui/core";
import LoginModal from "./LoginModal";
import { useState } from 'react';
const NavBar = () => {
    const [show, setShow] = useState(false);
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
                            <li>Our Story</li>
                            <li>Membership</li>
                            <li>Write</li>
                            <li onClick={()=>setShow(true)}>Sign in</li>
                            <li>
                            <Button onClick={()=>setShow(true)}>
                                Get started
                            </Button >
                            <LoginModal onClose={()=>setShow(false)} show={show}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NavBar;