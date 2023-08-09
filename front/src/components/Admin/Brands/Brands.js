import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TextField } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import { createBrand, getAllBrands } from '../../../store/brand';
import SingleBrand from './SingleBrand';
import { brandFormValidator } from '../../../validators/brand-form.validator';
import './Brands.css';
const Brands = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands());
    }, []);

    const { allBrands } = useSelector(state => state.brandStore);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: joiResolver(brandFormValidator) });
    const formSubmit = (data) => {
        dispatch(createBrand(data));
    }
    return (
        <div className={'brands_wrapper'}>
            <h2>Brands</h2>
            <div className={'brands_form_wrapper'}>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <TextField
                        size={'small'}
                        className={'TextField-without-border-radius'}
                        label={'brand name'}
                        {...register('name',{
                            required: 'This field is required'
                        })}
                        error={!!errors.name}
                        helperText={errors?.name ? errors.name.message : null}
                    />
                    <Button type={'submit'} variant={'contained'} style={{ marginLeft: '10px' }}>
                        + Add new brand
                    </Button>
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