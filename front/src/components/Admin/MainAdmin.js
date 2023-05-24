import React from 'react';
import { Outlet } from 'react-router-dom';

import '../Header/Header.css';
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