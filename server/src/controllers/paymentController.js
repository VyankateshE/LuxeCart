import asyncHandler from '../utils/asyncHandler.js';
import { createPaymentIntentService } from '../services/paymentService.js';

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const data = await createPaymentIntentService(req.user.id);
  res.json(data);
});
