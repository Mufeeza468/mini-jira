import React from 'react';
import LoginForm from '../components/LoginForm';
import { Box, Container } from '@mui/material';


const LoginPage: React.FC = () => {
    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <LoginForm />
            </Box>
        </Container>
    );
};

export default LoginPage;
