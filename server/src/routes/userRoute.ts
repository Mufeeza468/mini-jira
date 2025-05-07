import { Router } from 'express';
import { getUsers, login, signup } from '../controllers/userController';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/all', getUsers)

export default router;
