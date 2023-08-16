import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, DialogActions, NativeSelect, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import { joiResolver } from '@hookform/resolvers/joi';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBrands } from '../../../../store/brand';
import { productFormValidator } from '../../../../validators/product-form.validator';
import { createProduct, deleteProductImage, updateProduct } from '../../../../store/product';
import { config } from '../../../../config/config';
import { hideProductForm } from '../../../../store/product';
import './ProductEditForm.css';

const ProductEditForm = () => {
    const [file, setFile] = useState(null);
    const [pastedLink, setPastedLink] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);
    const { currentCategory } = useSelector(state => state.categoryStore);
    const { productForUpdate, error } = useSelector(state => state.productStore);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (productForUpdate?.description) {
            setValue(productForUpdate?.description);
        }
    }, [productForUpdate]);

    const { allBrands } = useSelector(state => state.brandStore);
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({ resolver: joiResolver(productFormValidator) });

    const removeImage = () => {
        dispatch(deleteProductImage(productForUpdate.picture));
        setFile(null);
        setConfirmDelete(false);
    }
    const handleCancel = () => {
        dispatch(hideProductForm());
    }
    const removeFile = () => {
        setPastedLink(null);
        setFile(null);
    }
    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setPastedLink(URL.createObjectURL(event.target.files[0]));
    }
    const saveForm = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('oldPrice', data.oldPrice);
        formData.append('price', data.price);
        formData.append('description', value);
        formData.append('brand', data.brand);
        formData.append('category', currentCategory._id);
        if (file) formData.append('image', file);
        if (productForUpdate) {
            formData.append('_id', productForUpdate._id);
            if(file) formData.append('oldPicture', productForUpdate.picture);
            dispatch(updateProduct(formData));
        } else {
            dispatch(createProduct(formData));
        }
    }
    return (
        <div className={'form_wrapper'}>
            <div className={'inside_wrapper'}>
                <form onSubmit={handleSubmit(saveForm)}>
                    <div className={'inside_form_wrapper'}>
                        <div>
                            <div className={'fields_wrapper'} >
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
                                    <div className={'inside_form_wrapper'}>
                                        <TextField
                                            {...register('oldPrice')}
                                            error={!!errors.oldPrice}
                                            helperText={errors?.oldPrice ? errors.oldPrice.message : null}
                                            defaultValue={productForUpdate?.oldPrice}
                                            className={'TextField-without-border-radius product_field'}
                                            label={'old price'}
                                        />
                                        <TextField
                                            {...register('price')}
                                            error={!!errors.price}
                                            helperText={errors?.price ? errors.price.message : null}
                                            defaultValue={productForUpdate?.price}
                                            required
                                            className={'TextField-without-border-radius product_field'}
                                            label={'price'}
                                        />
                                        <NativeSelect style={{ marginTop: '20px' }}
                                                      defaultValue={productForUpdate?.brand?._id}
                                                      {...register('brand')}
                                                      error={!!errors.brand}
                                        >
                                            {allBrands.map(brand => <option value={brand._id}
                                                                            key={brand._id}>{brand.name}</option>)}
                                        </NativeSelect></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                {!productForUpdate?.picture && !file &&
                                    <Button fullWidth component="label">
                                        Upload File
                                        <input type="file"
                                               accept="image/*"
                                               hidden
                                               onChange={handleChange}
                                        />
                                    </Button>
                                }

                            </div>
                            <div>
                                {productForUpdate?.picture && !file &&
                                    <img src={`${config.BACKEND_URL}/product/image/${productForUpdate.picture}`}
                                         alt="product_picture"
                                         width={300}/>}
                                {pastedLink && <> <img src={pastedLink} alt={'pasted'} width={300}/>
                                </>}
                            </div>
                            {file &&
                                <Button fullWidth onClick={removeFile}>revert</Button>
                            }
                            <div>
                                {productForUpdate?.picture &&
                                    <Button fullWidth component="label">
                                        replace
                                        <input type="file"
                                               accept="image/*"
                                               hidden
                                               onChange={handleChange}
                                        />
                                    </Button>
                                }
                            </div>
                            {productForUpdate?.picture && !confirmDelete && !file &&
                                <Button fullWidth onClick={() => setConfirmDelete(true)}>Delete</Button>
                            }
                            {confirmDelete && <>
                                Confirm deleting picture:
                                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                                <Button onClick={removeImage}> Confirm </Button></>
                            }
                        </div>
                    </div>
                    {error && <Alert severity="error">{error}</Alert>}
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type={'submit'}>Save</Button>
                    </DialogActions>
                </form>
            </div>
        </div>
    );
};

export default ProductEditForm;