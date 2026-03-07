import jwt, { SignOptions } from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';

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
  if (!secret) throw new Error('JWT_SECRET is not defined');

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
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
    return user;
  },

  // Login → returns token
  login: async (data: LoginInput) => {
    const user = await User.findOne({ username: data.username }).select('+password');
    if (!user || !(await user.comparePassword(data.password))) {
      throw Object.assign(new Error('Invalid username or password'), { statusCode: 401 });
    }

    const token = signToken(user);
    return { user: { id: user._id, name: user.name, username: user.username, role: user.role }, token };
  },
};