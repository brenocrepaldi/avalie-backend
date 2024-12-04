import { Router } from 'express';
import courseRoutes from './course-routes';
import directorRoutes from './director-routes';

const router = Router();

router.use('/course', courseRoutes);
router.use('/director', directorRoutes);

export default router;
