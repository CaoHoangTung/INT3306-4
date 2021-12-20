import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import LeftSection from "./LeftSection.js";
import RightSection from "./RightSection.js";
import React from 'react';
function MainSection() {
    const useViewport = () => {
        const [width, setWidth] = React.useState(window.innerWidth);

        React.useEffect(() => {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleWindowResize);
            return () => window.removeEventListener("resize", handleWindowResize);
        }, []);

        return { width };
    };
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    if (isMobile) {
        return (
            <div className="MainSection_Container">
                <Container>
                    <LeftSection/>
                </Container>
            </div>
        );
    }
    else
        return (
            <div className="MainSection_Container">
                <Container>
                    <Grid container spacing={0}>
                        <Grid item xs={8}>
                            <LeftSection />
                        </Grid>
                        <Grid item xs={4}>
                            <RightSection />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
}
export default MainSection;