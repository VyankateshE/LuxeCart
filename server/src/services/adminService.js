import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { createUser, findUserByEmail, listAdminUsers } from '../models/userModel.js';

export const createSubAdminService = async ({ name, email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    const error = new Error('Email is already registered.');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({
    name,
    email,
    password: hashedPassword,
    role: 'sub_admin',
  });
};

export const listAdminsService = async () => listAdminUsers();

export const getAdminOverviewService = async () => {
  const sql = `
    SELECT
      (SELECT COUNT(*)::int FROM users WHERE role = 'customer') AS customers,
      (SELECT COUNT(*)::int FROM users WHERE role = 'sub_admin') AS sub_admins,
      (SELECT COUNT(*)::int FROM products) AS products,
      (SELECT COUNT(*)::int FROM orders) AS orders,
      (SELECT COALESCE(SUM(total_amount), 0)::numeric(12,2) FROM orders) AS revenue
  `;
  const { rows } = await query(sql);
  return rows[0];
};
