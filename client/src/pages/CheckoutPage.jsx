import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutApi } from '../api/cartApi';
import { createPaymentIntentApi } from '../api/paymentApi';
import useToast from '../hooks/useToast';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function CheckoutForm({ clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { showToast } = useToast();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const payNow = async () => {
    if (!stripe || !elements) return;
    setPlacing(true);
    setError('');

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed.');
        return;
      }

      if (result.paymentIntent?.status !== 'succeeded') {
        setError('Payment not completed.');
        return;
      }

      const data = await checkoutApi();
      showToast('Payment successful. Order placed.');
      onSuccess(data);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <div className="stripe-card-wrap">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#0f0f0f',
              },
            },
          }}
        />
      </div>
      <p className="hint-text">Test card: 4242 4242 4242 4242 | Any future date | Any CVC</p>
      {error && <p className="error-text">{error}</p>}
      <button className="gold-btn" onClick={payNow} disabled={placing || !stripe}>
        {placing ? 'Processing payment...' : 'Pay & Place Order'}
      </button>
    </>
  );
}

function CheckoutPage() {
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  useEffect(() => {
    const initPayment = async () => {
      setLoadingIntent(true);
      setError('');
      try {
        const data = await createPaymentIntentApi();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to initialize payment.');
      } finally {
        setLoadingIntent(false);
      }
    };

    initPayment();
  }, []);

  if (!publishableKey) {
    return (
      <div className="page center-page">
        <div className="auth-card">
          <h2>Checkout</h2>
          <p className="error-text">Missing VITE_STRIPE_PUBLISHABLE_KEY in client/.env</p>
        </div>
      </div>
    );
  }

  const onSuccess = (data) => {
    setResult(data);
    setTimeout(() => navigate('/products'), 1800);
  };

  return (
    <div className="page center-page">
      <div className="auth-card">
        <h2>Checkout</h2>
        <p>Pay securely in Stripe test mode.</p>
        {loadingIntent && <p>Preparing secure payment session...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loadingIntent && clientSecret && !result && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} />
          </Elements>
        )}
        {result && (
          <p>
            Order #{result.order.id} placed successfully. Total ${Number(result.totalAmount).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
