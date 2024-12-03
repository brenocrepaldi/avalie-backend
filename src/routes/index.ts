import { Router } from 'express';
import coursesRoutes from './course';

const router = Router();

// Adicionar rotas individuais
router.use('/courses', coursesRoutes);

export default router;
