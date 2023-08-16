import React, { useState } from 'react';
import { Button, Card, CardMedia } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Parser } from 'html-to-react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import './ProductCard.css';
import { deleteProduct, setProductForUpdate } from '../../../../store/product';
import { config } from '../../../../config/config';
import { showProductForm } from '../../../../store/product';

const ProductCard = ({ product }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();

    let img = config.NO_IMAGE;
    if(product.picture) img = `${config.BACKEND_URL}/product/image/${product.picture}`;
      const confirmedDelete = () => {
        dispatch(deleteProduct({_id: product._id, picture: product.picture}));
    }
    const editProduct = () => {
        dispatch(setProductForUpdate(product));
        dispatch(showProductForm());
    }
    return (
        <div className={'product_card_wrapper'}>
            <Card>
                <CardMedia
                    className={'gray_scale'}
                    component={'img'}
                    alt={product.picture}
                    width="150"
                    height={'120'}
                    image={img}
                    onError={e => e.target.src = config.NO_IMAGE}
                />
                <div className={'card_content'}>
                    <h4>{product.name}</h4>
                    <span> <small>{product.oldPrice} {config.CURRENCY}</small> {product.price} {config.CURRENCY}</span>
                    <h5>{product.brand?.name}</h5>
                    <small>
                        {Parser().parse(product.description)}
                    </small>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        {!confirmDelete && <>
                            <Button onClick={editProduct}><EditIcon/></Button>
                            <Button onClick={() => setConfirmDelete(true)}><DeleteForeverIcon/></Button>
                        </>}
                        {confirmDelete && <>
                            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button onClick={confirmedDelete}>Delete</Button>
                        </>}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductCard;