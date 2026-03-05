import { getOrdersByUserModel } from '../models/orderModel.js';

export const getMyOrdersService = async (userId) => getOrdersByUserModel(userId);
