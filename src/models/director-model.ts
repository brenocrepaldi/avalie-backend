import { z } from 'zod';

export const directorSchema = z.object({
	ra: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	course: z.string(),
	active: z.boolean(),
	accessLevel: z.number(),
});
