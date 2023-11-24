import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';


import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
//import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button, Icon, IconButton } from '@mui/material';
import Logo from '../../images/logo.png';
import styles from './style.module.css';
import { useSelector } from 'react-redux';

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);
    const navigate = useNavigate();

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);



    const searchIconClick = () => {
        // Handle search icon click
    };

    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER_INFO');
        navigate('/login');
    };

    return (
        <Box className={styles.header}>
            <Box className={styles.logoContainer}>
                <img alt="Logo" src={Logo} className={styles.logo} />
                <p className={styles.logoName}>DocDrive</p>
            </Box>

            <Box className={styles.searchBar}>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search"
                />
                <SearchIcon className={styles.searchIcon} onClick={searchIconClick} />
            </Box>

            <Box className={styles.iconsContainer}>
                <IconButton onClick={toggleOptions}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                </IconButton>
                {showOptions && (
                    <Box className={styles.optionList} ref={optionsRef}>
                        <Box className={styles.submenu}>
                            <Box className={styles.userinfo}>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                                <Typography variant="h6" className={styles.userinfo}>User</Typography>
                            </Box>

                            <Divider className={styles.divider} />

                            <Link to="/home" className={styles.submenuLink}>
                                <AccountCircleIcon className={styles.submenuIcon} />
                                <Typography variant="body1" className={styles.submenuText}>Edit Profile</Typography>
                                <span>&gt;</span>
                            </Link>
                            <Link to="/home" className={styles.submenuLink}>
                                <SettingsIcon className={styles.submenuIcon} />
                                <Typography variant="body1" className={styles.submenuText}>Setting</Typography>
                                <span>&gt;</span>
                            </Link>
                            <Link to="/login" className={styles.submenuLink} onClick={handleLogout}>
                                <LogoutIcon className={styles.submenuIcon} />
                                <Typography variant="body1" className={styles.submenuText}>Log Out</Typography>
                                <span>&gt;</span>
                            </Link>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Header;
