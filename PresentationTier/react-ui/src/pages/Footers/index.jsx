import React from 'react'
import Box from '@mui/material/Box';
import styles from './styles.module.css'
export default function Footers(props) {
    const { children, value, index, ...other} = props;
    return (

        <Box className={styles.containerFooter}>
            <p>
                2023 @ <strong>Group09</strong> All Right Reserved
            </p>
        </Box >

    )
}
