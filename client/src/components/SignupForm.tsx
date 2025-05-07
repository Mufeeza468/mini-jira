import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import { signupUser } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        if (!name || !email || !password) {
            toast.error('Please fill in all fields!');
            return;
        }

        try {
            const response = await signupUser(name, email, password);
            setMessage(`Success: ${response.message}`);
            toast.success('Signup successful!');
            navigate('/login');
        } catch (error: any) {
            setMessage(error.message);
            toast.error('Signup failed!');
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
                    Sign Up
                </Typography>
                {message && <Alert severity={message.startsWith('Success') ? 'success' : 'error'}>{message}</Alert>}
                <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    Already have an account?{' '}
                    <Link href="/login" variant="body2" sx={{ cursor: 'pointer' }}>
                        Log In
                    </Link>
                </Typography>

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Sign Up
                </Button>


            </Box>



            <ToastContainer />
        </>
    );
};

export default SignupForm;
