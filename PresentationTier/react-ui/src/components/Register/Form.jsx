import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './styles.module.css'
import { Grid, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { Link } from "react-router-dom";

export const Form = (props) => {
    const { children, value, index, 
        handleInputChange, 
        username, email, password, rePassword, 
        handleSubmit, 
        ...other } = props;
    return (
        <Box className={styles.formContainer}>
            <Typography variant="h4" gutterBottom className={styles.title}>
                Create an account
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    padding: 0,
                    margin: 0,
                }}
                noValidate
                autoComplete="off"

            >
                <Grid container >
                    <Grid item xs={12} className={styles.label}>
                        <Grid container className={styles.centerBox}>
                            <Grid item xs={2}>
                                Username
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    name="username"
                                    value={username}
                                    fullWidth
                                    id="outlined-search"
                                    label="Username"
                                    type="username"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={styles.label}>
                        <Grid container className={styles.centerBox}>
                            <Grid item xs={2}>
                                Email
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    name="email"
                                    value={email}
                                    fullWidth
                                    id="outlined-search"
                                    label="Email"
                                    type="email"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={styles.label}>
                        <Grid container className={styles.centerBox}>
                            <Grid item xs={2}>
                                Password
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    name="password"
                                    value={password}
                                    fullWidth
                                    id="outlined-search"
                                    label="Password"
                                    type="password"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={styles.label}>
                        <Grid container className={styles.centerBox}>
                            <Grid item xs={2}>
                                Confirm Password
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    name="rePassword"
                                    value={rePassword}
                                    fullWidth
                                    id="outlined-search"
                                    label="Confirm Password"
                                    type="password"          
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12} className={styles.label}>
                <Grid container className={styles.centerBox}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="I have read and agree to DMS's Terms of Service and Privacy Policy" />
                    </FormGroup>
                </Grid>
            </Grid>
            <Grid item xs={12} className={styles.label}>
                <Grid container className={styles.centerBox}>
                    <Grid item xs={8}>
                        If you have already account, login <Link to="/login">here</Link>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                        <Button className={styles.btnBlue} variant="contained"
                            onClick={(event) => handleSubmit(event)}
                        >Register</Button>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
