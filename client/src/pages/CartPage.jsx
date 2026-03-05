import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCartApi, removeFromCartApi, updateCartQuantityApi } from '../api/cartApi';
import useToast from '../hooks/useToast';

function CartPage() {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();

  const load = async () => {
    const data = await getCartApi();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (productId) => {
    try {
      await removeFromCartApi(productId);
      showToast('Item removed from cart.');
      load();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to remove item.', 'error');
    }
  };

  const updateQuantity = async (productId, nextQty) => {
    if (nextQty < 1) return;
    try {
      await updateCartQuantityApi(productId, nextQty);
      load();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to update quantity.', 'error');
    }
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items],
  );

  return (
    <div className="page container section-spacing">
      <h2>Cart</h2>
      <div className="list-grid">
        {items.map((item) => (
          <article className="list-card" key={item.id}>
            <img src={item.image_url} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>
                ${Number(item.price).toFixed(2)} x {item.quantity}
              </p>
              <div className="qty-controls">
                <button className="outline-btn" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button className="outline-btn" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </div>
            <button className="outline-btn" onClick={() => remove(item.product_id)}>
              Remove
            </button>
          </article>
        ))}
      </div>
      <div className="summary-card">
        <h3>Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout" className="gold-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
