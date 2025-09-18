import { Request, Response } from 'express';
import { Database } from 'sqlite3';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response) {
  const db: Database = req.app.get('db');
  const { email, password } = req.body;
  try {
    const result = await authService.register(db, email, password);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const db: Database = req.app.get('db');
  const { email, password } = req.body;
  try {
    const result = await authService.login(db, email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
