import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { dbCollections } from '../db/index';
import { studentSchema } from '../models/student-model';

const router = Router();

// Get all students
router.get('/', async (req, res) => {
	try {
		const students = await dbCollections.student.find().toArray();
		res.status(200).json(students);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch students', details: error.message });
	}
});

// Get a student
router.get('/:id', async (req, res) => {
	const studentId = req.params['id'];
	try {
		const student = await dbCollections.student.findOne({
			_id: new ObjectId(studentId),
		});
		if (!student) res.status(404).json({ error: 'Student not found' });

		res.status(200).json(student);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch student', details: error.message });
	}
});

// Insert a student
router.post('/', async (req, res) => {
	try {
		const studentData = studentSchema.parse(req.body);
		const result = await dbCollections.student.insertOne(studentData);

		if (result.acknowledged) {
			res.status(201).json({
				message: 'Student inserted successfully',
				id: result.insertedId,
			});
		} else {
			res.status(500).json({ error: 'Failed to insert student' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to insert student', details: error.message });
	}
});

// Update a student
router.put('/:id', async (req, res) => {
	try {
		const studentId = req.params['id'];
		const studentData = studentSchema.parse(req.body);

		const result = await dbCollections.student.updateOne(
			{ _id: new ObjectId(studentId) },
			{
				$set: {
					ra: studentData.ra,
					name: studentData.name,
					email: studentData.email,
					password: studentData.password,
					course: studentData.course,
					active: studentData.active,
					accessLevel: studentData.accessLevel,
				},
			}
		);

		if (result.modifiedCount > 0) {
			res.status(200).json({
				message: 'Student updated successfully',
				id: studentId,
			});
		} else if (result.matchedCount > 0) {
			res.status(200).json({ message: 'Student already up-to-date' });
		} else {
			res.status(404).json({ error: 'Student not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to update student', details: error.message });
	}
});

// Delete a student
router.delete('/:id', async (req, res) => {
	try {
		const studentId = req.params['id'];

		const result = await dbCollections.student.deleteOne({
			_id: new ObjectId(studentId),
		});

		if (result.deletedCount > 0) {
			res
				.status(200)
				.json({ message: 'Student deleted successfully', id: studentId });
		} else {
			res.status(404).json({ error: 'Student not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to delete student', details: error.message });
	}
});

export default router;
