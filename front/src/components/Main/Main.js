import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Slider from '../Slider/Slider';
import { getNewProducts } from '../../store/product';
import ItemCard from '../ItemCard/ItemCard';
import './Main.css';

const Main = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewProducts());
    }, [dispatch]);

    const { newProducts } = useSelector(state => state.productStore);

    return (
        <>
            <Slider/>
            <div className={'content_container'}>
                <div>
                    <h2>{t('newestProducts')}</h2>
                </div>
                <div className={'items_slider'} style={{ width: '100%' }}>
                    <Swiper
                        autoHeight={true}
                        slidesPerView={4}
                        spaceBetween={10}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 5,
                            },
                            '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            '@1.00': {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            '@1.25': {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            '@1.50': {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                        }}
                        loop={true}
                        autoplay={{ delay: 4500, disableOnInteraction: false, }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className={'item_slider'}
                    >
                        {newProducts &&
                            newProducts.map((product, index) => <SwiperSlide key={index}>
                                <ItemCard product={product}/>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Main;