import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Database } from 'sqlite';
import { findUserById } from '../models/userModel';

// Read secret at runtime
const getJWTSecret = () => process.env.JWT_SECRET || 'change-this-secret';

export interface AuthRequest extends Request {
  user?: any;
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  const token = auth.slice(7);
  try {
  const payload: any = jwt.verify(token, getJWTSecret());
    const db: Database = req.app.get('db');
    const user = await findUserById(db, payload.sub);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
