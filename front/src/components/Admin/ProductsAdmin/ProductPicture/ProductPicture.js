import React, { useEffect, useState } from 'react';
import { Button, Card, CardMedia } from '@mui/material';
import { config } from '../../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import {

     deleteProductImage,
    resetConfirmDialog,
    setConfirmDialog,
    updateImage
} from '../../../../store/product';
import DeleteIcon from '@mui/icons-material/Delete';
import './ProductPicture.css';

const ProductPicture = ({ picture }) => {
    const { confirmDialog, newFile, productForUpdate } = useSelector(state => state.productStore);
    const [file, setFile] = useState();
    const [img, setImg] = useState(`${config.BACKEND_URL}/product/image/${picture}`);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        if (file) setImg(URL.createObjectURL(file));
    }, [file]);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
        dispatch(setConfirmDialog());
    }
    const handleRevert = () => {
        dispatch(resetConfirmDialog());
        setFile(null);
        setImg(`${config.BACKEND_URL}/product/image/${picture}`)
    }
    const saveImage = () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('productId', productForUpdate._id);
        formData.append('imageToUpdate', picture);
        dispatch(updateImage(formData));
        dispatch(resetConfirmDialog());
        setFile(null);
    }
    const handleDelete = () => {
       const data = {
            image: picture,
            productId: productForUpdate._id
        }
        dispatch(deleteProductImage(data));
    }
    return (
        <div style={{
            display: 'flex',
            columnGap: '15px',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        }}
             className={file ? 'active_replace' : ''}>
            <Card style={{ margin: '10px' }}>
                <CardMedia
                    component={'img'}
                    alt={picture}
                    width={'250'}
                    height={'120'}
                    image={img}/>
            </Card>
            <div style={{ width: 'auto' }}></div>
            {!confirmDialog && !newFile && !confirmDelete && <div>
                <Button fullWidth component="label">
                    replace
                    <input type="file"
                           accept="image/*"
                           hidden
                           onChange={handleChange}
                    />
                </Button>
                {!confirmDelete &&
                <div>
                    <Button onClick={() => setConfirmDelete(true)}><DeleteIcon/></Button>
                </div>
                }
            </div>}
            {confirmDelete && <>
                <Button onClick={() => () => setConfirmDelete(false)}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </>}
            {confirmDialog && file && <>
                <div><Button onClick={handleRevert}>Revert</Button></div>
                <Button onClick={saveImage}>Save</Button>
            </>}
        </div>
    );
};

export default ProductPicture;