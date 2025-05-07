import React from 'react';
import { Container, Box } from '@mui/material';
import SignupForm from '../components/SignupForm';

const Signup: React.FC = () => {
    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <SignupForm />
            </Box>
        </Container>
    );
};

export default Signup;
