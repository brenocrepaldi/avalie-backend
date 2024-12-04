import { z } from 'zod';

export const disciplineSchema = z.object({
	name: z.string(),
	start_time: z.coerce.date(),
	end_time: z.coerce.date(),
	course: z.string(),
	active: z.boolean(),
});
