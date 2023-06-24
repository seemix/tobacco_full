import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Parser } from 'html-to-react'
import { Button, Card } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

import { getProductById } from '../../store/product';
import { showPicture } from '../../services/show-picture.service';
import { showCart } from '../../store/appearance';
import { addProductToCart } from '../../store/order';
import { config } from '../../config/config';
import './ItemDetails.css';
import { useTranslation } from 'react-i18next';

const ItemDetails = () => {
    const { t } = useTranslation();
    const handleClick = () => {
        alert('clicl')
    }
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
    let img;
    if (singleProduct) img = `${config.BACKEND_URL}/product/image/${singleProduct.pictures[0]}`;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
                        <div><Swiper
                            style={{
                                width: '600px',
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {singleProduct.pictures.map(pic => <><SwiperSlide key={pic}>

                                <img onClick={handleClick} src={`${config.BACKEND_URL}/product/image/${pic}`}
                                     width={600}
                                     alt={'pic'}/> </SwiperSlide></>)}
                        </Swiper>
                        </div>
                        {/*<Box*/}
                        {/*    className={'image_box'}*/}
                        {/*    component={'img'}*/}
                        {/*    src={img}*/}
                        {/*    alt={singleProduct.name}*/}
                        {/*/>*/}
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
                                        Already in cart</Button>
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