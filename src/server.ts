import express from 'express';
import routes from './routes';
import { env } from './env';
import { connectDB } from './db';

const app = express();

// Middleware to use routes
app.use(express.json());
app.use(routes);

// Database connection
connectDB()
	.then(() => {
		app.listen({ port: env.PORT }, () => {
			console.log('Server running...');
		});
	})
	.catch((error) => {
		console.error(
			'Failed to start the server due to database connection issues',
			error
		);
		process.exit(1); // Ends process in case of critical error
	});
