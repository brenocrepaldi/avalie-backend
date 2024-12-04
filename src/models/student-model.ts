import { z } from 'zod';

export const studentSchema = z.object({
	ra: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	course: z.string(),
	accessLevel: z.number(),
	active: z.boolean(),
});
