import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import MainAdmin from './MainAdmin';
import { refresh } from '../../store/auth';
import Loader from '../Loader/Loader';

const AdminLayout = () => {
    const { auth, status } = useSelector(state => state.authStore);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !auth) {
            dispatch(refresh());
        }
    }, [dispatch, auth])
    return (
        <div style={{ marginTop: '80px' }}>
            {status === 'loading' && <Loader/>}
            {(status === 'fulfilled' || status === null) && auth ? <MainAdmin/> : <Navigate to={'/login'}/>}
        </div>
    );
};

export default AdminLayout;