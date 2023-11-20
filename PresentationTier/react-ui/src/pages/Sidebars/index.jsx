import React, { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { fetchUploadDocuments } from '../../reducers/documents';


const Sidebars = () => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const fileInputRef = useRef(null);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        if (showOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    const handleFileUpload = async (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const formData = new FormData();
            formData.append('file', file);
            dispatch(fetchUploadDocuments(formData));
        }
    };


    return (
        <Box className={styles.container}>
            <Box className={styles.btnContainer}>
                <Button
                    className={styles.newButton}
                    variant="contained"
                    size="large"
                    onClick={toggleOptions}>
                    <span className={styles.plusIcon}>+</span> New
                </Button>
                {showOptions && (
                    <Box className={styles.showOptionsContainer} ref={optionsRef}>
                        {/* <Box className={styles.option}>New Folder</Box> */}
                        <Button className={styles.option} onClick={handleFileUpload}>
                            Upload File
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{
                                position: 'absolute',
                                left: '-9999px',
                            }}
                            onChange={handleChange}
                        />
                        {/* <Box className={styles.option}>Folder Upload</Box> */}
                    </Box>
                )}
            </Box>
        </Box>
    )
};

export default Sidebars;
