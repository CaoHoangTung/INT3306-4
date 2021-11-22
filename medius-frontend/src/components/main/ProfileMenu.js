import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from "../../api/login.js";
export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className = "ProfileMenu">
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src="https://miro.medium.com/fit/c/40/40/1*G9b0hCzMPHsV5Qj19d2gYA.jpeg"
                />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem >Write a story</MenuItem>
                <MenuItem >Profile</MenuItem>
                <MenuItem
                    onClick={() => {
                        logout();
                        window.location.href = "/";
                    }}
                >Sign out</MenuItem>
            </Menu>
        </div>
    );
}