import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dbcontext } from './src/db/dbcontext';
import { TypeORMError } from 'typeorm';
import logger from './src/helpers/logger';
import noticiasRoutes from './src/routes/noticia.routes';

const app = express();

dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`error al iniciar la base de datos: ${err.message}`);
	});

//Configurar ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const port = process.env.PORT || 3000;

//noticias endpoint
app.use('/', noticiasRoutes);

app.listen(port, () => {
	console.log(`Servidor Express funcionando en http://localhost:${port} 🚀✅`);
});
