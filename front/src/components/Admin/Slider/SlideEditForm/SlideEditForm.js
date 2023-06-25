import React, { useEffect, useState } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { closeSlideEdit, createSlide, setSlideForUpdate, updateSlide } from '../../../../store/slider';
import { config } from '../../../../config/config';

const SlideEditForm = () => {
    const { slideForUpdate } = useSelector(state => state.sliderStore);
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch();
    const [pastedLink, setPastedLink] = useState(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (slideForUpdate) setValue('text', slideForUpdate.text);
    }, []);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setPastedLink(URL.createObjectURL(event.target.files[0]));
    }
    const removeFile = () => {
        setFile(null);
        setPastedLink(null);
    }
    const closeEdit = () => {
        dispatch(setSlideForUpdate(null));
        dispatch(closeSlideEdit());
    }
    const saveForm = (data) => {
        const formData = new FormData();
        formData.append('text', data.text);
        if (file) formData.append('image', file);
        if (slideForUpdate) {
            formData.append('_id', slideForUpdate._id);
            if (file) {
               formData.append('picture', slideForUpdate.slide);
            }
            console.log(formData);
            dispatch(updateSlide(formData));
        } else {
            console.log(formData);
             dispatch(createSlide(formData));
        }
        dispatch(closeSlideEdit());
    }
    return (
        <>
            <h2>Add/Edit Slide</h2>
            <div className={'wrapper'}>
                <form onSubmit={handleSubmit(saveForm)}>
                    <TextField className={'TextField-without-border-radius'}
                               label={'slide text'}
                               multiline
                               rows={4}
                               fullWidth
                               {...register('text')}
                    />
                    <div>{!slideForUpdate && !file &&
                        <Button fullWidth component={'label'}>Upload slide
                            <input type={'file'}
                                   required
                                   accept={'image/*'}
                                   hidden
                                   {...register('image')}
                                   onChange={handleChange}
                            />
                        </Button>
                    }</div>
                    <div>
                        {slideForUpdate && slideForUpdate?.slide && !file &&
                            <img src={`${config.BACKEND_URL}/slider/${slideForUpdate?.slide}`} alt="slide"
                                 width={300}/>}
                        {pastedLink && <> <img src={pastedLink} alt={'pasted'} width={300}/>
                        </>}
                        <div>
                            <Button fullWidth component="label">
                                replace
                                <input type="file"
                                       accept="image/*"
                                       hidden
                                       onChange={handleChange}
                                />
                            </Button>
                        </div>
                    </div>
                    {file &&
                        <Button fullWidth onClick={removeFile}>revert</Button>
                    }
                    <DialogActions>
                        <Button variant={'contained'} onClick={closeEdit}>Cancel
                        </Button>
                        <Button variant={'contained'} type={'submit'}>Submit</Button>
                    </DialogActions>
                </form>
            </div>
        </>
    );
};

export default SlideEditForm;