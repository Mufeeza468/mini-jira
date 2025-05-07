import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
    name: string;
    description: string;
    projectId: string;
    onEdit: () => void;
    onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, projectId, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/tasks?projectId=${projectId}`);
    };

    return (
        <Card sx={{ maxWidth: 345, position: 'relative' }}>
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleViewDetails}>
                    View Details
                </Button>
            </CardActions>

            <IconButton
                onClick={onEdit}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'primary.main',
                }}
            >
                <EditIcon />
            </IconButton>

            <IconButton
                onClick={onDelete}
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    color: 'error.main',
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Card>
    );
};

export default ProjectCard;
