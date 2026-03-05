import { query } from '../config/db.js';

export const addToCartModel = async ({ userId, productId, quantity }) => {
  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    RETURNING *
  `;
  const { rows } = await query(sql, [userId, productId, quantity]);
  return rows[0];
};

export const getCartItemsModel = async (userId) => {
  const sql = `
    SELECT c.id, c.quantity, p.id AS product_id, p.name, p.price, p.image_url, p.stock
    FROM cart c
    JOIN products p ON p.id = c.product_id
    WHERE c.user_id = $1
    ORDER BY c.id DESC
  `;
  const { rows } = await query(sql, [userId]);
  return rows;
};

export const removeFromCartModel = async ({ userId, productId }) => {
  const sql = 'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *';
  const { rows } = await query(sql, [userId, productId]);
  return rows[0] || null;
};

export const clearCartModel = async (userId) => {
  await query('DELETE FROM cart WHERE user_id = $1', [userId]);
};

export const updateCartQuantityModel = async ({ userId, productId, quantity }) => {
  const sql = `
    UPDATE cart
    SET quantity = $3
    WHERE user_id = $1 AND product_id = $2
    RETURNING *
  `;
  const { rows } = await query(sql, [userId, productId, quantity]);
  return rows[0] || null;
};
