import { env } from '../env';

const { MongoClient } = require('mongodb');

const uri = env.DATABASE_STR_CONN;

export const client = new MongoClient(uri);

export const db = client.db('avalie-db');

export const dbCollections = {
	course: db.collection('course'),
	director: db.collection('director'),
	discipline: db.collection('discipline'),
	feedback: db.collection('feedback'),
	professor: db.collection('professor'),
	student: db.collection('student'),
};

export async function connectDB() {
	try {
		await client.connect(); // Connects to the cluster
		console.log('Connected to MongoDB');
		return client;
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		throw error;
	}
}
