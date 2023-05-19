import React from 'react';
import { Button, Card, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import './CartItem.css';
import { config } from '../../config/config';
import { showPicture } from '../../services/show-picture.service';
import { incrementCount, reduceCount, removeItem } from '../../store/order';

const CartItem = ({ product }) => {
    const dispatch = useDispatch();
    let img;
    if (product) img = showPicture(product);
    return (
        <div>
            <Card className={'cart_card'}>
                <div className={'center_text'}>
                    <h4>{product.name}</h4>
                </div>
                <div className={'cart_item_wrapper'}>
                    <div>
                        <div className={'cart_item_wrapper_im'}  style={{ backgroundImage: `url(${img})`}}></div>
                    </div>
                    <div className={'price_count_wrapper'}>
                        <div className={'center_text'}>
                            <big><b>{product.price * product.count} {config.CURRENCY}</b></big></div>
                        <div>
                            <Button onClick={() => dispatch(reduceCount(product))}><big>-</big></Button>
                            <TextField size={'small'} style={{ width: '44px' }}
                                       className={'TextField-without-border-radius'} value={product.count || 1}/>
                            <Button onClick={() => dispatch(incrementCount(product))}><big>+</big></Button>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <Button fullWidth onClick={() => dispatch(removeItem(product))}>remove</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CartItem;