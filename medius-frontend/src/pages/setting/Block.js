import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { deleteUserRelation } from '../../api/users_users';

const Block = ({ user, unBlock }) => {

    return (
        <div className="UserIntro">
            <div className="user">
                <div className="header">
                    <CardHeader className="avatar"
                        avatar={
                            <Avatar
                                alt={user.first_name + " " + user.last_name}
                                src={user.avatar_path}
                            />
                        }
                    />
                </div>
                <div className="descrip">
                    <Typography variant="subtitle1">
                        <b>{user.first_name + " " + user.last_name}</b>
                    </Typography>
                </div>
            </div>
            <div className="follow">
                <Button sx={{
                    color: 'black',
                    backgroundColor: 'rgba(255, 0, 0, 1)',
                    borderStyle: 'solid',
                    borderColor: 'rgba(117, 117, 117, 1)',
                    borderWidth: '1px',
                    borderRadius: '99em',
                    fontSize: '12px',
                    ":hover": {
                        backgroundColor: 'green',
                        color: 'rgba(8, 8, 8, 1)',
                        borderColor: 'rgba(41, 41, 41, 1)',
                        fontWeight: '400'
                    }
                }}
                    variant="contained"
                    onClick={unBlock}>
                    Unblock
                </Button>
            </div>
        </div>
    );
}
export default Block;