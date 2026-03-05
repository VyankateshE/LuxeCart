import asyncHandler from '../utils/asyncHandler.js';
import { getMyOrdersService } from '../services/orderService.js';

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await getMyOrdersService(req.user.id);
  res.json(orders);
});
