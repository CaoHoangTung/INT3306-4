import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Topic = (props) => {
    return (
        <Button sx={{
            color: 'black',
            backgroundColor: 'rgba(242, 242, 242, 1)',
            ":hover" : {
                backgroundColor: 'rgba(41, 41, 41, 0.5)'       
            }
        }} variant="contained" href={props.link}>
            Tech
        </Button>
    );
}
export default Topic;
