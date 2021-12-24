import MainNavBar from "../../components/main/MainNavBar";
import { Avatar, Button, Container, Grid, IconButton, Input } from "@mui/material";
import Block from "./Block";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../../api/users";
import { getLocalCredential } from "../../utils/auth";
import { deleteUserRelation, getUsersIsBlockedByUserId } from "../../api/users_users";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { uploadFile } from "../../api/file";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import TopicSelector from "../../components/editor/TopicSelector";
import { getAllTopics } from "../../api/topic";
import { createUserTopic, deleteUserTopic, getUserTopicByUserId } from "../../api/users_topics";

function Setting(props) {
    const [profile, setProfile] = useState({})
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [topicOptions, setTopicOptions] = useState([]);
    const [selectedTopicOptionsId, setSelectedTopicOptionsId] = useState([]);
    const [originalSelectedTopicOptionsId, setOriginalSelectedTopicOptionsId] = useState([]);

    const fetchUser = async () => {
        return getUser(getLocalCredential().user_id)
            .then(data => {
                delete data["password_hash"];
                setProfile(data)
            })
            .catch(err => console.error(err));
    }

    const fetchBlockedUsers = async () => {
        return getUsersIsBlockedByUserId(getLocalCredential().user_id)
            .then(data => {
                setBlockedUsers(data);
            })
    }

    const handleSelectImage = (e) => {
        return uploadFile(e.target.files[0])
            .then(response => {
                console.log(response);
                setProfile({ ...profile, avatar_path: response.url })
            }).catch(err => {
                console.error(err);
            });
    }

    const handleSaveInfo = () => {
        updateUser(profile)
            .then(data => {
                console.log(data);
                NotificationManager.success('Information saved', 'Success', 3000);
            }).catch(err => {
                console.error(err);
                NotificationManager.error('Error', 'Error', 3000);
            });
    }

    useEffect(() => {
        console.log(selectedTopicOptionsId);
        console.log(originalSelectedTopicOptionsId);

        const promises = []

        for (let topicId of selectedTopicOptionsId) {
            if (originalSelectedTopicOptionsId.indexOf(topicId) === -1) {
                let p1 = createUserTopic({
                    user_id: getLocalCredential().user_id,
                    topic_id: topicId
                });
                promises.push(p1);
            }
        }
        for (let topicId of originalSelectedTopicOptionsId) {
            if (selectedTopicOptionsId.indexOf(topicId) === -1) {
                let p2 = deleteUserTopic(getLocalCredential().user_id, topicId);
                promises.push(p2);
            }
        }
        Promise.all(promises).then(() => {
            setOriginalSelectedTopicOptionsId(selectedTopicOptionsId);
        })
    }, [selectedTopicOptionsId]);

    useEffect(() => {
        fetchUser();
        fetchBlockedUsers();

        getUserTopicByUserId(getLocalCredential().user_id)
            .then(data => {
                setSelectedTopicOptionsId(data.map(topic => topic.topic_id))
                setOriginalSelectedTopicOptionsId(data.map(topic => topic.topic_id))
            }).then(() => {
                getAllTopics()
                    .then(topics => {
                        setTopicOptions(topics);
                    });
            })
    }, []);

    return (
        <div className="setting">
            <MainNavBar />
            <Container>
                <div className="content">
                    <div className="aboutYou">
                        <h3>Information</h3>
                        <Grid container>
                            <Grid item xs={12} md={2}>
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleSelectImage}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture"
                                        component="span">
                                        <Avatar src={profile.avatar_path} style={{ width: "100%", height: "100%" }} />
                                    </IconButton>
                                </label>
                            </Grid>
                            <Grid item xs={12} md={10} style={{ padding: "20px" }}>
                                <Grid container>
                                    <Grid item xs={2}>First Name</Grid>
                                    <Grid item xs={1}>
                                        <Input type="text"
                                            placeholder={"oldFirstname"}
                                            value={profile.first_name}
                                            onChange={(e) => { setProfile({ ...profile, first_name: e.target.value }) }}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container>
                                    <Grid item xs={2}>Last Name</Grid>
                                    <Grid item xs={1}>
                                        <Input type="text"
                                            placeholder={"oldFirstname"}
                                            value={profile.last_name}
                                            onChange={(e) => { setProfile({ ...profile, last_name: e.target.value }) }}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container>
                                    <Grid item xs={2}>Email</Grid>
                                    <Grid item xs={1}>
                                        <span>{profile.email}</span>
                                    </Grid>
                                </Grid>
                                <br />
                                <Button onClick={handleSaveInfo}>Save changes</Button>
                            </Grid>
                        </Grid>
                        <br />

                    </div>
                    <div className="mytopic">
                        <h3>My topic</h3>
                        <Grid container>
                            <TopicSelector
                                topicOptions={topicOptions}
                                selectedTopicOptionsId={selectedTopicOptionsId}
                                setSelectedTopicOptionsId={setSelectedTopicOptionsId}
                            />
                        </Grid>
                    </div>
                    <div className="security">
                        <h3>Security</h3>
                        <Grid container>
                            <Link to={`/passwordforgot?email=${profile.email}`}>
                                <Button>Change password</Button>
                            </Link>
                        </Grid>
                    </div>
                    <div className="blocking">
                        <h3>Blocked users</h3>
                        {blockedUsers.map(user => (
                            <Block
                                user={user.user_detail}
                                unBlock={() => {
                                    deleteUserRelation(user?.user_id_1, user?.user_id_2)
                                        .then(() => {
                                            fetchBlockedUsers();
                                        })
                                }}
                            ></Block>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default Setting;