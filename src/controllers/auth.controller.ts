import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/auth.service';


// GET /api/users
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.findAll();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.findById(req.user?.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// POST /api/users/login
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Username and password are required' });
      return;
    }
    const result = await userService.login({ username, password });
    console.log('Login successful for user:', result.token);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false, // HTTPS only in production
      sameSite: 'lax', // works on localhost
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};


