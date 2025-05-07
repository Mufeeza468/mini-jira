import { Request, Response } from 'express';
import Project from '../models/projectModel';

// Create Project
export const createProject = async (req: Request, res: Response): Promise<void> => {
    const { name, description } = req.body;
    const userId = req.userId;
    if (!name || !description) {
        res.status(400).json({ message: 'Name and description are required' });
        return;
    }

    try {
        const newProject = new Project({
            name,
            description,
            user: userId,
        });

        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//get users project
export const getProjects = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    try {
        const projects = await Project.find({ user: userId });

        if (!projects || projects.length === 0) {
            res.status(404).json({ message: 'No projects found for this user' });
            return;
        }
        res.status(200).json({ projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//updating project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { projectId } = req.params;
    const { name, description } = req.body;

    try {
        const project = await Project.findOne({ _id: projectId, user: userId });

        if (!project) {
            res.status(404).json({ message: 'Project not found or not authorized' });
            return;
        }

        if (name) project.name = name;
        if (description) project.description = description;

        await project.save();

        res.status(200).json({
            message: 'Project updated successfully',
            project,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


//deleting project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { projectId } = req.params;

    try {
        const project = await Project.findOne({ _id: projectId, user: userId });

        if (!project) {
            res.status(404).json({ message: 'Project not found or not authorized' });
            return;
        }

        await Project.findByIdAndDelete(projectId);

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};