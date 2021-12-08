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
import { getUser } from '../../api/users';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_1_name : getUser(this.props.notif.user_id_1).first_name,
      
    }
  }

  render() {
    const notif = this.props.notif;
    return (
        <div className="notificationContent">
          <div className="left">
              <div>
                  <Avatar/>
              </div>
              <p>USER_ID {notif.user_id_1} {notif.type} YOU</p>
          </div>
          <div className="time">
              {moment(new Date(notif.created_at), "YYYY-MM-DD").fromNow()}
          </div>
      </div>
      )
  }
}

export default Notification;