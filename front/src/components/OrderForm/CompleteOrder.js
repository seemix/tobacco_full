import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { config } from '../../config/config';
import { Card } from '@mui/material';
import { setCompeteOrder } from '../../store/order';

const CompleteOrder = () => {
    const { t } = useTranslation();
    const { createdOrder, freeShipping } = useSelector(state => state.orderStore);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCompeteOrder());
    }, []);
    return (
        <div className={'main_container'}>
            <h2>{t('dear')} {createdOrder.customerName}, {t('completeOrder')}</h2>
            <Card style={{ margin: '20px', padding: '20px' }}>
                {
                    createdOrder.products.map(item => <div key={item._id}>
                        <div><i>🔸 {item.name} x {item.count}</i></div>
                        <p style={{ textAlign: 'right' }}>{item.price * item.count} {config.CURRENCY}</p>
                    </div>)
                }
                {!freeShipping && <p>{t('shipping')} {config.SHIPPING_COST} {config.CURRENCY}</p>}
                <hr/>
                <p style={{ textAlign: 'right' }}>
                    <big>💰 {t('total')}: {!freeShipping ? createdOrder.total + config.SHIPPING_COST : createdOrder.total} {config.CURRENCY}</big>
                </p>
            </Card>
            <h4 style={{ textAlign: 'center' }}>{t('phoneDetails')} </h4> <h3>+999 222 5522</h3>
        </div>
    );
};

export default CompleteOrder;