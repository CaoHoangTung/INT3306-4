import { Button, Container } from "@material-ui/core";

const Footer = () => {
    return(
        <div className="Footer">
            <Container>
                <div className="Footer_Container">
                    <img
                        src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                        alt="logo"
                    />
                    <div className="Footer_Lists">
                        <ul>
                            <li>About us</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Footer;