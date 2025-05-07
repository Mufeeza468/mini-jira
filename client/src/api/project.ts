
import axios from 'axios';

export const getUserProjects = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token found, please log in');
        }

        const response = await axios.get('http://localhost:5000/api/project', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch projects');
    }
};


export const deleteProject = async (projectId: string) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/project/delete/${projectId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete project:', error);
        throw new Error('Failed to delete project');
    }
};