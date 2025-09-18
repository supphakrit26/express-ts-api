import { Request, Response } from 'express';

export async function getProfile(req: Request, res: Response) {
  // user attached by middleware
  const anyReq: any = req;
  if (!anyReq.user) return res.status(404).json({ error: 'User not found' });
  const { passwordHash, ...safeUser } = anyReq.user as any;
  res.json({ user: safeUser });
}
