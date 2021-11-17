import * as React from 'react';
import Button from '@mui/material/Button';

const Topic = ({topic, link}) => {
    return (
        <Button sx={{
            color: 'black',
            backgroundColor: 'rgba(242, 242, 242, 1)',
            ":hover" : {
                backgroundColor: 'rgba(41, 41, 41, 0.5)'       
            }
        }} variant="contained" href={link}>
            {topic}
        </Button>
    );
}
export default Topic;
