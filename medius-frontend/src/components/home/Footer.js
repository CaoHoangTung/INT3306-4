import {Container, Link} from "@material-ui/core";
import React from 'react';
import logo from '../../mediusLogo.png'
const Footer = () => {
    return(
        <div className="Footer">
            <Container>
                <div className="Footer_Container">
                    <Link href="/">
                        <img
                            id ="logo"
                            src={logo}
                            alt="logo"
                        />
                    </Link>

                    <div className="Footer_Lists">
                        <ul>
                            <li><Link href="#" color="inherit" underline="none">About us</Link></li>
                            <li><Link href="#" color="inherit" underline="none">Help</Link></li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Footer;