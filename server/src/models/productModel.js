import { query } from '../config/db.js';

export const createProduct = async ({ name, description, price, category, imageUrl, stock, rating = 4.5 }) => {
  const sql = `
    INSERT INTO products (name, description, price, category, image_url, stock, rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const { rows } = await query(sql, [name, description, price, category, imageUrl, stock, rating]);
  return rows[0];
};

export const getProducts = async ({ search, category, minPrice, maxPrice, sortBy }) => {
  const conditions = [];
  const values = [];

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`(name ILIKE $${values.length} OR description ILIKE $${values.length})`);
  }

  if (category) {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }

  if (minPrice !== undefined) {
    values.push(minPrice);
    conditions.push(`price >= $${values.length}`);
  }

  if (maxPrice !== undefined) {
    values.push(maxPrice);
    conditions.push(`price <= $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  let orderClause = 'ORDER BY created_at DESC';
  if (sortBy === 'price_asc') orderClause = 'ORDER BY price ASC';
  if (sortBy === 'price_desc') orderClause = 'ORDER BY price DESC';
  if (sortBy === 'rating_desc') orderClause = 'ORDER BY rating DESC';
  if (sortBy === 'name_asc') orderClause = 'ORDER BY name ASC';

  const sql = `SELECT * FROM products ${whereClause} ${orderClause}`;
  const { rows } = await query(sql, values);
  return rows;
};

export const getProductById = async (id) => {
  const sql = 'SELECT * FROM products WHERE id = $1';
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
};

export const updateProductById = async ({
  id,
  name,
  description,
  price,
  category,
  imageUrl,
  stock,
  rating,
}) => {
  const sql = `
    UPDATE products
    SET
      name = $2,
      description = $3,
      price = $4,
      category = $5,
      image_url = $6,
      stock = $7,
      rating = $8
    WHERE id = $1
    RETURNING *
  `;
  const { rows } = await query(sql, [id, name, description, price, category, imageUrl, stock, rating]);
  return rows[0] || null;
};

export const deleteProductById = async (id) => {
  const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
};
