import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const UserIntro = (props) => {
    return (
        <div className="UserIntro">
            <div className="user">
                <div className="header">
                    <CardHeader className="avatar"
                        avatar={
                            <Avatar
                                alt={props.author}
                                src={props.image}
                            />
                        }
                    />
                </div>
                <div className="descrip">
                    <Typography variant="subtitle1">
                        <b>{props.author}</b>
                    </Typography>
                    <Typography className="text"
                        variant="subtitle2">
                        {props.description}
                    </Typography>
                </div>
            </div>
            <div className="follow">
                <Button sx={{
                    color: 'black',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderStyle: 'solid',
                    borderColor: 'rgba(117, 117, 117, 1)',
                    borderWidth: '1px',
                    borderRadius: '99em',
                    fontSize: '12px',
                    ":hover": {
                        backgroundColor: 'white',
                        color: 'rgba(8, 8, 8, 1)',
                        borderColor: 'rgba(41, 41, 41, 1)',
                        fontWeight: '400'
                    }
                }}
                    variant="contained" href={props.link}>
                    View
                </Button>
            </div>
        </div>
    );
}
export default UserIntro;