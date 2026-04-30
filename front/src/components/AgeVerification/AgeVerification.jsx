import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { LangSwitcher } from '../index';
import './AgeVerification.css';

const AgeVerification = () => {
    const [open, setOpen] = useState(true);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
        outline: 'none'
    };
    const { t } = useTranslation();

    return (
        <Modal open={open} onClose={() => {
        }} slotProps={{
            backdrop: {
                sx: {
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        }}>
            <Box sx={style}>
                <div className={'top_wrapper'}>
                    <h3>{t('ageVerification')}</h3>
                    <LangSwitcher/>
                </div>
                <Typography variant={'h5'} component={'h2'} gutterBottom fontWeight={'bold'}>
                    {t('areYou18')}
                </Typography>
                <Typography sx={{ mt: 2, mb: 4, color: 'gray' }}>
                    {t('18verification')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => setOpen(false)}
                        sx={{ px: 4 }}
                    >
                        {t('im18')}
                    </Button>
                    <Button
                        variant={'outlined'}
                        color={'error'}
                        onClick={() => window.location.href = 'https://www.google.com'}
                    >
                        {t('no')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AgeVerification;