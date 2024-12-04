import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { dbCollections } from '../db/index';
import { feedbackSchema } from '../models/feedback-model';

const router = Router();

// Get all feedbacks
router.get('/', async (req, res) => {
	try {
		const feedbacks = await dbCollections.feedback.find().toArray();
		res.status(200).json(feedbacks);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch feedbacks', details: error.message });
	}
});

// Get a feedback
router.get('/:id', async (req, res) => {
	const feedbackId = req.params['id'];
	try {
		const feedback = await dbCollections.feedback.findOne({
			_id: new ObjectId(feedbackId),
		});
		if (!feedback) res.status(404).json({ error: 'Feedback not found' });

		res.status(200).json(feedback);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to fetch feedback', details: error.message });
	}
});

// Insert a feedback
router.post('/', async (req, res) => {
	try {
		const feedbackData = feedbackSchema.parse(req.body);
		const result = await dbCollections.feedback.insertOne(feedbackData);

		if (result.acknowledged) {
			res.status(201).json({
				message: 'Feedback inserted successfully',
				id: result.insertedId,
			});
		} else {
			res.status(500).json({ error: 'Failed to insert feedback' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to insert feedback', details: error.message });
	}
});

// Update a feedback
router.put('/:id', async (req, res) => {
	try {
		const feedbackId = req.params['id'];
		const feedbackData = feedbackSchema.parse(req.body);

		const result = await dbCollections.feedback.updateOne(
			{ _id: new ObjectId(feedbackId) },
			{
				$set: {
					rating: feedbackData.rating,
					text: feedbackData.text,
					student: feedbackData.student,
					discipline: feedbackData.discipline,
					date: feedbackData.date,
				},
			}
		);

		if (result.modifiedCount > 0) {
			res.status(200).json({
				message: 'Feedback updated successfully',
				id: feedbackId,
			});
		} else if (result.matchedCount > 0) {
			res.status(200).json({ message: 'Feedback already up-to-date' });
		} else {
			res.status(404).json({ error: 'Feedback not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to update feedback', details: error.message });
	}
});

// Delete a feedback
router.delete('/:id', async (req, res) => {
	try {
		const feedbackId = req.params['id'];

		const result = await dbCollections.feedback.deleteOne({
			_id: new ObjectId(feedbackId),
		});

		if (result.deletedCount > 0) {
			res
				.status(200)
				.json({ message: 'Feedback deleted successfully', id: feedbackId });
		} else {
			res.status(404).json({ error: 'Feedback not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to delete feedback', details: error.message });
	}
});

export default router;
