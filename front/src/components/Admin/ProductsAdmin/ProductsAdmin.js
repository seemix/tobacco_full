import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogContent } from '@mui/material';

import ProductCard from './ProductCard';
import { getProductsByCategory, setPage } from '../../../store/product';
import { hideProductForm, showProductForm } from '../../../store/appearance';
import ProductForm from './ProductForm';
import { getCategoryById } from '../../../store/category';
import Pagination from '@mui/material/Pagination';

const ProductsAdmin = () => {
    const dispatch = useDispatch();

    const { productFormModal } = useSelector(state => state.appearanceStore);
    const { id } = useParams();
    let params = { categoryId: id, page: 1 }

    const { selectedPage } = useSelector(state => state.productStore);

    useEffect(() => {
        dispatch(getCategoryById(id));
        dispatch(getProductsByCategory({ ...params, page: selectedPage }));
        //dispatch(setPage(1));
    }, [dispatch, id, selectedPage]);
    const { currentCategory } = useSelector(state => state.categoryStore);
    const { products, pages, page } = useSelector(state => state.productStore).products;
    const handlePage = (e, selectedPage) => {
        params.page = selectedPage;
        dispatch(setPage(selectedPage));
    }
    return (
        <div>
            <h2>{currentCategory?.name}
                <Button onClick={() => dispatch(showProductForm())}>+ Add new product </Button>
            </h2>
            <Dialog
                maxWidth={'md'}
                open={productFormModal}
                onClose={() => dispatch(hideProductForm())}
            >
                <DialogContent style={{ borderRadius: 0 }}>
                    <ProductForm _id={currentCategory?._id}/>
                </DialogContent>
            </Dialog>
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
        </div>
    );
};

export default ProductsAdmin;