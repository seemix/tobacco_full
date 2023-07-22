import React from 'react';
import { DialogActions } from '@mui/material';

import { config } from '../../config/config';
import CloseIcon from '@mui/icons-material/Close';

const ShowPicture = (props) => {
    const handleClose = () => {
        props.openWindow(false);
    }
    return (
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            {props && <img src={`${config.BACKEND_URL}/product/image/${props.picture}`} width={'90%'} alt={'picture'}/>}
            <DialogActions>
                <CloseIcon onClick={handleClose}
                           style={{ cursor: 'pointer', position: 'absolute', top: '20px', right: '20px' }}/>
            </DialogActions>
        </div>
    );
};

export default ShowPicture;