import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideCategoryDeleteModal } from '../../../store/appearance';
import { Button, DialogActions } from '@mui/material';
import { deleteCategory } from '../../../store/category';

const ConfirmDeleteCategory = () => {
    const dispatch = useDispatch();
    const { categoryForDelete } = useSelector(state => state.categoryStore);
    const confirmDelete = () => {
        dispatch(deleteCategory(categoryForDelete._id));
        dispatch(hideCategoryDeleteModal());
    }
    return (
        <div>
            <h2>Confirm deleting {categoryForDelete.name}</h2>
            <h4>This will delete all products inside category without possibility to restore</h4>
            <DialogActions>
                <Button onClick={() => dispatch(hideCategoryDeleteModal())}>Cancel</Button>
                <Button onClick={confirmDelete}>Confirm</Button>
            </DialogActions>
        </div>
    );
};

export default ConfirmDeleteCategory;