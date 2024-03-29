import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { hideCart, showCart } from '../../store/appearance';
import CartItem from '../CartItem/CartItem';
import { removeAllItems } from '../../store/order';
import CartIcon from '../Header/CartIcon';
import { config } from '../../config/config';
import './Cart.css';

const Cart = () => {
    const { t } = useTranslation();
    const { cart } = useSelector(state => state.appearanceStore);
    const { products, total, freeShipping } = useSelector(state => state.orderStore);
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
                <div className={'items_wrapper'} style={{ flexDirection: 'column' }}>
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
                            <span style={{ marginTop: '5px' }}>{t('removeAll')}?</span>
                            <Button onClick={() => setEmptyCart(false)}>{t('cancel')}</Button>
                            <Button onClick={confirmEmptyCart}>{t('confirmDelete')}</Button>
                        </>}
                    </div>

                </div>
                {products.length > 0 &&
                    <div className="remove_all_wrapper" style={{ paddingBottom: '10px' }}>
                        <LocalShippingIcon/><h4>{t('shipping')} <span
                        className={freeShipping ? 'over_lined' : ''}> {config.SHIPPING_COST} {config.CURRENCY} </span>
                    </h4>
                        {freeShipping ? <h4>FREE</h4> : <i>{t('freeAfter')} {config.FREE_SHIPPING_COST} {config.CURRENCY}</i>}
                    </div>
                }
            </div>

            <div className={'bottom_wrapper'}>
                <div className={'total_wrapper'}>
                    {products.length > 0 &&
                        <span className={'total_price'}>
                            {t('totalPrice')}: <span
                            className={'price'}>{freeShipping ? total : total + config.SHIPPING_COST} {config.CURRENCY}</span>
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
    );
};

export default Cart;