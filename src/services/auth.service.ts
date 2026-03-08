import jwt, { SignOptions } from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { AppError } from '../types/error';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface UpdateInput {
  name?: string;
  email?: string;
}

const signToken = (user: IUser): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new AppError('JWT_SECRET is not defined', 500);

  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    secret,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'] }
  );
};

export const userService = {
  // Get all users (exclude password)
  findAll: async () => {
    return User.find().select('-password');
  },

  // Get single user by ID
  findById: async (id: string) => {
    const user = await User.findById(id).select('-password');
    if (!user) throw new AppError('User not found', 404);
    return user;
  },

  // Login → returns token
  login: async (data: LoginInput) => {
    const user = await User.findOne({ username: data.username }).select('+password');
    if (!user || !(await user.comparePassword(data.password))) {
      throw new AppError('Invalid username or password', 401);
    }

    const token = signToken(user);
    return { user: { id: user._id, name: user.name, username: user.username, role: user.role }, token };
  },
};