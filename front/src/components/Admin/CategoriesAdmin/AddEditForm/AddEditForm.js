import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    DialogActions, Alert

} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { hideCategoryEdit } from '../../../../store/category';
import { categoryFormValidator } from '../../../../validators/category-form.validator';
import { createCategory, deleteImage, setCategoryForUpdate, updateCategory } from '../../../../store/category';
import { config } from '../../../../config/config';
import './AddEditForm.css';

const AddEditForm = () => {
        const dispatch = useDispatch();
        const { categoryForUpdate, error, status } = useSelector(state => state.categoryStore);
    const {
            register,
            handleSubmit,
            setValue,
            formState: { errors }
        } = useForm({ resolver: joiResolver(categoryFormValidator) });
        const [pastedLink, setPastedLink] = useState(null);
        const [file, setFile] = useState(null);
        const [confirmDelete, setConfirmDelete] = useState(false);
        useEffect(() => {
            if (categoryForUpdate) setValue('categoryName', categoryForUpdate.name);
        }, [categoryForUpdate]);
        const handleClose = () => {
                dispatch(hideCategoryEdit());
                dispatch(setCategoryForUpdate(null));
        };
        const handleChange = (event) => {
            setFile(event.target.files[0]);
            setPastedLink(URL.createObjectURL(event.target.files[0]));
        }
        const removeFile = () => {
            setPastedLink(null);
            setFile(null);
        }
        const removeImage = () => {
            dispatch(deleteImage(categoryForUpdate.picture));
            setFile(null);
            setConfirmDelete(false);
        }
        const saveForm = (data) => {
            const formData = new FormData();
            formData.append('name', data.categoryName);
            formData.append('image', file);
            if (categoryForUpdate) {
                formData.append('_id', categoryForUpdate._id);
                formData.append('picture', categoryForUpdate.picture);
                dispatch(updateCategory(formData));
            } else {
                dispatch(createCategory(formData));
            }
            if(!error && status === 'fulfilled') dispatch(hideCategoryEdit());
        }
    return (
            <>
                <h2>Add/Edit category</h2>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmit(saveForm)}>
                        <div>
                            <TextField
                                className={'TextField-without-border-radius'}
                                {...register('categoryName', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[a-zA-Z]{3,15}$/,
                                        message: 'Bad format'
                                    }
                                })}
                                error={!!errors.categoryName}
                                helperText={errors?.categoryName ? errors.categoryName.message : null}
                                label={'category name'}
                                fullWidth
                            />
                        </div>
                        <div>
                            {!categoryForUpdate?.picture && !file &&
                                <Button fullWidth component="label">
                                    Upload File
                                    <input type="file"
                                           accept="image/*"
                                           hidden
                                           onChange={handleChange}
                                    />
                                </Button>
                            }
                            <h4>Recomended image size 1920x270</h4>
                        </div>
                        <div>
                            {categoryForUpdate && categoryForUpdate?.picture && !file &&
                                <img src={`${config.BACKEND_URL}/category/${categoryForUpdate?.picture}`}
                                     alt="category_picture"
                                     width={300}/>}
                            {pastedLink && <> <img src={pastedLink} alt={'pasted'} width={300}/>
                            </>}
                        </div>
                        {file &&
                            <Button fullWidth onClick={removeFile}>revert</Button>
                        }
                        <div>
                            {categoryForUpdate?.picture &&
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
                        {categoryForUpdate && !confirmDelete && !file &&
                            <Button fullWidth onClick={() => setConfirmDelete(true)}>Delete</Button>
                        }
                        {confirmDelete && <>
                            Confirm deleting picture:
                            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button onClick={removeImage}> Confirm </Button></>
                        }
                        <div>
                            <DialogActions>
                                <Button variant={'contained'} onClick={handleClose}>Cancel
                                </Button>
                                <Button variant={'contained'} type={'submit'}>Submit</Button>
                            </DialogActions>
                        </div>
                    </form>
                    {error && <Alert severity="error">{error}</Alert>}
                </div>
            </>
        )
    }
;
export default AddEditForm;