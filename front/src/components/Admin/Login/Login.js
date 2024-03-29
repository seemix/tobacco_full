import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../../store/auth';
import './Login.css';

const Login = () => {

    const dispatch = useDispatch();
    const { auth, status, error } = useSelector(state => state.authStore);
    const sendForm = (data) => {
        dispatch(login(data));
    };
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div>
            <Container maxWidth="xs">
                <Box className={'login_box'}>
                    <Avatar sx={{ m: 1, width: 56, height: 56 }}>
                        <LockPersonIcon/>
                    </Avatar>
                    <Typography component="h4" variant="h6">
                        Admin dashboard
                    </Typography>
                    <Box sx={{ mt: 1, width: '300px' }}>
                        <form onSubmit={handleSubmit((data) => sendForm(data))}>
                            <TextField
                                className={'TextField-without-border-radius'}
                                margin={'normal'}
                                label={'login'}
                                variant={'outlined'}
                                fullWidth
                                autoComplete="login"
                                {...register('login', {
                                    required: 'This field is required'
                                })}
                                error={!!errors.email}
                                helperText={errors?.email ? errors.email.message : null}
                            />
                            <TextField
                                className={'TextField-without-border-radius'}
                                margin={'normal'}
                                label={'password'}
                                variant={'outlined'}
                                fullWidth
                                type={'password'}
                                autoComplete="password"
                                {...register('password', {
                                    required: 'This field is required'
                                })}
                                error={!!errors.password}
                                helperText={errors?.password ? errors.password.message : null}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >Login
                            </Button>
                        </form>
                    </Box>
                    {status === 'error' && error ? <Alert severity={'error'}>{error}</Alert> : ''}
                    {auth ?
                        <>
                            <Alert severity={'success'}>Login success!!!</Alert>
                            <Navigate to={'/admin'}/></>
                        : ''}
                </Box>
            </Container>
        </div>
    );
};
export default Login;