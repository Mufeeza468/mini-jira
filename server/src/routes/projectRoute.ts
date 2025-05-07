import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController';

const router = Router();

router.use(authMiddleware);
router.post('/create', createProject);
router.get('/', getProjects);
router.patch('/update/:projectId', updateProject)
router.delete('/delete/:projectId', deleteProject);

export default router;
