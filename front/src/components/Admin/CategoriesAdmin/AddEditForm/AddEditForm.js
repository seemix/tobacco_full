import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    DialogActions

} from '@mui/material';
import { useForm } from 'react-hook-form';
import './AddEditForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideCategoryEdit } from '../../../../store/appearance';
import { createCategory, deleteImage, setCategoryForUpdate, updateCategory } from '../../../../store/category';
import { config } from '../../../../config/config';

const AddEditForm = () => {
        const dispatch = useDispatch();
        const { categoryForUpdate } = useSelector(state => state.categoryStore);
        const { register, handleSubmit, setValue, formState: { errors } } = useForm();
        const [pastedLink, setPastedLink] = useState(null);
        const [file, setFile] = useState(null);
        const [confirmDelete, setConfirmDelete] = useState(false);
        useEffect(() => {
            if (categoryForUpdate) setValue('categoryName', categoryForUpdate.name);
        }, []);
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
                dispatch(updateCategory(formData));
            } else {
                dispatch(createCategory(formData));
            }
            dispatch(hideCategoryEdit());
        }

    return (
            <>
                <h2>Add/Edit category</h2>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmit(saveForm)}>
                        <div>
                            <TextField
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
                            {!categoryForUpdate?.picture &&
                                <Button fullWidth component="label">
                                    Upload File
                                    <input type="file"
                                           accept="image/*"
                                           hidden
                                           {...register('image')}
                                           onChange={handleChange}
                                    />
                                </Button>
                            }
                            <h4>Recomended image size 1920x270</h4>
                        </div>
                        <div>
                            {categoryForUpdate && categoryForUpdate?.picture &&
                                <img src={`${config.BACKEND_URL}/category/${categoryForUpdate?.picture}`} alt="123"
                                     width={300}/>}
                            {pastedLink && <> <img src={pastedLink} alt={'pasted'} width={300}/>
                            </>}
                        </div>
                        {file &&
                            <Button fullWidth onClick={() => removeFile()}>remove</Button>
                        }
                        {categoryForUpdate && !confirmDelete &&
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
                </div>

            </>
        )
    }
;
export default AddEditForm;