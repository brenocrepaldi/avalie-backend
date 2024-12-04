import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { dbCollections } from '../db/index';
import { disciplineSchema } from '../models/discipline-model';

const router = Router();

// Get all disciplines
router.get('/', async (req, res) => {
	try {
		const disciplines = await dbCollections.disciplines.find().toArray();
		res.status(200).json(disciplines);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch disciplines', details: error.message });
	}
});

// Get a discipline
router.get('/:id', async (req, res) => {
	const disciplineId = req.params['id'];
	try {
		const discipline = await dbCollections.disciplines.findOne({
			_id: new ObjectId(disciplineId),
		});
		if (!discipline) res.status(404).json({ error: 'discipline not found' });

		res.status(200).json(discipline);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch discipline', details: error.message });
	}
});

// Insert a discipline
router.post('/', async (req, res) => {
	try {
		const disciplineData = disciplineSchema.parse(req.body);
		const result = await dbCollections.disciplines.insertOne(disciplineData);

		if (result.acknowledged) {
			res.status(201).json({
				message: 'Discipline inserted successfully',
				id: result.insertedId,
			});
		} else {
			res.status(500).json({ error: 'Failed to insert discipline' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to insert discipline', details: error.message });
	}
});

// Update a discipline
router.put('/:id', async (req, res) => {
	try {
		const disciplineId = req.params['id'];
		const disciplineData = disciplineSchema.parse(req.body);

		const result = await dbCollections.disciplines.updateOne(
			{ _id: new ObjectId(disciplineId) },
			{
				$set: {
					name: disciplineData.name,
					start_time: disciplineData.start_time,
					end_time: disciplineData.end_time,
					course: disciplineData.course,
					active: disciplineData.active,
				},
			}
		);

		if (result.modifiedCount > 0) {
			res.status(200).json({
				message: 'Discipline updated successfully',
				id: disciplineId,
			});
		} else if (result.matchedCount > 0) {
			res.status(200).json({ message: 'Discipline already up-to-date' });
		} else {
			res.status(404).json({ error: 'Discipline not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to update discipline', details: error.message });
	}
});

// Delete a discipline
router.delete('/:id', async (req, res) => {
	try {
		const disciplineId = req.params['id'];

		const result = await dbCollections.disciplines.deleteOne({
			_id: new ObjectId(disciplineId),
		});

		if (result.deletedCount > 0) {
			res
				.status(200)
				.json({ message: 'Discipline deleted successfully', id: disciplineId });
		} else {
			res.status(404).json({ error: 'Discipline not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to delete discipline', details: error.message });
	}
});

export default router;
