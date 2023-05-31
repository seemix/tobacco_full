import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import './Cart.css';
import { hideCart, showCart } from '../../store/appearance';
import CartItem from '../CartItem/CartItem';
import { removeAllItems } from '../../store/order';
import CartIcon from '../Header/CartIcon';
import { config } from '../../config/config';

const Cart = () => {
    const { t } = useTranslation();
    const { cart } = useSelector(state => state.appearanceStore);
    const { products, total } = useSelector(state => state.orderStore);
    const dispatch = useDispatch();
    const [emptyCart, setEmptyCart] = useState(false);
    const confirmEmptyCart = () => {
        dispatch(removeAllItems());
        setEmptyCart(false);
    }
    return (
        <div className={cart ? 'cart_wrapper show_cart' : 'cart_wrapper'}>
            <div style={{ cursor: 'pointer' }} onClick={() => dispatch(hideCart())}>
                <CloseIcon fontSize={'large'} className={'close_icon'}/>
            </div>
            <div className={'inside_wrapper_cart'}>
                <h3>{t('shoppingCart')}</h3>
                <div className={'items_wrapper'}>
                    {
                        products.length === 0 &&
                        <div className={'empty_wrapper'}>
                            <div><h2>{t('emptyCart')}</h2></div>
                            <div className={'empty_cart'}>
                                <CartIcon size={8}/>
                                <div className={'empty_cart_overlay'}></div>
                            </div>
                        </div>
                    }
                    {
                        products.map(item => <CartItem key={item._id} product={item}/>)
                    }
                    <div className={'remove_all_wrapper'}>
                        {products.length > 0 && !emptyCart &&
                        <Button fullWidth onClick={() => setEmptyCart(true)}>{t('removeAll')}</Button>
                    }
                        {emptyCart && <>
                            <span style={{marginTop: '5px'}}>{t('removeAll')}?</span>
                            <Button onClick={() => setEmptyCart(false)}>{t('cancel')}</Button>
                            <Button onClick={confirmEmptyCart}>{t('confirmDelete')}</Button>
                        </>}
                    </div>
                </div>
            </div>
            <div className={'bottom_wrapper'}>
                <div className={'total_wrapper'}>
                    {products.length > 0 &&
                        <span className={'total_price'}>
                            {t('totalPrice')}: <span className={'price'}>{total} {config.CURRENCY}</span>
                        </span>
                    }
                </div>
                <div style={{ margin: '0 auto' }}>
                    {products.length === 0 &&
                        <Button variant={'contained'} fullWidth onClick={() => dispatch(showCart())}>
                            {t('backToShop')}</Button>
                    }
                    {products.length > 0 &&
                        <>
                            <Link to={'checkout'} onClick={() => dispatch(showCart())}>
                                <Button variant={'contained'} style={{ padding: '5px 50px' }}>
                                    {t('checkout')}
                                </Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
};

export default Cart;