import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { createBrand, getAllBrands } from '../../../store/brand';
import SingleBrand from './SingleBrand';

const Brands = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBrands());
    }, []);
    const { allBrands } = useSelector(state => state.brandStore);
    const { register, handleSubmit } = useForm();
    const formSubmit = (data) => {
        dispatch(createBrand(data));
    }
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <h2>Brands</h2>
            <div style={{ dspalay: 'flex' }}>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <TextField
                        size={'small'}
                        className={'TextField-without-border-radius'}
                        label={'brand name'}
                        {...register('name')}
                    />
                    <Button type={'submit'} variant={'contained'} style={{ marginLeft: '10px' }}>+ Add new
                        brand</Button>
                </form>
            </div>

            <Table sx={{ width: 420 }}>
                <TableBody>
                    {allBrands &&
                        allBrands.map(brand => <SingleBrand key={brand._id} brand={brand}/>)
                    }
                </TableBody>
            </Table>

        </div>
    )
};

export default Brands;