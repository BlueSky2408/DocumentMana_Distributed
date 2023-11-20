import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './styles.module.css'
import { Grid, TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";

export const Form = (props) => {
    const { children, value, index,
        handleInputChange,
        email, password,
        handleSubmit,
        ...other } = props;
    return (
        <Box className={styles.formContainer}>
            <Typography variant="h4" gutterBottom className={styles.title}>
                Login
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
                                    onChange={event => handleInputChange(event)}
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
                                    onChange={event => handleInputChange(event)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12} className={styles.label}>
                <Grid container className={styles.centerBox}>
                    <Grid item xs={8}>
                        If you don't have exist account, please register <Link to="/register">here</Link>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                        <Button className={styles.btnBlue} variant="contained" onClick={(event) => handleSubmit(event)}>Login</Button>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
