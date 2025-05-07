import { Box, CircularProgress, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteProject, getUserProjects } from '../api/project';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import { toast, ToastContainer } from 'react-toastify';
const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getUserProjects();
                setProjects(response.projects);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleEdit = (projectId: string) => {
        console.log('Edit project with id:', projectId);
    };


    const handleDelete = async (projectId: string) => {
        try {
            const confirmation = window.confirm("Are you sure you want to delete this project?");
            if (confirmation) {
                const response = await deleteProject(projectId);
                toast.success(response.message || 'Project Deleted Successfully');
                setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
            toast.error('Failed to delete project');
        }
    };

    return (
        <> <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', p: 2 }}>
            <Navbar />
            <Container maxWidth="lg">
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={3}
                        marginTop={6}
                    >
                        {projects.map((project) => (
                            <Box
                                key={project._id}
                                sx={{
                                    width: { xs: '100%', sm: '48%', md: '30%' },
                                    marginBottom: 2
                                }}
                            >
                                <ProjectCard
                                    name={project.name}
                                    description={project.description}
                                    projectId={project._id}
                                    onEdit={() => handleEdit(project._id)}
                                    onDelete={() => handleDelete(project._id)}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
            <ToastContainer />
        </>

    );
};

export default Dashboard;
