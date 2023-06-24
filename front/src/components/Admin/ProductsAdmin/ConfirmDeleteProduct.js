import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideProductDeleteModal } from '../../../store/appearance';
import { deleteProduct } from '../../../store/product';

const ConfirmDeleteProduct = () => {
    const dispatch = useDispatch();
    const { productForDelete } = useSelector(state => state.productStore);
    const confirmDelete = () => {
        dispatch(hideProductDeleteModal());
    }
    return (
        <div>
            <h3>Confirm deleting {productForDelete.name}</h3>
            <DialogActions>
                <Button onClick={() => dispatch(hideProductDeleteModal())}>Cancel</Button>
                <Button onClick={confirmDelete}>Confirm</Button>
            </DialogActions>
        </div>
    );
};

export default ConfirmDeleteProduct;