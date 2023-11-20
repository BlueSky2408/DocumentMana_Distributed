import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './styles.module.css'
import { Grid, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { Link } from "react-router-dom";

export const Form = (props) => {
    const { children, value, index, handleInputChange, username, email, password, handleSubmit, ...other } = props;
    return (
        <Box className={styles.formContainer}>
            <Typography variant="h4" gutterBottom className={styles.title}>
                Create an account
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={styles.subtitle}>
                If you already have an account <a style={{ color: "#F16255" }}>login</a>
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
                                    fullWidth
                                    id="outlined-search"
                                    label="Username"
                                    type="username"
                                    value={username}
                                    name="username"
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
                                    fullWidth
                                    id="outlined-search"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    name="email"
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
                                    fullWidth
                                    id="outlined-search"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    name="password"
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
                                    fullWidth
                                    id="outlined-search"
                                    label="Confirm Password"
                                    type="password"
                                    
                                    name="rePassword"
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
