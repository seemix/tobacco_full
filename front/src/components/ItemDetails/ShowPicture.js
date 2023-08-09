import React from 'react';
import { DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { config } from '../../config/config';
import './ItemDetails.css';

const ShowPicture = (props) => {
    const handleClose = () => {
        props.openWindow(false);
    }
    return (
        <div className={'show_picture_wrapper'}>
            {props && <img src={`${config.BACKEND_URL}/product/image/${props.picture}`} width={'90%'} alt={'picture'}/>}
            <DialogActions>
                <CloseIcon onClick={handleClose} className={'show_picture_close'}  />
            </DialogActions>
        </div>
    );
};

export default ShowPicture;