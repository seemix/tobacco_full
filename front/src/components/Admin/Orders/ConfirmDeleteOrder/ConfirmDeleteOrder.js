import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideOrderDeleteModal } from '../../../../store/appearance';
import { deleteOrderById} from '../../../../store/order';

const ConfirmDeleteOrder = () => {
    const { orderForDelete } = useSelector(state => state.orderStore);
    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(hideOrderDeleteModal());
    }
    const handleConfirm = () => {
        dispatch(deleteOrderById(orderForDelete._id));
        dispatch(hideOrderDeleteModal());
    }
   return (
        <div>
            <h2>Do you confirm deleting all information about order
                from {orderForDelete.customerName} {orderForDelete.customerSurname}?</h2>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </div>
    );
};

export default ConfirmDeleteOrder;