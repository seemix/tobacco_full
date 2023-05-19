import React from 'react';
import { Card } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';

import contactImage from './1.webp';
import './Contacts.css';

const Contacts = () => {
    return (
        <div style={{ marginTop: '70px' }}>
            <div className={'image_container'}
                 style={{backgroundImage: `url(${contactImage})`}}
            >
                <div className={'image_overlay'}></div>
                <h2>CONTACTS</h2>
            </div>
            <div className={'content_container'}>
                <div className={'content_wrapper'} style={{marginTop: '50px'}}>

                    <Card className={'card'}>
                        <div className={'card_inside'}>
                            <div className={'icon_wrapper'}><PhoneAndroidIcon style={{ fontSize: '50px', color: '#4a3d35'}}/></div>
                            <h2>PHONE</h2>
                            <big>
                                <p>Toll-Free: 0803 - 080 - 3081</p>
                                <p>Fax: 0803 - 080 - 3082</p>
                            </big>
                        </div>
                    </Card>
                    <Card  className={'card'}>
                        <div className={'icon_wrapper'}><EmailIcon style={{ fontSize: '50px', color: '#4a3d35'}}/></div>
                        <h2>EMAIL</h2>
                        <big>
                            <p style={{textAlign:'center'}}>support@example.com</p>
                        </big>
                    </Card>
                    <Card  className={'card'}>
                        <div className={'icon_wrapper'}><TelegramIcon style={{ fontSize: '50px', color: '#4a3d35'}}/></div>
                        <h2>TELEGRAM</h2>
                        <big>
                            <p>Toll-Free: 0803 - 080 - 3081</p>
                            <p>Fax: 0803 - 080 - 3082</p>
                        </big>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contacts;