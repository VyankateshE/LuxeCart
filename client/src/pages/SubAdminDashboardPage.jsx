import { useEffect, useState } from 'react';
import {
  createProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from '../api/productApi';
import { getAdminOverviewApi } from '../api/adminApi';
import useToast from '../hooks/useToast';

const initialProductForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  imageUrl: '',
  stock: '',
  rating: '',
};

function SubAdminDashboardPage() {
  const { showToast } = useToast();
  const [overview, setOverview] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState(initialProductForm);

  const loadData = async () => {
    const [overviewData, productsData] = await Promise.all([getAdminOverviewApi(), getProductsApi()]);
    setOverview(overviewData);
    setProducts(productsData);
  };

  useEffect(() => {
    loadData().catch(() => showToast('Unable to load sub admin dashboard.', 'error'));
  }, []);

  const onProductChange = (event) =>
    setProductForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      rating: Number(productForm.rating || 4.5),
    };

    try {
      if (editingId) {
        await updateProductApi(editingId, payload);
        showToast('Product updated.');
      } else {
        await createProductApi(payload);
        showToast('Product created.');
      }
      setEditingId(null);
      setProductForm(initialProductForm);
      await loadData();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to save product.', 'error');
    }
  };

  const onEdit = (product) => {
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.image_url,
      stock: product.stock,
      rating: product.rating,
    });
  };

  const onDelete = async (id) => {
    try {
      await deleteProductApi(id);
      showToast('Product deleted.');
      await loadData();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to delete product.', 'error');
    }
  };

  return (
    <div className="page container section-spacing admin-page">
      <div className="section-title-row">
        <h2>Sub Admin Dashboard</h2>
        <p>Manage product catalog and monitor business summary.</p>
      </div>

      {overview && (
        <section className="dashboard-stats">
          <article className="stat-card"><p>Total Products</p><h3>{overview.products}</h3></article>
          <article className="stat-card"><p>Total Orders</p><h3>{overview.orders}</h3></article>
          <article className="stat-card"><p>Customers</p><h3>{overview.customers}</h3></article>
          <article className="stat-card"><p>Revenue</p><h3>${Number(overview.revenue).toFixed(2)}</h3></article>
        </section>
      )}

      <section className="admin-grid">
        <form className="admin-card" onSubmit={onSubmit}>
          <h3>{editingId ? 'Edit Product' : 'Add Product'}</h3>
          <input name="name" value={productForm.name} onChange={onProductChange} placeholder="Product name" required />
          <textarea name="description" value={productForm.description} onChange={onProductChange} placeholder="Description" required />
          <input name="price" type="number" value={productForm.price} onChange={onProductChange} placeholder="Price" required />
          <input name="category" value={productForm.category} onChange={onProductChange} placeholder="Category" required />
          <input name="imageUrl" value={productForm.imageUrl} onChange={onProductChange} placeholder="Image URL" required />
          <input name="stock" type="number" value={productForm.stock} onChange={onProductChange} placeholder="Stock" required />
          <input name="rating" type="number" step="0.1" value={productForm.rating} onChange={onProductChange} placeholder="Rating" />
          <button className="gold-btn" type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
        </form>

        <div className="admin-card">
          <h3>Manage Products</h3>
          <div className="admin-list">
            {products.map((product) => (
              <div className="admin-list-item" key={product.id}>
                <p>{product.name}</p>
                <div className="card-actions">
                  <button className="outline-btn" onClick={() => onEdit(product)}>Edit</button>
                  <button className="outline-btn" onClick={() => onDelete(product.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubAdminDashboardPage;
