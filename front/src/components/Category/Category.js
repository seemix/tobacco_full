import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsByCategory, setPage } from '../../store/product';
import ItemCard from '../ItemCard/ItemCard';
import { config } from '../../config/config';
import BrandSelector from './BrandSelector/BrandSelector';
import { getBrandsByCategory } from '../../store/brand';

const Category = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getBrandsByCategory(id));
    }, [id]);
    let params = { categoryId: id, page: 1 }
    const { selectedPage, brand } = useSelector(state => state.productStore);
    const { brands } = useSelector(state => state.brandStore);

    useEffect(() => {
        dispatch(getProductsByCategory({ ...params, page: selectedPage, brand }));
        dispatch(setPage(1));
    }, [id, dispatch, selectedPage, brand]);

    const { categories } = useSelector(state => state.categoryStore);
    const currentCat = categories.filter(item => item._id === id)[0];
    const { products, pages, page } = useSelector(state => state.productStore).products;
    const handlePage = (e, selectedPage) => {
        params.page = selectedPage;
        dispatch(setPage(selectedPage));
    }
    return (
        <div style={{ marginTop: '80px' }}>
            <div className={'image_container'}
                 style={{ backgroundImage: `url(${config.BACKEND_URL}/category/${currentCat?.picture})` }}>
                <div className={'image_overlay'}></div>
                <h2>{currentCat?.name.toUpperCase()}</h2>
            </div>
            { brands.length > 0 &&  <BrandSelector/> }
            <div className={'items_wrapper'}>
                {products &&
                    products.map(item => <ItemCard key={item._id} product={item}/>)}
            </div>
            <div className={'pagination_wrapper'}>
                {pages && pages > 1 &&
                    <Pagination shape={'rounded'} count={pages || 1} onChange={handlePage} page={Number(page)}/>
                }
            </div>
        </div>
    );
};
export default Category;