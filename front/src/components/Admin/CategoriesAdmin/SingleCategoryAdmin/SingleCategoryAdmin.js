import React from 'react';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';

import './SingleCategoryAdmin.css';
import { config } from '../../../../config/config';
import { showCategoryDeleteModal } from '../../../../store/appearance';
import { setCategoryForDelete, setCategoryForUpdate, showCategoryEdit } from '../../../../store/category';

const SingleCategoryAdmin = ({ category }) => {
    const dispatch = useDispatch();
    const categoryEdit = (category) => {
        dispatch(setCategoryForUpdate(category));
        dispatch(showCategoryEdit(true));
    }
    const setDelete = () => {
        dispatch(setCategoryForDelete(category));
        dispatch(showCategoryDeleteModal());
    }
    return (
        <div className={'single_cat_wrapper'}>
            <Card style={{ margin: '15px' }}>
                <div className={'single_cat_item_wrapper'}>
                    <div className={'admin_cat_picture'}
                         style={{ backgroundImage: `url(${config.BACKEND_URL}/category/${category?.picture})` }}>
                        <div className={'image_overlay'}></div>
                        <h3>{category?.name.toUpperCase()}</h3>
                    </div>
                    <div>
                        <Button onClick={() => categoryEdit(category)}><EditIcon/></Button>
                    </div>
                    <div>
                        <Button onClick={() => setDelete(category)}><DeleteForeverIcon/></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SingleCategoryAdmin;