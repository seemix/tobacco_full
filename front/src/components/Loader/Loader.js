import React from 'react';

import loader from './6-dots-rotate.svg';
import './Loader.css';
const Loader = () => {
    return (
        <div className="loader_wrap">
            <div className="loader">
                <img src={loader} alt="loader"/>
            </div>
        </div>
    );
};

export default Loader;