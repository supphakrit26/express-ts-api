import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import authRouter from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { createUsersTable } from './models/userModel';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world' });
});

async function start() {
  const db = await open({
    filename: './dev.sqlite',
    driver: sqlite3.Database,
  });

  // ensure users table
  await createUsersTable(db as unknown as Database);
  // ensure new columns exist (migration)
  const { ensureUserColumns } = await import('./models/userModel');
  await ensureUserColumns(db as unknown as Database);

  // attach db to app so controllers can access it
  app.set('db', db);

  // serve swagger YAML and UI
  const swaggerDocument = YAML.load('./swagger.yml');
  // serve raw YAML file
  app.get('/swagger.yml', (req, res) => res.type('yaml').send(require('fs').readFileSync('./swagger.yml', 'utf8')));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/auth', authRouter);
  const profileRouter = (await import('./routes/profileRoutes')).default;
  app.use('/profile', profileRouter);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});
