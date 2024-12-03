import { Router } from 'express';
import { dbCollections } from '../db/index';

const router = Router();

// List courses
router.get('/getCourses', async (req, res) => {
	try {
		const courses = await dbCollections.course.find().toArray();
		res.status(200).json(courses); 
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch courses', details: error.message });
	}
});

// Create course
router.post('/', (req, res) => {
	res.send('Course Created');
});

export default router;
