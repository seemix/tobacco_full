import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Slider.css';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSlides } from '../../store/slider';
import { config } from '../../config/config';

const Slider = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSlides());
    }, []);
    const { slides } = useSelector(state => state.sliderStore);
    return (
        <div className={'slider_container'}>
            <Swiper
                speed={1400}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                className={'slider_container'}
                loop={true}
            >
                {slides.length > 0 &&
                    slides.map(slide =>
                        <SwiperSlide key={slide._id}>
                            <div style={{ backgroundImage: `url(${config.BACKEND_URL}/slider/${slide.slide})` }}
                                 className={'pic'}> {slide.text && <div className={'slide_text'}>{slide.text}</div> }</div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default Slider;