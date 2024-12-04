import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { dbCollections } from '../db/index';
import { courseSchema } from '../models/course-model';

const router = Router();

// Get all courses
router.get('/', async (req, res) => {
	try {
		const courses = await dbCollections.course.find().toArray();
		res.status(200).json(courses);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch courses', details: error.message });
	}
});

// Get a course
router.get('/:id', async (req, res) => {
	const courseId = req.params['id'];
	try {
		const course = await dbCollections.course.findOne({
			_id: new ObjectId(courseId),
		});
		if (!course) res.status(404).json({ error: 'Course not found' });

		res.status(200).json(course);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch course', details: error.message });
	}
});

// Insert a course
router.post('/', async (req, res) => {
	try {
		const courseData = courseSchema.parse(req.body);
		const result = await dbCollections.course.insertOne(courseData);

		if (result.acknowledged) {
			res.status(201).json({
				message: 'Course inserted successfully',
				id: result.insertedId,
			});
		} else {
			res.status(500).json({ error: 'Failed to insert course' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to insert course', details: error.message });
	}
});

// Update a course
router.put('/:id', async (req, res) => {
	try {
		const courseId = req.params['id'];
		const courseData = courseSchema.parse(req.body);

		const result = await dbCollections.course.updateOne(
			{ _id: new ObjectId(courseId) },
			{ $set: { name: courseData.name, active: courseData.active } }
		);

		if (result.modifiedCount > 0) {
			res.status(200).json({
				message: 'Course updated successfully',
				id: courseId,
			});
		} else if (result.matchedCount > 0) {
			res.status(200).json({ message: 'Course already up-to-date' });
		} else {
			res.status(404).json({ error: 'Course not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to update course', details: error.message });
	}
});

// Delete a course
router.delete('/:id', async (req, res) => {
	try {
		const courseId = req.params['id'];

		const result = await dbCollections.course.deleteOne({
			_id: new ObjectId(courseId),
		});

		if (result.deletedCount > 0) {
			res
				.status(200)
				.json({ message: 'Course deleted successfully', id: courseId });
		} else {
			res.status(404).json({ error: 'Course not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to delete course', details: error.message });
	}
});

export default router;
