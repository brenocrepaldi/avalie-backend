import express from 'express';

import { connectDB } from './db';
import { env } from './env';

import courseRoutes from './routes/course-routes';
import directorRoutes from './routes/director-routes';
import disciplineRoutes from './routes/discipline-routes';
import feedbackRoutes from './routes/feedback-routes';
import professorRoutes from './routes/professor-routes';
import studentRoutes from './routes/student-routes';

const app = express();

// Middleware to use routes
app.use(express.json());

// Routes
app.use('/course', courseRoutes);
app.use('/director', directorRoutes);
app.use('/discipline', disciplineRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/professor', professorRoutes);
app.use('/student', studentRoutes);

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
