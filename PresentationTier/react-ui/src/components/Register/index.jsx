import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
import styles from './styles.module.css'
import { Form } from './Form';
import { fetchRegister } from '../../reducers/login';
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const RegisterContainer = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialForm = {
        username: "",
        email: "",
        password: "",
    };
    const [registerForm, setRegisterForm] = useState(initialForm);
    const { username, email, password } = registerForm;
    const handleInputChange = event => {
        setRegisterForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (registerForm.password !== registerForm.rePassword) {
        //     console.log("Password and Confirm Password must be the same")
        // }
        dispatch(fetchRegister({ params: registerForm, navigate: navigate }))
        setRegisterForm(initialForm);
    }

    return (
        <Box className={styles.container}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Box sx={{ paddingLeft: '10px' }}>
                        <Typography className={styles.textBlue} variant="h4" gutterBottom>
                            Welcome!
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom className={styles.description}>
                            By logging into DMS, you acknowledge that you have reviewed the <br /> <strong>Terms</strong> & <strong>Conditions</strong> and <strong>Privacy Policy</strong> and agree to comply with the <br /> <strong>Term</strong> & <strong>Conditions</strong>.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Form handleInputChange={handleInputChange} username={username} email={email} password={password} handleSubmit={handleSubmit} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RegisterContainer;