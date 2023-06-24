import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { getProductsByCategory } from '../../store/product';
import ItemCard from '../ItemCard/ItemCard';
import { config } from '../../config/config';
import BrandSelector from './BrandSelector/BrandSelector';
import { getBrandsByCategory } from '../../store/brand';

const Category = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { id } = useParams();
    const setPag = (page) => {
        setSearchParams({ page });
    }
    useEffect(() => {
        dispatch(getBrandsByCategory(id));
    }, [id]);
    const { brands } = useSelector(state => state.brandStore);

    useEffect(() => {
        dispatch(getProductsByCategory({
            categoryId: id,
            page: searchParams.get('page'),
            brand: searchParams.get('brand')
        }));
    }, [id, dispatch, searchParams]);

    const { categories } = useSelector(state => state.categoryStore);
    const currentCat = categories.filter(item => item._id === id)[0];
    const { products, pages, page } = useSelector(state => state.productStore).products;

    return (
        <div style={{ marginTop: '80px' }}>
            <div className={'image_container'}
                 style={{ backgroundImage: `url(${config.BACKEND_URL}/category/${currentCat?.picture})` }}>
                <div className={'image_overlay'}></div>
                <h2>{currentCat?.name.toUpperCase()}</h2>
            </div>
            {brands.length > 0 && <BrandSelector/>}
            <div className={'items_wrapper'}>
                {products && products.length > 0 &&
                    products.map(item => <ItemCard key={item._id} product={item}/>)}
            </div>
            <div className={'pagination_wrapper'}>
                {pages!==0 && pages > 1 &&
                    <Pagination shape={'rounded'} count={pages || 1} onChange={(event, page) => setPag(page)}
                                page={Number(page) || 1}/>
                }
            </div>
        </div>
    );
};
export default Category;