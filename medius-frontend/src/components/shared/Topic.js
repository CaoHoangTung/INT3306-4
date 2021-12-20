import * as React from 'react';
import Button from '@mui/material/Button';
import '../../pages/main/Main.scss';
import { Link } from "react-router-dom";

const Topic = ({ topicId, topicName }) => {
    const link = `/topic/${topicId}`;

    return (
        <Button sx={{
            ":hover": {
                backgroundColor: 'rgba(230,230,230)',
            },
            backgroundColor: 'rgba(242, 242, 242, 1)',
            borderRadius: '100px',
            margin: '5px',
            color: 'black',
            border: 'none',
            outline: 'none',
        }}
            variant="contained" href={link}>
            {topicName}
        </Button>
        // <Link to ={link}>
        // <div className="TopicContainer" >
        //     {topicName}
        // </div>
        // </Link>
    );
}
export default Topic;
