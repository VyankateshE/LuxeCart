import asyncHandler from '../utils/asyncHandler.js';
import { getProfile, loginUser, registerUser } from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const data = await registerUser({ name, email, password });
  res.status(201).json(data);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser({ email, password });
  res.json(data);
});

export const profile = asyncHandler(async (req, res) => {
  const data = await getProfile(req.user.id);
  res.json(data);
});
