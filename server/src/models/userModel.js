import { query } from '../config/db.js';

export const createUser = async ({ name, email, password }) => {
  const sql = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;
  const { rows } = await query(sql, [name, email, password]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const sql = `
    SELECT id, name, email, password, created_at
    FROM users
    WHERE email = $1
  `;
  const { rows } = await query(sql, [email]);
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const sql = `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
};
