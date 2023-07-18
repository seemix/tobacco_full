import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardMedia, Dialog, DialogContent, NativeSelect, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import { joiResolver } from '@hookform/resolvers/joi';

import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../store/brand';
import { productFormValidator } from '../../../validators/product-form.validator';
import { hideProductForm, showProductForm } from '../../../store/appearance';
import { createProduct, setProductForUpdate, updateProduct } from '../../../store/product';
import { useNavigate } from 'react-router-dom';
import ProductPictures from './ProductPictures';
import { config } from '../../../config/config';
import 'react-quill/dist/quill.snow.css';

const ProductEditForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);
    const { currentCategory } = useSelector(state => state.categoryStore);
    const { productForUpdate } = useSelector(state => state.productStore);
    const [value, setValue] = useState('');
    useEffect(() => {
        if (productForUpdate?.description) {
            setValue(productForUpdate?.description);
        }
    }, [productForUpdate]);

    const { allBrands } = useSelector(state => state.brandStore);
    const { productFormModal } = useSelector(state => state.appearanceStore);

    const [formChange, setFormChange] = useState(false);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm({ resolver: joiResolver(productFormValidator) });
    const watchedFields = watch();
    useEffect(() => {
        setFormChange(true);
    }, [watchedFields]);
    const handleBack = () => {
        dispatch(setProductForUpdate(null));
        navigate(-1);
    }
    const saveForm = (data) => {
        if (productForUpdate) {
            dispatch(updateProduct({
                ...data,
                _id: productForUpdate._id,
                description: value,
                pictures: productForUpdate.pictures
            }));
        } else {
            dispatch(createProduct({ ...data, category: currentCategory._id }));
        }
    }
    return (
        <div>
            <Button style={{ marginLeft: '50px' }} onClick={handleBack}>Back to category</Button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit(saveForm)}>
                    <div style={{ display: 'flex', columnGap: '20px', marginTop: '20px' }}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex' }}>
                                    <TextField
                                        defaultValue={productForUpdate?.name}
                                        required
                                        name={'name'}
                                        fullWidth
                                        className={'TextField-without-border-radius'}
                                        label={'Product name'}
                                        {...register('name')}
                                        error={!!errors.name}
                                        helperText={errors?.name ? errors.name.message : null}
                                    />
                                </div>
                                <div style={{ margin: '0 auto' }}>
                                    <ReactQuill theme="snow" value={value} onChange={setValue}/>
                                    <div>
                                        <TextField
                                            {...register('oldPrice')}
                                            error={!!errors.oldPrice}
                                            helperText={errors?.oldPrice ? errors.oldPrice.message : null}
                                            defaultValue={productForUpdate?.oldPrice}
                                            style={{ width: '100px', margin: '15px' }}
                                            className={'TextField-without-border-radius'}
                                            label={'old price'}
                                        />
                                        <TextField
                                            {...register('price')}
                                            error={!!errors.price}
                                            helperText={errors?.price ? errors.price.message : null}
                                            defaultValue={productForUpdate?.price}
                                            required
                                            style={{ width: '100px', margin: '15px' }}
                                            className={'TextField-without-border-radius'}
                                            label={'price'}
                                        />
                                        <NativeSelect style={{ marginTop: '20px' }}
                                                      defaultValue={productForUpdate?.brand?._id}
                                                      {...register('brand')}
                                                      error={!!errors.brand}
                                                      helpertext={errors?.brand ? errors.brand.message : null}
                                        >
                                            {allBrands.map(brand => <option value={brand._id}
                                                                            key={brand._id}>{brand.name}</option>)}
                                        </NativeSelect></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                productForUpdate && productForUpdate.pictures.map((picture, index) =>
                                    <div key={index}>
                                        <Card style={{ margin: '10px' }}>
                                            <CardMedia
                                                component={'img'}
                                                alt={picture}
                                                width={'150'}
                                                height={'90'}
                                                image={`${config.BACKEND_URL}/product/image/${picture}`}/>
                                        </Card>
                                    </div>)
                            }
                            {productForUpdate &&
                                <Button fullWidth onClick={() => dispatch(showProductForm())}>Edit pictures</Button>
                            }
                            <Dialog
                                maxWidth={'md'}
                                open={productFormModal || false}
                                onClose={() => dispatch(hideProductForm())}
                            >
                                <DialogContent style={{ borderRadius: 0 }}>
                                    <ProductPictures/>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <Button onClick={handleBack}>Back</Button>
                    {formChange && <Button type={'submit'}>Save</Button>}
                </form>
            </div>
        </div>
    );
};

export default ProductEditForm;