import { Router } from 'express';

const router = Router();

// Rota para listar cursos
router.get('/', (req, res) => {
	res.send('List of Courses');
});

// Rota para criar um curso
router.post('/', (req, res) => {
	res.send('Course Created');
});

export default router;
