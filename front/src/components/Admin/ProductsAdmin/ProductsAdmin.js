import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import ProductCard from './ProductCard/ProductCard';
import { getProductsByCategory, setProductForUpdate } from '../../../store/product';
import { getCategoryById } from '../../../store/category';
import ProductEditForm from './ProductEditForm/ProductEditForm';
import { showProductForm } from '../../../store/product';

const ProductsAdmin = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { id } = useParams();
    let params = { categoryId: id }

    useEffect(() => {
        dispatch(getCategoryById(id));
        dispatch(getProductsByCategory({ ...params, page: searchParams.get('page') || 1 }));
    }, [dispatch, id, searchParams]);
    const { productFormModal } = useSelector(state => state.productStore);
    const { currentCategory } = useSelector(state => state.categoryStore);
    const { products, pages, page } = useSelector(state => state.productStore).products;
    const handlePage = (e, selectedPage) => {
        searchParams.set('page', selectedPage);
        setSearchParams(searchParams);
    }
    const addNewProduct = () => {
        dispatch(setProductForUpdate(null));
        dispatch(showProductForm());
    }
    return (
        <div>
            <h2>{currentCategory?.name}
                <Button onClick={addNewProduct}>+ Add new product </Button>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {products &&
                    products.map(item => <ProductCard key={item._id} product={item}/>)
                }
            </div>
            <div className={'pagination_wrapper'}>
                {pages && pages > 1 &&
                    <Pagination shape={'rounded'} count={pages || 1} onChange={handlePage} page={Number(page)}/>
                }
            </div>
            <Dialog open={productFormModal} maxWidth={'md'}>
                <ProductEditForm/>
            </Dialog>
        </div>
    );
};

export default ProductsAdmin;