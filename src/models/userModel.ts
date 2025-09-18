import { Database } from 'sqlite';

export interface User {
  id?: number;
  email: string;
  passwordHash: string;
}

export async function createUsersTable(db: Database): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL
    )`;
  await db.run(sql);
}

export async function findUserByEmail(db: Database, email: string): Promise<User | null> {
  const row = await db.get('SELECT id, email, passwordHash FROM users WHERE email = ?', [email]);
  if (!row) return null;
  return { id: row.id, email: row.email, passwordHash: row.passwordHash };
}

export async function createUser(db: Database, email: string, passwordHash: string): Promise<User> {
  const result = await db.run('INSERT INTO users (email, passwordHash) VALUES (?, ?)', [email, passwordHash]);
  // result may contain lastID
  // @ts-ignore - sqlite RunResult typing
  return { id: (result as any).lastID, email, passwordHash };
}
