import React, { useEffect, useState } from 'react';
import { Button, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './ItemCard.css';
import { showPicture } from '../../services/show-picture.service';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../store/order';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { showCart } from '../../store/appearance';
import { config } from '../../config/config';

const ItemCard = ({ product }) => {
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.orderStore);
    useEffect(() => {
        const inCart = products.findIndex(obj => obj._id === product._id);
        if (inCart !== -1) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [products, product._id]);
    const img = showPicture(product);
    return (
        <div className={'card_wrapper'}>
            <Card style={{ height: '410px', position: 'relative' }}>
                <CardMedia
                    className={'gray_scale'}
                    component={'img'}
                    alt={product.picture}
                    width="300"
                    height={'180'}
                    image={img}
                />

                <div className={'card_content'}>
                    {product?.brand?.name &&
                        <div className={'brand_label'}>
                            {product.brand.name}
                        </div>
                    }

                    <div style={{ minHeight: '3em' }}><h3>{product.name}</h3></div>
                    <div className={'price_wrapper'}>
                        {product.oldPrice &&
                            <span className={'old_price'}>{product.oldPrice} {config.CURRENCY}</span>
                        }
                        <span
                            className={!product.oldPrice ? 'price standard_price' : 'price'}>{product.price} {config.CURRENCY}
                        </span>
                    </div>
                    <Link to={`/product/${product._id}`}>
                        <Button variant={'outlined'} fullWidth>Read more</Button>
                    </Link>
                    {!showButton && <>
                        <Button variant={'contained'}
                                onClick={() => dispatch(addProductToCart({ count: 1, ...product }))}>
                            <ShoppingCartIcon/> Add to cart</Button>
                    </>}
                    {showButton &&
                        <Button fullWidth onClick={() => dispatch(showCart())}><ShoppingCartCheckoutIcon/>
                            Already in cart</Button>}
                </div>
            </Card>
        </div>
    );
};

export default ItemCard;