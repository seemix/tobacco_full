import React from 'react';
import { Outlet } from 'react-router-dom';


import './Layout.css';
import { Footer, Header } from '../index';
const Layout = () => {
    return (
        <div className={'page_wrapper'}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;