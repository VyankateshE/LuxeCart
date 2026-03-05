import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getMyOrdersApi } from '../api/orderApi';
import { getCartApi } from '../api/cartApi';
import { getWishlistApi } from '../api/wishlistApi';
import useToast from '../hooks/useToast';

function ProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [ordersData, cartData, wishlistData] = await Promise.all([
          getMyOrdersApi(),
          getCartApi(),
          getWishlistApi(),
        ]);
        setOrders(ordersData);
        setCartCount(cartData.length);
        setWishlistCount(wishlistData.length);
      } catch (error) {
        showToast(error.response?.data?.message || 'Unable to load profile data.', 'error');
      }
    };

    loadDashboardData();
  }, [showToast]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total_amount), 0),
    [orders],
  );

  return (
    <div className="page container section-spacing">
      <h2>Profile Dashboard</h2>
      <section className="profile-card">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Member Since:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '--'}
        </p>
      </section>

      <section className="dashboard-stats">
        <article className="stat-card">
          <p>Orders</p>
          <h3>{orders.length}</h3>
        </article>
        <article className="stat-card">
          <p>Wishlist Items</p>
          <h3>{wishlistCount}</h3>
        </article>
        <article className="stat-card">
          <p>Cart Items</p>
          <h3>{cartCount}</h3>
        </article>
        <article className="stat-card">
          <p>Total Spent</p>
          <h3>${totalSpent.toFixed(2)}</h3>
        </article>
      </section>

      <section className="orders-section">
        <div className="section-title-row">
          <h2>Your Orders</h2>
          <p>Track your purchased products and order totals.</p>
        </div>

        {!orders.length && <p className="muted-text">No orders yet. Complete checkout to see history.</p>}

        <div className="list-grid">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-top">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="muted-text">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="order-status-wrap">
                  <span className="order-status">{order.status}</span>
                  <strong>${Number(order.total_amount).toFixed(2)}</strong>
                </div>
              </div>

              <div className="order-items-grid">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image_url} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p className="muted-text">
                        ${Number(item.unit_price).toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
