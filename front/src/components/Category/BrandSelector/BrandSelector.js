import React from 'react';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import { NativeSelect } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { setBrand } from '../../../store/product';
import './BrandSelector.css';

const BrandSelector = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { brands } = useSelector(state => state.brandStore);
    const change = (e) => {
        setSearchParams({ brand: e.target.value })
        dispatch(setBrand(e.target.value));
    }
    return (
        <div className={'brand_selector_wrapper'}>
            <h4 style={{ marginRight: '20px' }}>{t('filterByBrand')}</h4>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <NativeSelect onChange={change} defaultValue={'all'}>
                    <option value={'all'}>All</option>
                    {brands?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    );
};
export default BrandSelector;