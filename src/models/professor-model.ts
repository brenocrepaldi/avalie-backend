import { z } from 'zod';

export const professorSchema = z.object({
	ra: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	disciplines: z.array(z.string()),
	accessLevel: z.number(),
	active: z.boolean(),
});
