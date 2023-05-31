import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination'
import { Dialog, DialogContent } from '@mui/material';
import io from 'socket.io-client';

import SingleOrder from './SingleOrder/SingleOrder';
import { getAllOrders, putNewOrder } from '../../../store/order';
import ConfirmDeleteOrder from './ConfirmDeleteOrder/ConfirmDeleteOrder';
import { hideOrderDeleteModal } from '../../../store/appearance';
import './Orders.css';
import { config } from '../../../config/config';
import sound from './notification.wav';
import { useSearchParams } from 'react-router-dom';

const socket = io(config.BACKEND_URL);
const Orders = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on('newOrder', (data) => {
            dispatch(putNewOrder(data));
            new Audio(sound).play();
        });
        return () => {
            socket.off('newOrder');
        };
    }, [dispatch]);
    const { orderDeleteModal } = useSelector(state => state.appearanceStore);
    const handlePage = (e, selectedPage) => {
        setSearchParams({ page: selectedPage });
    }
    useEffect(() => {
        dispatch(getAllOrders(searchParams.get('page')));
    }, [dispatch, searchParams])
    const { response } = useSelector(state => state.orderStore);
    return (
        <div className={'orders_wrapper'}>
            <div><h2>Orders</h2>
                {response &&
                    response?.orders.map(order => <SingleOrder key={order._id} order={order}/>)
                }
            </div>
            {response?.pages > 1 &&
                <Pagination shape={'rounded'} count={response?.pages || 1} onChange={handlePage}/>
            }
            <Dialog maxWidth={'xs'} open={orderDeleteModal} onClose={() => dispatch(hideOrderDeleteModal())}>
                <DialogContent>
                    <ConfirmDeleteOrder/>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default Orders;