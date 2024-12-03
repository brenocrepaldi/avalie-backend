import { Router } from 'express';
import coursesRoutes from './course';

const router = Router();

router.use('/courses', coursesRoutes);

export default router;
