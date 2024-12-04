import { Router } from 'express';
import courseRoutes from './course-routes';
import directorRoutes from './director-routes';
import disciplineRoutes from './discipline-routes';

const router = Router();

router.use('/course', courseRoutes);
router.use('/director', directorRoutes);
router.use('/disciplines', disciplineRoutes);

export default router;
