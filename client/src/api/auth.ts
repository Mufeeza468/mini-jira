import axios from 'axios';

export const signupUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/signup', {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || 'Login failed');
    }
};


export const getAllUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users/all', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};