import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../Header/tob2.png';
import { logout } from '../../../store/auth';
import { getAllCategories } from '../../../store/category';
import SearchBarAdmin from './SearchBarAdmin';
import './HeaderAdmin.css';

const HeaderAdmin = () => {
    const { user, auth, status } = useSelector(state => state.authStore);
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categoryStore);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div className={'header_wrapper'}>
            {
                (status === 'logout' || null) && <Navigate to={'/login'}/>
            }
            <div>
                <img src={logo} alt="logo" className={'logo'}/>
            </div>
            <nav className={'menu_wrapper'}>
                <ul>
                    <li><NavLink to={'/admin/orders'}>Orders</NavLink></li>
                    <li><NavLink to={'/admin/categories'}>Categories</NavLink></li>
                    <li><a href="#" className={'menu_parent'}>Products <i className={'arrow_right'}></i> </a>
                        <ul>
                            {categories &&
                                categories.map(cat => <div key={cat._id}><li><NavLink
                                    to={`category/${cat._id}`}>{cat.name}</NavLink></li></div>)
                            }
                        </ul>
                    </li>
                    <li><NavLink to={'/admin/slider'}>Slider</NavLink></li>
                    <li><NavLink to={'/admin/brands'}>Brands</NavLink></li>
                </ul>
            </nav>
            <div>
                <SearchBarAdmin/>
            </div>
            <div className={'avatar_wrapper'}>
                <div>{auth ? user : ''}</div>
                <Avatar>{user[0]}</Avatar>
                <div style={{ cursor: 'pointer' }}>
                    <LogoutIcon onClick={() => dispatch(logout())}/>
                </div>
            </div>
        </div>
    );
};

export default HeaderAdmin;