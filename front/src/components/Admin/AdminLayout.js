import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { refresh } from '../../store/auth';
import { Loader, MainAdmin } from '../index';

const AdminLayout = () => {
    const { auth, status } = useSelector(state => state.authStore);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token && !auth) {
            dispatch(refresh());
        }
    }, [token]);

    return (
        <div style={{ marginTop: '80px' }}>
            {status === 'loading' && <Loader/>}
            {(status === 'fulfilled' || status === null) && auth ? <MainAdmin/> : <Navigate to={'/login'}/>}
        </div>
    );
};

export default AdminLayout;