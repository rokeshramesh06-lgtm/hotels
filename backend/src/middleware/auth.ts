import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const restaurantOwnerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.role !== 'restaurant_owner' && req.role !== 'admin') {
    return res.status(403).json({ error: 'Only restaurant owners can access this' });
  }
  next();
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can access this' });
  }
  next();
};
