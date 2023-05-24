import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Reorder } from 'framer-motion';
import { Button, Dialog, DialogContent } from '@mui/material';

import Slide from './Slide';
import { getAllSlides, openSlideEdit, saveSlidesOrder, sliderReorder } from '../../../store/slider';
import SlideEditForm from './SlideEditForm/SlideEditForm';
import ConfirmDeleteSlide from './ConfirmDeleteSlide';

const SliderAdmin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSlides());
    }, []);
    const { slides, saveOrderButton, slideEditModal, slideDeleteModal } = useSelector(state => state.sliderStore);
    const reOrder = (newOrder) => {
        dispatch(sliderReorder(newOrder));
    };
    return (
        <div>
            <h2>Slider</h2>
            <h2><Button onClick={() => dispatch(openSlideEdit())}>+ Add new slide</Button></h2>
            <Dialog open={slideEditModal} maxWidth={'xs'}>
                <DialogContent style={{ borderRadius: 0 }}>
                    <SlideEditForm/>
                </DialogContent>

            </Dialog>
            <Dialog open={slideDeleteModal} maxWidth={'xs'}>
                <DialogContent>
                    <ConfirmDeleteSlide/>
                </DialogContent>
            </Dialog>
            <h2> {saveOrderButton &&
                <Button onClick={() => dispatch(saveSlidesOrder(slides))} color={'success'}>
                    Save order</Button>}</h2>
            <Reorder.Group onReorder={(newOrder) => reOrder(newOrder)} values={slides} as={'ul'}>
                {slides &&
                    slides.map(slide => <Reorder.Item value={slide} key={slide._id} whileDrag={{ scale: 1.03 }}>
                        <Slide slide={slide}/>
                    </Reorder.Item>)
                }
            </Reorder.Group>
        </div>
    );
};

export default SliderAdmin;