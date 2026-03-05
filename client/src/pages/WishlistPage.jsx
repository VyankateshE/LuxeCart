import { useEffect, useState } from 'react';
import { addToCartApi } from '../api/cartApi';
import { getWishlistApi, removeFromWishlistApi } from '../api/wishlistApi';

function WishlistPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const data = await getWishlistApi();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (productId) => {
    await removeFromWishlistApi(productId);
    load();
  };

  const moveToCart = async (productId) => {
    await addToCartApi(productId, 1);
    await removeFromWishlistApi(productId);
    load();
  };

  return (
    <div className="page container section-spacing">
      <h2>Wishlist</h2>
      <div className="list-grid">
        {items.map((item) => (
          <article className="list-card" key={item.id}>
            <img src={item.image_url} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
            </div>
            <div className="card-actions">
              <button className="gold-btn" onClick={() => moveToCart(item.product_id)}>
                Move to Cart
              </button>
              <button className="outline-btn" onClick={() => remove(item.product_id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
