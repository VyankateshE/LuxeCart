import { query } from '../config/db.js';

export const createUser = async ({ name, email, password, role = 'customer' }) => {
  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
  `;
  const { rows } = await query(sql, [name, email, password, role]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const sql = `
    SELECT id, name, email, role, password, created_at
    FROM users
    WHERE email = $1
  `;
  const { rows } = await query(sql, [email]);
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
};

export const listAdminUsers = async () => {
  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE role IN ('super_admin', 'sub_admin')
    ORDER BY created_at DESC
  `;
  const { rows } = await query(sql);
  return rows;
};
