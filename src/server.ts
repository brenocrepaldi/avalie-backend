import express from 'express';
import routes from './routes';
import { env } from './env';

const app = express();

// Middleware to use routes
app.use(express.json()); 
app.use(routes);

app.listen({ port: env.PORT }, () => {
	console.log('Server running...');
});
