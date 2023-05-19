import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination'
import { Dialog, DialogContent } from '@mui/material';

import SingleOrder from './SingleOrder/SingleOrder';
import './Orders.css';
import { getAllOrders, putNewOrder } from '../../../store/order';
import ConfirmDeleteOrder from './ConfirmDeleteOrder/ConfirmDeleteOrder';
import { hideOrderDeleteModal } from '../../../store/appearance';

import io from 'socket.io-client';
import { config } from '../../../config/config';
import sound from './notification.wav';

const socket = io(config.BACKEND_URL);
const Orders = () => {
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
    const [page, setPage] = useState(1);
    const handlePage = (e, selectedPage) => {
        setPage(selectedPage);
    }
    useEffect(() => {
        dispatch(getAllOrders(page));
    }, [dispatch, page])
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