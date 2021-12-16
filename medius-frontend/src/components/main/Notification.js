import React from 'react';
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { Link } from '@mui/material';
import { updateNotification } from '../../api/notifications';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_1_detail : this.props.notif.user_1_detail,
    }

  }

  handleClick = async () => {
    var new_notif = {
      notification_id: this.props.notif.notification_id,
      is_seen: true
    }
    await updateNotification(new_notif);
  };


  render() {
    const notif = this.props.notif;
    const user_1_detail = this.state.user_1_detail;
    const user_1_name = user_1_detail.first_name + " " + user_1_detail.last_name;
    var text = "";
    var link = "";
    if (notif.type === "FOLLOW") {
      text = user_1_name + " is following you";
      link = `/profile/${notif.user_id_1}`;
    } else if (notif.type === "UPVOTE") {
      text = user_1_name + " upvoted your's post";
      link = `/post/${notif.post_id}`
    } else if (notif.type === "DOWNVOTE") {
      text = user_1_name + " downvoted your's post";
      link = `/post/${notif.post_id}`
    } else if (notif.type === "COMMENT") {
      text = user_1_name + " commented on your's post";
      link = `/post/${notif.post_id}`
    }
    
    return (
        <Link 
          href={link} 
          color="inherit" 
          underline="none"
          onClick={this.handleClick}
        >
          <div className="notificationContent">
            <div className="left">
                <div>
                  <Avatar
                      src={user_1_detail?.avatar_path}
                  />
                </div>
                <p>{text}</p>
            </div>
            <div className="time">
                {moment(new Date(notif.created_at)).add(7, 'h').fromNow()}
            </div>
        </div>
      </Link>
      )
  }
}

export default Notification;