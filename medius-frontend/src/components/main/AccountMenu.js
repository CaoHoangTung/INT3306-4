import { logout } from "../../api/login.js";
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Comment from '@mui/icons-material/Comment';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import ClassIcon from '@mui/icons-material/Class';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';

import { currentUserIsAdmin, getLocalCredential } from "../../utils/auth.js";
import { Link } from "react-router-dom";

export default function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }} src={props.user.avatar_path}/>
                    </IconButton>
                </Tooltip>
            </Box>
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
                <Link to="/my-profile" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem>
                        <Avatar src={props.user.avatar_path}/> My Profile
                    </MenuItem>
                </Link>


                {/* <MenuItem onClick={event => window.location.href = '/new-story'}>
                    <Avatar src={props.user.avatar_path}/> Write a story
                </MenuItem> */}
                <Link to="/new-story" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem>
                        <ListItemIcon>
                            <CreateIcon fontSize="small" />
                        </ListItemIcon>
                        Write a story
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={event => window.location.href = '/setting'}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                {currentUserIsAdmin() && (
                    <div>
                        <Link to="/admin/user" style={{ textDecoration: "none", color: "inherit" }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <ManageAccounts fontSize="small" />
                                </ListItemIcon>
                                Manage users
                            </MenuItem>
                        </Link>
                        <Link to="/admin/topic" style={{ textDecoration: "none", color: "inherit" }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <ClassIcon fontSize="small" />
                                </ListItemIcon>
                                Manage topics
                            </MenuItem>
                        </Link>
                        <Link to="/admin/post" style={{ textDecoration: "none", color: "inherit" }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArticleIcon fontSize="small" />
                                </ListItemIcon>
                                Manage posts
                            </MenuItem>
                        </Link>
                        <Link to="/admin/comment" style={{ textDecoration: "none", color: "inherit" }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <Comment fontSize="small" />
                                </ListItemIcon>
                                Manage comments
                            </MenuItem>
                        </Link>
                        <Divider />
                    </div>
                )}
                <MenuItem onClick={() => {
                    logout()
                        .then(() => {
                            window.location.href = "/";
                        });
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
