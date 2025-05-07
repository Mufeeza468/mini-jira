import { Request, Response } from 'express';
import Task from '../models/taskModel';
import Project from '../models/projectModel';
import User from '../models/userModel';

// Creating
export const createTask = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { title, status, projectId } = req.body;

    if (!title || !projectId) {
        res.status(400).json({ message: 'Title, and projectId are required' });
        return;
    }

    try {
        const project = await Project.findOne({ _id: projectId, user: userId });

        if (!project) {
            res.status(404).json({ message: 'Project not found or not authorized' });
            return;
        }

        const newTask = await Task.create({
            title,
            status: status || 'todo',
            project: projectId,
        });

        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks for a specific project
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { projectId } = req.params;

    try {
        const project = await Project.findOne({ _id: projectId, user: userId });
        if (!project) {
            res.status(404).json({ message: 'Project not found or not authorized' });
            return;
        }

        const tasks = await Task.find({ project: projectId });
        res.status(200).json({ tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { taskId } = req.params;
    const { title, status, assignedTo } = req.body;

    try {
        const task = await Task.findById(taskId).populate('project');
        if (!task || (task.project as any).user.toString() !== userId) {
            res.status(404).json({ message: 'Task not found or not authorized' });
            return;
        }

        if (title) task.title = title;
        if (status) task.status = status;
        if (assignedTo) task.assignedTo = assignedTo;

        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId).populate('project');
        if (!task || (task.project as any).user.toString() !== userId) {
            res.status(404).json({ message: 'Task not found or not authorized' });
            return;
        }

        await Task.findByIdAndDelete();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};