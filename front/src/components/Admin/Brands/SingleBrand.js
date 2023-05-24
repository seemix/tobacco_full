import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import { deleteBrandById } from '../../../store/brand';

const SingleBrand = ({ brand }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const deleteItem = (_id) => {
        dispatch(deleteBrandById(_id));
    }
    return (
        <>
            <TableRow key={brand._id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell style={{ width: '200px' }}>
                    {!confirmDelete && <Button onClick={() => setConfirmDelete(true)}><DeleteIcon/></Button>}
                    {confirmDelete && <>
                        <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                        <Button onClick={() => deleteItem(brand._id)}>Confirm</Button>
                    </>}
                </TableCell>
            </TableRow>
        </>
    );
};

export default SingleBrand;