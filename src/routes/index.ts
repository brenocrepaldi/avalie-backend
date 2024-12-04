import { Router } from 'express';
import courseRoutes from './course-routes';

const router = Router();

router.use('/course', courseRoutes);

export default router;
