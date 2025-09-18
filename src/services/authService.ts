import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Database } from 'sqlite';
import { findUserByEmail, createUser, User } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

export async function register(db: Database, email: string, password: string, profile: Partial<User> = {}) {
  const existing = await findUserByEmail(db, email);
  if (existing) throw new Error('Email already in use');
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await createUser(db, email, hash, profile);
  const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  // don't include passwordHash in returned user
  const { passwordHash, ...safeUser } = user as any;
  return { user: safeUser, token };
}

export async function login(db: Database, email: string, password: string) {
  const user = await findUserByEmail(db, email);
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');
  const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  const { passwordHash, ...safeUser } = user as any;
  return { user: safeUser, token };
}
