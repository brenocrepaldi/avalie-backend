import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { dbCollections } from '../db/index';
import { professorSchema } from '../models/professor-model';

const router = Router();

// Get all professors
router.get('/', async (req, res) => {
	try {
		const professors = await dbCollections.professor.find().toArray();
		res.status(200).json(professors);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch professors', details: error.message });
	}
});

// Get a professor
router.get('/:id', async (req, res) => {
	const professorId = req.params['id'];
	try {
		const professor = await dbCollections.professor.findOne({
			_id: new ObjectId(professorId),
		});
		if (!professor) res.status(404).json({ error: 'Professor not found' });

		res.status(200).json(professor);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch professor', details: error.message });
	}
});

// Insert a professor
router.post('/', async (req, res) => {
	try {
		const professorData = professorSchema.parse(req.body);
		const result = await dbCollections.professor.insertOne(professorData);

		if (result.acknowledged) {
			res.status(201).json({
				message: 'Professor inserted successfully',
				id: result.insertedId,
			});
		} else {
			res.status(500).json({ error: 'Failed to insert professor' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to insert professor', details: error.message });
	}
});

// Update a professor
router.put('/:id', async (req, res) => {
	try {
		const professorId = req.params['id'];
		const professorData = professorSchema.parse(req.body);

		const result = await dbCollections.professor.updateOne(
			{ _id: new ObjectId(professorId) },
			{
				$set: {
					ra: professorData.ra,
					name: professorData.name,
					email: professorData.email,
					password: professorData.password,
					disciplines: professorData.disciplines,
					accessLevel: professorData.accessLevel,
					active: professorData.active,
				},
			}
		);

		if (result.modifiedCount > 0) {
			res.status(200).json({
				message: 'Professor updated successfully',
				id: professorId,
			});
		} else if (result.matchedCount > 0) {
			res.status(200).json({ message: 'Professor already up-to-date' });
		} else {
			res.status(404).json({ error: 'Professor not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to update professor', details: error.message });
	}
});

// Delete a professor
router.delete('/:id', async (req, res) => {
	try {
		const professorId = req.params['id'];

		const result = await dbCollections.professor.deleteOne({
			_id: new ObjectId(professorId),
		});

		if (result.deletedCount > 0) {
			res
				.status(200)
				.json({ message: 'Professor deleted successfully', id: professorId });
		} else {
			res.status(404).json({ error: 'Professor not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to delete professor', details: error.message });
	}
});

export default router;
