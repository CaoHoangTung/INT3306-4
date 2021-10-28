import { Button, Container } from "@material-ui/core";
const NavBar = () => {
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
                            <li>Sign in</li>
                            <li>
                            <Button>
                                Get started
                            </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NavBar;