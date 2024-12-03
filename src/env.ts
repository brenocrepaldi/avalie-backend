import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	API_BASE_URL: z.string().url(),
	WEB_BASE_URL: z.string().url(),
	DATABASE_STR_CONN: z.string(),
	PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
