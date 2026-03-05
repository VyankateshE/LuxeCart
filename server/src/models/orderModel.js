import { query } from '../config/db.js';

export const createOrderModel = async ({ userId, totalAmount }) => {
  const sql = `
    INSERT INTO orders (user_id, total_amount, status)
    VALUES ($1, $2, 'placed')
    RETURNING *
  `;
  const { rows } = await query(sql, [userId, totalAmount]);
  return rows[0];
};

export const addOrderItemModel = async ({ orderId, productId, quantity, unitPrice }) => {
  const sql = `
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await query(sql, [orderId, productId, quantity, unitPrice]);
  return rows[0];
};

export const getOrdersByUserModel = async (userId) => {
  const ordersSql = `
    SELECT id, user_id, total_amount, status, created_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const { rows: orders } = await query(ordersSql, [userId]);

  if (!orders.length) return [];

  const itemsSql = `
    SELECT
      oi.id,
      oi.order_id,
      oi.product_id,
      oi.quantity,
      oi.unit_price,
      p.name,
      p.image_url
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = ANY($1::int[])
    ORDER BY oi.id DESC
  `;
  const orderIds = orders.map((order) => order.id);
  const { rows: items } = await query(itemsSql, [orderIds]);

  const itemsByOrderId = items.reduce((acc, item) => {
    if (!acc[item.order_id]) acc[item.order_id] = [];
    acc[item.order_id].push(item);
    return acc;
  }, {});

  return orders.map((order) => ({
    ...order,
    items: itemsByOrderId[order.id] || [],
  }));
};
