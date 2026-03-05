import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import { addToCartApi } from '../api/cartApi';
import { getProductsApi } from '../api/productApi';
import { addToWishlistApi } from '../api/wishlistApi';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getProductsApi();
        setProducts(data.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const addCart = async (productId) => {
    if (!requireAuth()) return;
    const product = products.find((item) => item.id === productId);
    try {
      await addToCartApi(productId, 1);
      showToast(`${product?.name || 'Product'} added to cart.`);
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to add to cart.', 'error');
    }
  };

  const addWishlist = async (productId) => {
    if (!requireAuth()) return;
    const product = products.find((item) => item.id === productId);
    try {
      await addToWishlistApi(productId);
      showToast(`${product?.name || 'Product'} added to wishlist.`);
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to add to wishlist.', 'error');
    }
  };

  return (
    <div className="page home-page">
      <HeroSection />
      <section className="container section-spacing fade-up">
        <div className="section-title-row">
          <h2>Featured Pieces</h2>
          <p>Signature staples selected by our style editors.</p>
        </div>
        <div className="product-grid">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addCart}
                  onAddToWishlist={addWishlist}
                />
              ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
