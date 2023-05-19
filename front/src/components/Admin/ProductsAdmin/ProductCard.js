import React from 'react';
import { Button, Card, CardMedia, Dialog, DialogContent } from '@mui/material';
import { Parser } from 'html-to-react'

import './ProductCard.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { setProductForDelete, setProductForUpdate } from '../../../store/product';
import {
    hideProductDeleteModal,
    showProductDeleteModal,
    showProductForm
} from '../../../store/appearance';
import ConfirmDeleteProduct from './ConfirmDeleteProduct';
import { showPicture } from '../../../services/show-picture.service';
import { config } from '../../../config/config';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const img = showPicture(product);
    const deleteProduct = () => {
        dispatch(setProductForDelete(product));
        dispatch(showProductDeleteModal());
    }
    const editProduct = () => {
        dispatch(setProductForUpdate(product));
        dispatch(showProductForm(product.category));
    }
    const { productDeleteModal } = useSelector(state => state.appearanceStore);
    return (
        <div className={'product_card_wrapper'}>
            <Dialog
                maxWidth={'xs'}
                open={productDeleteModal}
                onClose={() => dispatch(hideProductDeleteModal())}
            >
                <DialogContent style={{ borderRadius: 0 }}>
                    <ConfirmDeleteProduct/>
                </DialogContent>
            </Dialog>
            <Card>
                <CardMedia
                    className={'gray_scale'}
                    component={'img'}
                    alt={product.picture}
                    width="150"
                    height={'120'}
                    image={img}
                />
                <div className={'card_content'}>
                    <h4>{product.name}</h4>
                    <span> <small>{product.oldPrice} {config.CURRENCY}</small> {product.price} {config.CURRENCY}</span>
                    <h5>{product.brand?.name}</h5>
                    <small>
                        {Parser().parse(product.description)}
                    </small>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button onClick={editProduct}><EditIcon/></Button>
                        <Button onClick={deleteProduct}><DeleteForeverIcon/></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductCard;