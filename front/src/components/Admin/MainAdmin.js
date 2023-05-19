import React from 'react';

import '../Header/Header.css';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';

const MainAdmin = () => {
    return (
        <>
            <HeaderAdmin/>
            <Outlet/>
        </>
    )
};
export default MainAdmin;