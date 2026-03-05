import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserById } from '../models/userModel.js';
import { signToken } from '../utils/token.js';

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  created_at: user.created_at,
});

export const registerUser = async ({ name, email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    const error = new Error('Email is already registered.');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashedPassword });
  const token = signToken({ id: user.id, email: user.email });

  return { user: sanitizeUser(user), token };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({ id: user.id, email: user.email });
  return { user: sanitizeUser(user), token };
};

export const getProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }
  return sanitizeUser(user);
};
