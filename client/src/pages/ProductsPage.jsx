import { useEffect, useState } from 'react';
import { addToCartApi } from '../api/cartApi';
import { getProductsApi } from '../api/productApi';
import { addToWishlistApi } from '../api/wishlistApi';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import FilterBar from '../components/FilterBar';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';

const initialFilters = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  sortBy: '',
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const data = await getProductsApi(params);
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const payload = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== ''),
      );
      fetchProducts(payload);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters]);

  const handleFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const clearFilters = () => setFilters(initialFilters);

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
    <div className="page container section-spacing">
      <div className="section-title-row">
        <h2>Luxury Collection</h2>
        <p>Explore handcrafted pieces designed for timeless wardrobes.</p>
      </div>

      <FilterBar filters={filters} onChange={handleFilterChange} onClear={clearFilters} />

      <div className="product-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addCart}
                onAddToWishlist={addWishlist}
              />
            ))}
      </div>
    </div>
  );
}

export default ProductsPage;
