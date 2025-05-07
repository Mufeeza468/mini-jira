import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#2E3B55' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleLogoClick}>
                    Todo List
                </Typography>

                <IconButton onClick={handleProfileClick}>
                    <Avatar sx={{ backgroundColor: '#1976d2' }}>U</Avatar> {/* Replace 'U' with user's initials */}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
