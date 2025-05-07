import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/create', createTask);
router.get('/:projectId', getTasks);
router.patch('/update/:taskId', updateTask)
router.delete('/delete/:taskId', deleteTask);

export default router;
