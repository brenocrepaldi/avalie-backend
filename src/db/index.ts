import { env } from '../env';

const { MongoClient } = require('mongodb');

const uri = env.DATABASE_STR_CONN;

export const client = new MongoClient(uri);

export async function connectDB() {
	try {
		await client.connect(); // Connect to the cluster
		console.log('Connected to MongoDB');
		return client;
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		throw error;
	}
}
