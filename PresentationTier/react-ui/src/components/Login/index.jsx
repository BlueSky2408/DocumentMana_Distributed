import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { Form } from './Form';
import styles from './styles.module.css'
import Logo from '../../images/logo.png';
import { fetchLogin } from '../../reducers/login';

const LoginContainers = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialForm = {
        email: "",
        password: "",
    }
    const [loginForm, setLoginForm] = useState(initialForm);
    const { email, password } = loginForm;

    const handleInputChange = event => {
        setLoginForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchLogin({ params: loginForm, navigate: navigate }))
        setLoginForm(initialForm);
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.logoContainer}>
                <img alt="Logo" src={Logo} className={styles.logo} />
                <p className={styles.logoName}>DocDrive</p>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Box sx={{ paddingLeft: '10px' }}>
                        <Typography className={styles.textBlack} variant="h4" gutterBottom>
                            Create an account with us and you will be able to:
                        </Typography>
                        <p className={styles.textPara}>  - Archive your file easily <br />
                            - Manage and share files <br />
                            - Track new uploading files <br />
                            - Decentralize files</p>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Form handleInputChange={handleInputChange} email={email} password={password} handleSubmit={handleSubmit} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default LoginContainers;