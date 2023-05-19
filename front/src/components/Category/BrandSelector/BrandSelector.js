import React from 'react';
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';
import './BrandSelector.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBrand } from '../../../store/product';

const BrandSelector = () => {
    const dispatch = useDispatch();
    const { brands } = useSelector(state => state.brandStore);
       const change = (e) => {
        dispatch(setBrand(e.target.value));
    }
    // const array = products?.map(item => {
    //     return {
    //         name: item.brand.name,
    //         id: item.brand._id
    //     }
    // }).filter((elem, index, self) =>
    //         index === self.findIndex((t) => (
    //             t.id === elem.id
    //         ))
    // );
    return (
        <div className={'brand_selector_wrapper'}>
            <h4 style={{ marginRight: '20px' }}>Filter by brand</h4>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <NativeSelect onChange={change} defaultValue={'all'}>
                    <option value={'all'}>All</option>
                    {brands?.map(item => <option key={item._id} value={item._id}>{item.name}</option> )}
                </NativeSelect>
            </FormControl>
        </div>
    );
};
export default BrandSelector;