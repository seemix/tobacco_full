import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';
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