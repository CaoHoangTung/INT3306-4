import MainNavBar from "../../components/main/MainNavBar";
import { Container } from "@mui/material";

function Setting(props) {
    return (
        <div className={"setting"}>
            <div>
                <MainNavBar />
            </div>
            <div>
                <div className="aboutYou">
                    <Container>
                        <div className="firstname">
                            <input type="text"
                                placeholder={"oldFirstname"}
                            />
                        </div>
                        <div className="lastname">
                            <input type="text"
                                placeholder={"oldLastname"}
                            />
                        </div>
                        <div className="email">
                            <input type="text"
                                placeholder={"oldEmail"}
                            />
                        </div>
                        <div className="profileImage">
                            <input type="file" id="myFile" name="filename" />
                        </div>
                        <div>
                            <button>Save changes</button>
                        </div>
                    </Container>
                </div>
                <div className="security">
                    <div className="password">
                        <input type="oldPassword"
                            placeholder={"**********"}
                        />
                        <input type="newPassword"
                            placeholder={"**********"}
                        />
                        <input type="newPassword"
                            placeholder={"**********"}
                        />
                    </div>
                </div>
                <div className="blocking">

                </div>
            </div>
        </div>
    );
}
export default Setting;