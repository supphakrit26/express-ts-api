import { Database } from 'sqlite';

export interface User {
  id?: number;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  membershipCode?: string;
  membershipLevel?: string;
  registrationDate?: string; // ISO date string
  pointsBalance?: number;
}

export async function createUsersTable(db: Database): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      membershipCode TEXT,
      membershipLevel TEXT,
      registrationDate TEXT,
      pointsBalance INTEGER DEFAULT 0
    )`;
  await db.run(sql);
}

export async function findUserByEmail(db: Database, email: string): Promise<User | null> {
  const row = await db.get(
    'SELECT id, email, passwordHash, firstName, lastName, phone, membershipCode, membershipLevel, registrationDate, pointsBalance FROM users WHERE email = ?',
    [email]
  );
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    membershipCode: row.membershipCode,
    membershipLevel: row.membershipLevel,
    registrationDate: row.registrationDate,
    pointsBalance: row.pointsBalance,
  };
}

export async function createUser(
  db: Database,
  email: string,
  passwordHash: string,
  profile: Partial<User> = {}
): Promise<User> {
  const result = await db.run(
    'INSERT INTO users (email, passwordHash, firstName, lastName, phone, membershipCode, membershipLevel, registrationDate, pointsBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      email,
      passwordHash,
      profile.firstName || null,
      profile.lastName || null,
      profile.phone || null,
      profile.membershipCode || null,
      profile.membershipLevel || null,
      profile.registrationDate || null,
      profile.pointsBalance || 0,
    ]
  );
  // @ts-ignore - sqlite RunResult typing
  return {
    id: (result as any).lastID,
    email,
    passwordHash,
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone,
    membershipCode: profile.membershipCode,
    membershipLevel: profile.membershipLevel,
    registrationDate: profile.registrationDate,
    pointsBalance: profile.pointsBalance || 0,
  };
}

export async function findUserById(db: Database, id: number): Promise<User | null> {
  const row = await db.get(
    'SELECT id, email, passwordHash, firstName, lastName, phone, membershipCode, membershipLevel, registrationDate, pointsBalance FROM users WHERE id = ?',
    [id]
  );
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    membershipCode: row.membershipCode,
    membershipLevel: row.membershipLevel,
    registrationDate: row.registrationDate,
    pointsBalance: row.pointsBalance,
  };
}

export async function ensureUserColumns(db: Database): Promise<void> {
  // Get existing columns
  const rows: any[] = await db.all("PRAGMA table_info(users)");
  const existing = new Set(rows.map((r) => r.name));

  const alters: Array<{ col: string; def: string }> = [
    { col: 'firstName', def: 'TEXT' },
    { col: 'lastName', def: 'TEXT' },
    { col: 'phone', def: 'TEXT' },
    { col: 'membershipCode', def: 'TEXT' },
    { col: 'membershipLevel', def: 'TEXT' },
    { col: 'registrationDate', def: 'TEXT' },
    { col: 'pointsBalance', def: 'INTEGER DEFAULT 0' },
  ];

  for (const a of alters) {
    if (!existing.has(a.col)) {
      await db.run(`ALTER TABLE users ADD COLUMN ${a.col} ${a.def}`);
    }
  }
}
