import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByIdApi } from '../api/productApi';
import { addToCartApi } from '../api/cartApi';
import { addToWishlistApi } from '../api/wishlistApi';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

function ProductDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductByIdApi(id);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const gallery = useMemo(() => {
    if (!product) return [];
    return [product.image_url, product.image_url, product.image_url];
  }, [product]);

  const addCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await addToCartApi(product.id, 1);
      showToast(`${product.name} added to cart.`);
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to add to cart.', 'error');
    }
  };

  const addWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await addToWishlistApi(product.id);
      showToast(`${product.name} added to wishlist.`);
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to add to wishlist.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="page center-page">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return <div className="page center-page">Product not found.</div>;
  }

  return (
    <div className="page container product-detail section-spacing">
      <section className="gallery-scroll">
        {gallery.map((image, index) => (
          <img key={index} src={image} alt={`${product.name} view ${index + 1}`} />
        ))}
      </section>

      <section className="product-detail-info">
        <p className="product-category">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-price-large">${Number(product.price).toFixed(2)}</p>
        <p>{product.description}</p>
        <p className="product-rating">Rating: ★ {Number(product.rating || 4.5).toFixed(1)}</p>
        <div className="card-actions">
          <button className="gold-btn" onClick={addCart}>
            Add to Cart
          </button>
          <button className="outline-btn" onClick={addWishlist}>
            Add to Wishlist
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailPage;
