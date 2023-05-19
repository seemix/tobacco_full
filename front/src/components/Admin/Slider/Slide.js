import React from 'react';
import { Button, Card } from '@mui/material';
import './Slide.css'
import { config } from '../../../config/config';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { openSlideDelete, openSlideEdit, setSlideForDelete, setSlideForUpdate } from '../../../store/slider';

const Slide = ({ slide }) => {
    const dispatch = useDispatch();
    const slideEdit = (slide) => {
        dispatch(setSlideForUpdate(slide));
        dispatch(openSlideEdit(true));
    }
    const setDelete = () => {
        dispatch(setSlideForDelete(slide));
        dispatch(openSlideDelete());
    }
    return (
        <div className={'single_cat_wrapper'}>
            <Card style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                <div className={'slider_picture'}
                     style={{ backgroundImage: `url(${config.BACKEND_URL}/slider/${slide.slide})` }}>
                </div>
                <div>
                    <Button onClick={() => slideEdit(slide)}><EditIcon/></Button>
                </div>
                <div>
                    <Button onClick={setDelete}><DeleteForeverIcon/></Button>
                </div>
            </Card>
        </div>

    )
};

export default Slide;