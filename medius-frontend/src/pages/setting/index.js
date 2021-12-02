import MainNavBar from "../../components/main/MainNavBar";
import {Container, Grid} from "@mui/material";
import {TextField} from "@material-ui/core";
import {useState} from "react";
import Block from "./Block";

function Setting(props) {
    const [lastName, setLastName] = useState("");
    return (
        <div className="setting">
            <div>
                <MainNavBar/>
            </div>
            <div>
                <div className="aboutYou">
                    <Grid container>
                        <Grid item xs={2}>First Name</Grid>
                        <Grid item xs={1}>
                            <input type="text"
                                   placeholder={"oldFirstname"}

                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>Last Name</Grid>
                        <Grid item xs={1}>
                            <input type="text"
                                   placeholder={"oldFirstname"}

                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>Email</Grid>
                        <Grid item xs={1}>
                            <input type="text"
                                   placeholder={"oldFirstname"}

                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>Avatar</Grid>
                        <Grid item xs={1}>
                            <input type="file" id="myFile" name="filename"/>
                        </Grid>
                    </Grid>
                    <div>
                        <button>Save changes</button>
                    </div>
                </div>
                <div className="security">
                    <Grid container>
                        <Grid item xs={2}>Old pass</Grid>
                        <Grid item xs={1}>
                            <input type="password"
                                   placeholder={"oldFirstname"}

                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>New pass</Grid>
                        <Grid item xs={1}>
                            <input type="password"
                                   placeholder={"oldFirstname"}

                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>Retype</Grid>
                        <Grid item xs={1}>
                            <input type="password"
                                   placeholder={"oldFirstname"}

                            />
                        </Grid>
                    </Grid>
                    <div>
                        <button>Save changes</button>
                    </div>
                </div>
                <div className="blocking">
                    <p>List of blocked users</p>
                    <Block></Block>
                </div>
            </div>
        </div>
    );
}
export default Setting;