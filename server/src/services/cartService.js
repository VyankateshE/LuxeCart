import {
  addToCartModel,
  clearCartModel,
  getCartItemsModel,
  removeFromCartModel,
  updateCartQuantityModel,
} from '../models/cartModel.js';
import { addOrderItemModel, createOrderModel } from '../models/orderModel.js';

export const addToCartService = async ({ userId, productId, quantity }) =>
  addToCartModel({ userId, productId, quantity });

export const getCartItemsService = async (userId) => getCartItemsModel(userId);

export const removeFromCartService = async ({ userId, productId }) => {
  const item = await removeFromCartModel({ userId, productId });
  if (!item) {
    const error = new Error('Cart item not found.');
    error.statusCode = 404;
    throw error;
  }
  return item;
};

export const updateCartQuantityService = async ({ userId, productId, quantity }) => {
  if (quantity < 1) {
    const error = new Error('Quantity must be at least 1.');
    error.statusCode = 400;
    throw error;
  }

  const item = await updateCartQuantityModel({ userId, productId, quantity });
  if (!item) {
    const error = new Error('Cart item not found.');
    error.statusCode = 404;
    throw error;
  }
  return item;
};

export const checkoutService = async (userId) => {
  const items = await getCartItemsModel(userId);
  if (!items.length) {
    const error = new Error('Cart is empty.');
    error.statusCode = 400;
    throw error;
  }

  const totalAmount = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const order = await createOrderModel({ userId, totalAmount });

  await Promise.all(
    items.map((item) =>
      addOrderItemModel({
        orderId: order.id,
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.price,
      }),
    ),
  );

  await clearCartModel(userId);

  return { order, items, totalAmount };
};
