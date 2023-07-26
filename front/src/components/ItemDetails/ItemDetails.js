import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Parser } from 'html-to-react'
import { Button, Card, Dialog } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getProductById } from '../../store/product';
import { showCart } from '../../store/appearance';
import { addProductToCart } from '../../store/order';
import { config } from '../../config/config';
import './ItemDetails.css';
import ShowPicture from './ShowPicture';

const ItemDetails = () => {
    const [bigPicture, setBigPicture] = useState(false);
    const { t } = useTranslation();
    const [showButton, setShowButton] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);
    const { singleProduct } = useSelector(state => state.productStore);
    const { products } = useSelector(state => state.orderStore);
    useEffect(() => {
        const inCart = products.findIndex(obj => obj.id === singleProduct.id);
        if (inCart !== -1) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [products, singleProduct]);

    const handleClose = (value) => {
        setBigPicture(value);
    };
    return (
        <div className={'main_container'}>
            {singleProduct &&
                <div>
                    <div className={'path'}>{t('products')} /
                        <Link
                            to={`../../category/${singleProduct.category._id}`}>  {singleProduct.category?.name} </Link>
                        / {singleProduct.name}
                    </div>
                    <Card className={'card_details'}>
                        <div style={{ maxWidth: '1000px' }}>
                            <Dialog open={bigPicture} onClose={() => setBigPicture(false)}>
                                <ShowPicture openWindow={handleClose} picture={singleProduct.picture}/>
                            </Dialog>
                                <div style={{cursor: 'pointer'}} onClick={() => setBigPicture(true)}>
                                <img width={400}
                                     alt={'pict'}
                                     src={`${config.BACKEND_URL}/product/image/${singleProduct.picture}`}
                                     onError={e => e.target.src = config.NO_IMAGE}
                                />
                                </div>
                        </div>
                        <div style={{ width: '360px', padding: '20px' }}>
                            <h3>
                                {singleProduct.name}
                            </h3>
                            <div className={'details_wrapper'}>
                                <div className={'price_wrapper'}>
                                    {(singleProduct.oldPrice) &&
                                        <span className={'old_price'}>{singleProduct.oldPrice} {config.CURRENCY}</span>
                                    }
                                    <span
                                        className={!singleProduct.oldPrice ? 'price standard_price' : 'price'}>
                                        {singleProduct.price} {config.CURRENCY}
                                </span>
                                    <div>{Parser().parse(singleProduct.description)}</div>

                                </div>
                                {!showButton && <>
                                    <Button variant={'contained'} fullWidth
                                            onClick={() => dispatch(addProductToCart({ count: 1, ...singleProduct }))}>
                                        <ShoppingCartIcon/> {t('addToCart')}
                                    </Button></>
                                }
                                {showButton &&
                                    <Button fullWidth onClick={() => dispatch(showCart())}><ShoppingCartCheckoutIcon/>
                                        {t('alreadyInCart')}</Button>
                                }
                            </div>
                            <Button style={{ marginTop: '20px' }} fullWidth
                                    onClick={() => navigate(`../../category/${singleProduct.category._id}`)}>
                                {t('backTo')} {singleProduct.category.name}</Button>
                        </div>
                    </Card>
                </div>
            }
        </div>
    );
};

export default ItemDetails;