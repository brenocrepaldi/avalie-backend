import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { dbCollections } from '../db/index';
import { directorSchema } from '../models/director-model';

const router = Router();

// Get all directors
router.get('/', async (req, res) => {
	try {
		const directors = await dbCollections.director.find().toArray();
		res.status(200).json(directors);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch directors', details: error.message });
	}
});

// Get a director
router.get('/:id', async (req, res) => {
	const directorId = req.params['id'];
	try {
		const director = await dbCollections.director.findOne({
			_id: new ObjectId(directorId),
		});
		if (!director) res.status(404).json({ error: 'Director not found' });

		res.status(200).json(director);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch director', details: error.message });
	}
});

// Insert a director
router.post('/', async (req, res) => {
	try {
		const directorData = directorSchema.parse(req.body);
		const result = await dbCollections.director.insertOne(directorData);

		if (result.acknowledged) {
			res.status(201).json({
				message: 'Director inserted successfully',
				id: result.insertedId,
			});
		} else {
			res.status(500).json({ error: 'Failed to insert director' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to insert director', details: error.message });
	}
});

// Update a director
router.put('/:id', async (req, res) => {
	try {
		const directorId = req.params['id'];
		const directorData = directorSchema.parse(req.body);

		const result = await dbCollections.director.updateOne(
			{ _id: new ObjectId(directorId) },
			{
				$set: {
					ra: directorData.ra,
					name: directorData.name,
					email: directorData.email,
					password: directorData.password,
					course: directorData.course,
					active: directorData.active,
					accessLevel: directorData.accessLevel,
				},
			}
		);

		if (result.modifiedCount > 0) {
			res.status(200).json({
				message: 'Director updated successfully',
				id: directorId,
			});
		} else if (result.matchedCount > 0) {
			res.status(200).json({ message: 'Director already up-to-date' });
		} else {
			res.status(404).json({ error: 'Director not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to update director', details: error.message });
	}
});

// Delete a director
router.delete('/:id', async (req, res) => {
	try {
		const directorId = req.params['id'];

		const result = await dbCollections.director.deleteOne({
			_id: new ObjectId(directorId),
		});

		if (result.deletedCount > 0) {
			res
				.status(200)
				.json({ message: 'Director deleted successfully', id: directorId });
		} else {
			res.status(404).json({ error: 'Director not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to delete director', details: error.message });
	}
});

export default router;
