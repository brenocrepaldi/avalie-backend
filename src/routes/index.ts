import { Router } from 'express';
import courseRoutes from './course-routes';
import directorRoutes from './director-routes';
import disciplineRoutes from './discipline-routes';
import feedbackRoutes from './feedback-routes';
import professorRoutes from './professor-routes';
import studentRoutes from './student-routes';

const router = Router();

router.use('/course', courseRoutes);
router.use('/director', directorRoutes);
router.use('/discipline', disciplineRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/professor', professorRoutes);
router.use('/student', studentRoutes);

export default router;
