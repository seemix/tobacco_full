import React, { useEffect } from 'react';
import { config } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mui/material';
import { setCompeteOrder } from '../../store/order';

const CompleteOrder = () => {
    const { createdOrder } = useSelector(state => state.orderStore);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCompeteOrder());
    }, []);
    return (
        <div className={'main_container'}>
            <h2>Dear {createdOrder.customerName}, your order is complete</h2>
            <Card style={{ margin: '20px', padding: '20px' }}>
                {
                    createdOrder.products.map(item => <div key={item._id}>
                        <div><i>🔸 {item.name} x {item.count}</i></div>
                        <p style={{ textAlign: 'right' }}>{item.price * item.count} {config.CURRENCY}</p>
                    </div>)
                }
                <hr/>
                <p style={{ textAlign: 'right' }}><big>💰 Total: {createdOrder.total} {config.CURRENCY}</big></p>
            </Card>
            <h3>If you have any questions, please call +999 222 5522</h3>
        </div>
    );
};

export default CompleteOrder;