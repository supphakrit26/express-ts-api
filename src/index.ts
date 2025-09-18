import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import authRouter from './routes/authRoutes';
import { createUsersTable } from './models/userModel';

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

  // attach db to app so controllers can access it
  app.set('db', db);

  app.use('/auth', authRouter);

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
