import Stripe from 'stripe';
import env from '../config/env.js';
import { getCartItemsModel } from '../models/cartModel.js';

const getStripe = () => {
  if (!env.stripeSecretKey) {
    const error = new Error('Missing STRIPE_SECRET_KEY in environment variables.');
    error.statusCode = 500;
    throw error;
  }
  return new Stripe(env.stripeSecretKey);
};

export const createPaymentIntentService = async (userId) => {
  const items = await getCartItemsModel(userId);
  if (!items.length) {
    const error = new Error('Cart is empty.');
    error.statusCode = 400;
    throw error;
  }

  const totalAmount = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const amountInCents = Math.round(totalAmount * 100);

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: { userId: String(userId) },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    amount: totalAmount,
    currency: 'usd',
  };
};
