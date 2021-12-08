import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react';
import { useState, useEffect } from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import {logout} from "../../api/login";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import moment from "moment";
import StarIcon from "@material-ui/icons/Star";
import { getNotificationByUserId2 } from "../../api/notifications";
import { getCurrentUser } from '../../utils/auth';
import Notification from './Notification';

function NotificationsBox() {
    const [notifications, setNotifications] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(async () => {
        getNotificationByUserId2(getCurrentUser())
        .then(data => {
            setNotifications(data);
        }); 
    }, []);
    
    return (
        <div className={"NotificationBox"}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Notification">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <NotificationsIcon sx={{ width: 32, height: 32 }}/>
                    </IconButton>
                </Tooltip>
            </Box>
            <div>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                {notifications.map(notif => {
                    return (
                        <Notification
                            key={"Notif" + notif.id}
                            notif={notif}
                        />
                    )
                })}
                </Menu>
            </div>
        </div>
    )

}
export default NotificationsBox