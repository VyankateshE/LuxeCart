import { query } from '../config/db.js';

export const addToWishlistModel = async ({ userId, productId }) => {
  const sql = `
    INSERT INTO wishlist (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, product_id) DO NOTHING
    RETURNING *
  `;
  const { rows } = await query(sql, [userId, productId]);
  return rows[0] || null;
};

export const getWishlistItemsModel = async (userId) => {
  const sql = `
    SELECT w.id, p.id AS product_id, p.name, p.price, p.image_url, p.stock, p.rating
    FROM wishlist w
    JOIN products p ON p.id = w.product_id
    WHERE w.user_id = $1
    ORDER BY w.id DESC
  `;
  const { rows } = await query(sql, [userId]);
  return rows;
};

export const removeFromWishlistModel = async ({ userId, productId }) => {
  const sql = 'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2 RETURNING *';
  const { rows } = await query(sql, [userId, productId]);
  return rows[0] || null;
};
