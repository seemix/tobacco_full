import React, { useEffect, useState } from 'react';
import { Button, Card, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { changePicture, removeNewPicture } from '../../../store/product';

const NewProductPicture = ({ picture, index }) => {
    const [file, setFile] = useState();
    const [img, setImg] = useState(URL.createObjectURL(picture));
    const dispatch = useDispatch();
    const { newPictures } = useSelector(state => state.productStore);
    useEffect(() => {
        if (file) setFile(file);
    }, [file]);

    const handleChange = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]));
        dispatch(changePicture({ index, picture: e.target.files[0] }));
    }
    const handleRemove = (index) => {
        dispatch(removeNewPicture(index));
    }
    return (
        <div style={{ display: 'flex', columnGap: '15px', alignItems: 'center' }}>
            <Card style={{ margin: '10px' }}>
                <CardMedia
                    component={'img'}
                    alt={picture}
                    width={'150'}
                    height={'90'}
                    image={img}/>
            </Card>
            <div>
                <Button fullWidth component="label">
                    replace
                    <input type="file"
                           accept="image/*"
                           hidden
                           onChange={handleChange}
                    />
                </Button>
                <div><Button onClick={() => handleRemove(index)}><DeleteIcon/></Button></div>
            </div>
        </div>
    );
};

export default NewProductPicture;