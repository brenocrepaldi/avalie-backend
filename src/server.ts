import express from 'express';
import routes from './routes';
import { env } from './env';

const app = express();

// Middleware para usar rotas
app.use(express.json()); // Para lidar com JSON no corpo da requisição
app.use(routes);

app.listen({ port: env.PORT }, () => {
	console.log('Server running...');
});
