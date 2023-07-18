import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination'
import { Card, Dialog, DialogContent, FormControlLabel, NativeSelect, Radio, RadioGroup } from '@mui/material';
import io from 'socket.io-client';

import SingleOrder from './SingleOrder/SingleOrder';
import { getAllOrders, getSums, putNewOrder } from '../../../store/order';
import ConfirmDeleteOrder from './ConfirmDeleteOrder/ConfirmDeleteOrder';
import { hideOrderDeleteModal } from '../../../store/appearance';
import './Orders.css';
import { config } from '../../../config/config';
import sound from './notification.wav';
import { useSearchParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';

const socket = io(config.BACKEND_URL);
const Orders = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders({
            page: searchParams.get('page') || 1,
            status: searchParams.get('status') || 'all',
            sort: searchParams.get('sort') || 'dateasc'
        }));
    }, [dispatch, searchParams]);

    const { response, sums } = useSelector(state => state.orderStore);
    useEffect(() => {
        dispatch(getSums());
    }, [dispatch, response]);
    useEffect(() => {
        socket.on('newOrder', (data) => {
            dispatch(putNewOrder(data));
            new Audio(sound).play().then();
        });
        return () => {
            socket.off('newOrder');
        };
    }, [dispatch]);
    const { orderDeleteModal } = useSelector(state => state.appearanceStore);
    const handlePage = (e, selectedPage) => {
        searchParams.set('page', selectedPage);
        setSearchParams(searchParams);
    }
    const [status, setStatus] = useState('all');
    const handleFilter = (e) => {
        searchParams.set('status', e.target.value);
        setSearchParams(searchParams);
        setStatus(e.target.value);
    }
    const handleSort = (e) => {
        searchParams.set('sort', e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <div className={'orders_wrapper'}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', gap: '10px' }}>
                    <h2>Orders</h2>
                    {sums && <>
                        <Card className={'card_sum'}>completed: {sums?.completedSum} {config.CURRENCY}</Card>
                        <Card className={'card_sum'}
                              style={{ backgroundColor: '#e5f3dd' }}>uncompleted: {sums?.uncompletedSum} {config.CURRENCY}</Card>
                        <Card className={'card_sum'}
                              style={{ backgroundColor: '#f5f6b9' }}>Total: {sums?.totalSum} {config.CURRENCY}</Card>
                    </>
                    }

                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <FormControl>
                            <RadioGroup row name={'status'} onChange={handleFilter} value={status}>
                                <FormControlLabel value="completed" control={<Radio/>} label="Completed"/>
                                <FormControlLabel value="uncompleted" control={<Radio/>} label="Uncompleted"/>
                                <FormControlLabel value="all" control={<Radio/>} label="All"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div><b>Sort by:&nbsp;</b>
                        <FormControl size={'small'}>
                            <NativeSelect onChange={handleSort} defaultValue={'dateasc'}>
                                <option value={'sumasc'}>cheap to expensive</option>
                                <option value={'sumdesc'}>expensive to cheap</option>
                                <option value={'dateasc'}>new to old</option>
                                <option value={'datedesc'}>old to new</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                </div>

                {response &&
                    response?.orders.map(order => <SingleOrder key={order._id} order={order}/>)
                }
            </div>
            {
                response?.pages > 1 &&
                <Pagination shape={'rounded'} count={response?.pages || 1} onChange={handlePage}/>
            }
            <Dialog maxWidth={'xs'} open={orderDeleteModal} onClose={() => dispatch(hideOrderDeleteModal())}>
                <DialogContent>
                    <ConfirmDeleteOrder/>
                </DialogContent>
            </Dialog>
        </div>
    )
        ;
};
export default Orders;