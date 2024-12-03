import { Router } from 'express';

const router = Router();

// List courses
router.get('/', (req, res) => {
	res.send('List of Courses');
});

// Create course
router.post('/', (req, res) => {
	res.send('Course Created');
});

export default router;
