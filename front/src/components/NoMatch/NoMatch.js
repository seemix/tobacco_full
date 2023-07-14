import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div style={{marginTop: '100px'}}>
            <h2>Not found</h2>
            <h2><Link to={'/'}><Button>Back To the homepage</Button></Link></h2>
        </div>
    );
};

export default NoMatch;