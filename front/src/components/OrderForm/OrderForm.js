import React from 'react';
import { Button, Card, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';

import { config } from '../../config/config';
import { showCart } from '../../store/appearance';
import { createOrder } from '../../store/order';
import { orderFormValidator } from '../../validators/order-form.validator';
import './OrderForm.css';

const OrderForm = () => {
    const { t } = useTranslation();
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: joiResolver(orderFormValidator) });
    const { products, total, status } = useSelector(state => state.orderStore);

    const dispatch = useDispatch();
    const { freeShipping } = useSelector(state => state.orderStore);
    const handleForm = (data) => {
        const orderedProducts = products.map(item => {
            return { product: item._id, count: item.count }
        });
        const newOrder = { ...data, products: orderedProducts, total: total, freeShipping }
        dispatch(createOrder(newOrder));
    }
    return (
        <div className={'main_container'}>
            {status === 'fulfilled' && <Navigate to={'../completed'}/>}
            <h2>{t('checkoutYourOrder')}</h2>
            <div className={'checkout_wrap'}>
                <div>
                    <Card className={'checkout_card'}>
                        <h3>{t('yourOrder')}</h3>
                        {
                            products.map(item => <div key={item._id}>
                                <div><i>{item.name} x {item.count}</i></div>
                                <p style={{ textAlign: 'right' }}>{item.price * item.count} {config.CURRENCY}</p>
                            </div>)
                        }
                        <p>{t('shipping')} : {!freeShipping ? config.SHIPPING_COST + ' ' + config.CURRENCY : 'Free'}</p>
                        <div style={{ borderTop: '1px solid gray' }}>
                            <p style={{ textAlign: 'center' }}>
                                <big><b>{t('total')}: {!freeShipping ? total + config.SHIPPING_COST : total} {config.CURRENCY}</b></big>
                            </p>
                        </div>
                    </Card>
                    <Button fullWidth onClick={() => dispatch(showCart())}>{t('editOrder')}</Button>
                </div>
                <div style={{ maxWidth: '300px' }}>
                    <h3 style={{ marginBottom: '20px' }}>{t('fillFormToFinish')}</h3>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <div className={'checkout_form_wrapper'}>
                            <TextField
                                className={'TextField-without-border-radius'}
                                label={t('name')}
                                {...register('customerName')}
                                error={!!errors.customerName}
                                helperText={errors?.customerName ? errors.customerName.message : null}
                            />
                            <TextField
                                className={'TextField-without-border-radius'}
                                label={t('surname')}
                                {...register('customerSurname')}
                                error={!!errors.customerSurname}
                                helperText={errors?.customerSurname ? errors.customerSurname.message : null}
                            />
                            <TextField
                                className={'TextField-without-border-radius'}
                                label={t('phone')}
                                {...register('customerPhone')}
                                error={!!errors.customerPhone}
                                helperText={errors?.customerPhone ? errors.customerPhone.message : null}
                            />
                            <TextField
                                className={'TextField-without-border-radius'}
                                multiline
                                rows={4}
                                label={t('shippingAddress')}
                                {...register('address')}
                                error={!!errors.address}
                                helperText={errors?.address ? errors.address.message : null}
                            />
                            <Button type={'submit'} variant={'contained'}>{t('submit')}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default OrderForm;