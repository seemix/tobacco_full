import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, NativeSelect, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import { joiResolver } from '@hookform/resolvers/joi';

import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../store/brand';
import { productFormValidator } from '../../../validators/product-form.validator';
import { createProduct, setProductForUpdate, updateProduct } from '../../../store/product';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../config/config';
import 'react-quill/dist/quill.snow.css';

const ProductEditForm = () => {
    const [file, setFile] = useState(null);
    const [pastedLink, setPastedLink] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
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
    const removeImage = () => {
        //   dispatch(deleteImage(categoryForUpdate.picture));
        setFile(null);
        setConfirmDelete(false);
    }
    const handleBack = () => {
        dispatch(setProductForUpdate(null));
        navigate(-1);
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
            dispatch(updateProduct(formData));
        } else {
            dispatch(createProduct(formData));
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

                            {/*{*/}
                            {/*    productForUpdate && productForUpdate.pictures.map((picture, index) =>*/}
                            {/*        <div key={index}>*/}
                            {/*            <Card style={{ margin: '10px' }}>*/}
                            {/*                <CardMedia*/}
                            {/*                    component={'img'}*/}
                            {/*                    alt={picture}*/}
                            {/*                    width={'150'}*/}
                            {/*                    height={'90'}*/}
                            {/*                    image={`${config.BACKEND_URL}/product/image/${picture}`}/>*/}
                            {/*            </Card>*/}
                            {/*        </div>)*/}
                            {/*}*/}

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
                                {productForUpdate && !file &&
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
                            {productForUpdate && !confirmDelete && !file &&
                                <Button fullWidth onClick={() => setConfirmDelete(true)}>Delete</Button>
                            }
                            {confirmDelete && <>
                                Confirm deleting picture:
                                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                                <Button onClick={removeImage}> Confirm </Button></>
                            }
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