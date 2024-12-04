import { z } from 'zod';

export const feedbackSchema = z.object({
	rating: z.number(),
	text: z.string(),
	student: z.string(),
	discipline: z.string(),
	date: z.coerce.date(),
});
