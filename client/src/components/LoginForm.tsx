import { Alert, Box, Button, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../api/auth';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields!');
            return;
        }

        try {
            const response = await loginUser(email, password);
            setMessage(`Success: ${response.message}`);
            localStorage.setItem('token', response.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error: any) {
            setMessage(error.message);
            toast.error('Login failed!');
        }
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h5" textAlign="center" mb={2}>
                    Log In
                </Typography>
                {message && <Alert severity={message.startsWith('Success') ? 'success' : 'error'}>{message}</Alert>}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Typography textAlign="center" mt={2}>
                    Don't have an account?{' '}
                    <Link href="/" variant="body2" sx={{ cursor: 'pointer' }}>
                        Sign Up
                    </Link>
                </Typography>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Log In
                </Button>
            </Box>
            <ToastContainer />
        </>
    );
};

export default LoginForm;
