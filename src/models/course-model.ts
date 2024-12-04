import { z } from 'zod';

export const courseSchema = z.object({
	name: z.string(),
	active: z.boolean(),
});
