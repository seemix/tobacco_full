import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { closeSlideDelete, deleteSlide } from '../../../store/slider';

const ConfirmDeleteSlide = () => {
    const dispatch = useDispatch();
    const { slideForDelete } = useSelector(state => state.sliderStore);
    const confirmDelete = () => {
        dispatch(deleteSlide(slideForDelete._id));
        dispatch(closeSlideDelete());
    }
    return (
        <div>
            <h2>Confirm delete slide</h2>
            <DialogActions>
                <Button onClick={() => dispatch(closeSlideDelete())}>Cancel</Button>
                <Button onClick={confirmDelete}>Confirm</Button>
            </DialogActions>
        </div>
    );
};

export default ConfirmDeleteSlide;