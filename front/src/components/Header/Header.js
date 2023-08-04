import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Header.css';
import logo from './tob2.png'
import SearchBar from '../SearchBar/SearchBar';
import SearchIcon from './SearchIcon';
import CartIcon from './CartIcon';
import {
    closeMenu,
    hideSearchBar,
    openMenu, setFilteredLang,
    setLanguage,
    showCart,
    showSearchBar
} from '../../store/appearance';
import { getAllCategories } from '../../store/category';
import Cart from '../Cart/Cart';
import { useOutsideClick } from '../../hooks/outside-click';
import Loader from '../Loader/Loader';

const Header = () => {
    const { products } = useSelector(state => state.orderStore);
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);
    const {
        openedMenu,
        cart,
        showElement,
        filteredLang,
        searchBar
    } = useSelector(state => state.appearanceStore);
    const { categories, status } = useSelector(state => state.categoryStore);
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    useEffect(() => {
        dispatch(setFilteredLang(i18n.language));
    }, [i18n.language, dispatch]);
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);
    const handleClickOutside = () => {
        dispatch(closeMenu());
    }
    const searchOutside = () => {
        if (searchBar) dispatch(hideSearchBar());
    }
    const menuRef = useOutsideClick(handleClickOutside);
    const searchRef = useOutsideClick(searchOutside);

    const { t } = useTranslation();
    const changeLanguage = (language) => {
        dispatch(setLanguage(language));
        i18n.changeLanguage(language);
    }
    return (
        <div className={'header_wrapper'}>
            {status === 'loading' && <Loader/>}
            <Backdrop open={cart} onClick={() => dispatch(showCart())}/>
            <div className={'burger_icon'}>
                {
                    !openedMenu ? <MenuIcon onClick={() => dispatch(openMenu())} fontSize={'large'}
                                            className={'menu_icon'}/>
                        : <CloseIcon
                            onClick={() => dispatch(closeMenu())} fontSize={'large'}
                            className={'menu_icon'}/>

                }
            </div>
            <div>
                <img src={logo} alt="logo" className={'logo'}/>
            </div>
            <nav className={!openedMenu ? 'menu_wrapper' : 'menu_wrapper show_menu'}>
                <ul ref={menuRef}>
                    <li><NavLink to={'/'} onClick={() => dispatch(closeMenu())}>{t('home')}</NavLink></li>
                    <li><NavLink to={'/about'} onClick={() => dispatch(closeMenu())}>{t('aboutUs')}</NavLink></li>
                    <li><NavLink to={'/contacts'} onClick={() => dispatch(closeMenu())}>{t('contacts')}</NavLink></li>
                    <li><Link to={''} className={'menu_parent'}>{t('products')} <i className={'arrow_right'}></i>
                    </Link>
                        <ul>
                            {categories &&
                                categories.map(cat => <div key={cat._id}>
                                    <li><NavLink
                                        to={`category/${cat._id}`}>{cat.name}</NavLink></li>
                                </div>)
                            }
                        </ul>
                    </li>
                </ul>
            </nav>
            <nav id={'lang'} className={'menu_wrapper'} style={{ minWidth: '70px' }}>
                <ul>
                    <li>
                        <Link to={''} className={'menu_parent'}>{i18n.language} <i className={'arrow_right'}></i></Link>
                        <ul style={{ width: '80px' }}>
                            {
                                filteredLang.map(item => <li style={{ borderBottom: 0 }} key={item}>
                                    <Link to={''} onClick={() => changeLanguage(item)}>{item}</Link>
                                </li>)
                            }
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className={'icons_wrapper'}>
                <div onClick={() => dispatch(showCart())} style={{ cursor: 'pointer' }}>
                    <Badge badgeContent={products.length} color={'secondary'} style={{ top: '3px', zIndex: -1 }}>
                        <CartIcon size={2}/>
                    </Badge>
                </div>
                <div className={searchBar ? 'show_element' : 'hide_element'} ref={searchRef}><SearchBar
                    setShow={showElement}/></div>
                <div onClick={() => dispatch(showSearchBar())} className={!searchBar ? 'show_element' : 'hide_element'}>
                    <SearchIcon/>
                </div>
            </div>
            <Cart/>
        </div>
    );
};

export default Header;