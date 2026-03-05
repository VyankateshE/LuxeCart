import asyncHandler from '../utils/asyncHandler.js';
import {
  createSubAdminService,
  getAdminOverviewService,
  listAdminsService,
} from '../services/adminService.js';

export const createSubAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await createSubAdminService({ name, email, password });
  res.status(201).json(admin);
});

export const listAdmins = asyncHandler(async (_req, res) => {
  const admins = await listAdminsService();
  res.json(admins);
});

export const getAdminOverview = asyncHandler(async (_req, res) => {
  const overview = await getAdminOverviewService();
  res.json(overview);
});
