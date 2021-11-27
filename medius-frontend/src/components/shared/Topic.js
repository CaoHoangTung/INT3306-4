import * as React from 'react';
import Button from '@mui/material/Button';

const Topic = ({topic, link}) => {
    return (
        <Button sx={{
            ":hover" : {
                backgroundColor: 'rgba(230,230,230)', 
            },
            backgroundColor: 'rgba(242, 242, 242, 1)',
            borderRadius: '100px',
            margin: '5px',
            padding: '8px 16px',
            color: 'black'
        }} variant="contained" href={link}>
            {topic}
        </Button>
            
    );
}
export default Topic;
