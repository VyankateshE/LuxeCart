import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart, onAddToWishlist, compact = false }) {
  return (
    <article className={`product-card ${compact ? 'compact' : ''}`}>
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.image_url} alt={product.name} className="product-image" loading="lazy" />
      </Link>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <p className="product-meta">
          <span>${Number(product.price).toFixed(2)}</span>
          <span>? {Number(product.rating || 4.5).toFixed(1)}</span>
        </p>
        <div className="card-actions">
          <button className="gold-btn" onClick={() => onAddToCart(product.id)}>
            Add to Cart
          </button>
          <button className="outline-btn" onClick={() => onAddToWishlist(product.id)}>
            Wishlist
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
