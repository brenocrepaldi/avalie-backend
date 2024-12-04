import { Router } from 'express';
import courseRoutes from './course-routes';
import directorRoutes from './director-routes';
import disciplineRoutes from './discipline-routes';
import feedbackRoutes from './feedback-routes';

const router = Router();

router.use('/course', courseRoutes);
router.use('/director', directorRoutes);
router.use('/discipline', disciplineRoutes);
router.use('/feedback', feedbackRoutes);

export default router;
