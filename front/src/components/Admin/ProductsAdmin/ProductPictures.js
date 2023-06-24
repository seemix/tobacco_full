import React from 'react';
import { Button, Card, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ProductPicture from './ProductPicture/ProductPicture';
import {
    addImage,
    resetConfirmDelete,
    resetConfirmDialog,
    resetNewFile,
    setNewFile,
} from '../../../store/product';
import { hideProductForm } from '../../../store/appearance';

const ProductPictures = () => {
    const { pictures } = useSelector(state => state.productStore.productForUpdate);
    const { newFile, confirmDialog, productForUpdate } = useSelector(state => state.productStore);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setNewFile(null));
        dispatch(resetConfirmDialog());
        dispatch(hideProductForm());
        dispatch(resetConfirmDelete());
        dispatch(resetConfirmDialog());
    }
    const handleFileChange = (e) => {
        dispatch(setNewFile(e.target.files[0]));
    }
    const saveNew = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', newFile);
        formData.append('productId', productForUpdate._id);
        dispatch(addImage(formData));
    }
    return (
        <div>
            <h3>ProductPictures</h3>
            {pictures && pictures.map((picture, index) =>
                <div key={index}>
                    <ProductPicture
                        type={'object'} index={index} picture={picture}/></div>)
            }
            <form onSubmit={saveNew}>
                        {
                newFile && <div style={{ display: 'flex', padding: '10px', backgroundColor: 'rgb(177, 247, 161)' }}>
                    <Card style={{ margin: '10px' }}>
                        <CardMedia
                            component={'img'}
                            alt={'newFile'}
                            width={'200'}
                            height={'120'}
                            image={URL.createObjectURL(newFile)}/>
                    </Card>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={() => dispatch(resetNewFile())}>Delete</Button>
                        <Button type={'submit'}>Save</Button>
                    </div>
                </div>
            }
            {!newFile && !confirmDialog &&
                <Button fullWidth component={'label'}>
                    <input type={'file'}
                           accept={'image/*'}
                           hidden
                           onChange={handleFileChange}
                    />
                    Add picture
                </Button>
            }
            </form>
            <Button fullWidth onClick={handleClose}>Close</Button>
        </div>
    );
};

export default ProductPictures;