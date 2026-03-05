import { useEffect, useState } from 'react';
import { createSubAdminApi, getAdminOverviewApi, getAdminUsersApi } from '../api/adminApi';
import {
  createProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from '../api/productApi';
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

function SuperAdminDashboardPage() {
  const { showToast } = useToast();
  const [overview, setOverview] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [subAdminForm, setSubAdminForm] = useState({ name: '', email: '', password: '' });

  const loadDashboard = async () => {
    const [overviewData, adminsData, productsData] = await Promise.all([
      getAdminOverviewApi(),
      getAdminUsersApi(),
      getProductsApi(),
    ]);
    setOverview(overviewData);
    setAdminUsers(adminsData);
    setProducts(productsData);
  };

  useEffect(() => {
    loadDashboard().catch(() => showToast('Unable to load admin dashboard.', 'error'));
  }, []);

  const onProductChange = (event) =>
    setProductForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubAdminChange = (event) =>
    setSubAdminForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const resetProductForm = () => {
    setEditingId(null);
    setProductForm(initialProductForm);
  };

  const onProductSubmit = async (event) => {
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
        showToast('Product updated successfully.');
      } else {
        await createProductApi(payload);
        showToast('Product created successfully.');
      }
      await loadDashboard();
      resetProductForm();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to save product.', 'error');
    }
  };

  const onEditProduct = (product) => {
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

  const onDeleteProduct = async (id) => {
    try {
      await deleteProductApi(id);
      showToast('Product removed.');
      await loadDashboard();
      if (editingId === id) resetProductForm();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to remove product.', 'error');
    }
  };

  const onCreateSubAdmin = async (event) => {
    event.preventDefault();
    try {
      await createSubAdminApi(subAdminForm);
      showToast('Sub admin created successfully.');
      setSubAdminForm({ name: '', email: '', password: '' });
      await loadDashboard();
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to create sub admin.', 'error');
    }
  };

  return (
    <div className="page container section-spacing admin-page">
      <div className="section-title-row">
        <h2>Super Admin Dashboard</h2>
        <p>Manage admins, products, and platform metrics.</p>
      </div>

      {overview && (
        <section className="dashboard-stats">
          <article className="stat-card"><p>Customers</p><h3>{overview.customers}</h3></article>
          <article className="stat-card"><p>Sub Admins</p><h3>{overview.sub_admins}</h3></article>
          <article className="stat-card"><p>Products</p><h3>{overview.products}</h3></article>
          <article className="stat-card"><p>Revenue</p><h3>${Number(overview.revenue).toFixed(2)}</h3></article>
        </section>
      )}

      <section className="admin-grid">
        <form className="admin-card" onSubmit={onCreateSubAdmin}>
          <h3>Create Sub Admin</h3>
          <input name="name" value={subAdminForm.name} onChange={onSubAdminChange} placeholder="Name" required />
          <input name="email" type="email" value={subAdminForm.email} onChange={onSubAdminChange} placeholder="Email" required />
          <input name="password" type="password" value={subAdminForm.password} onChange={onSubAdminChange} placeholder="Password" required />
          <button className="gold-btn" type="submit">Create Sub Admin</button>
        </form>

        <div className="admin-card">
          <h3>Admin Users</h3>
          <div className="admin-list">
            {adminUsers.map((admin) => (
              <div className="admin-list-item" key={admin.id}>
                <p>{admin.name}</p>
                <span>{admin.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-grid">
        <form className="admin-card" onSubmit={onProductSubmit}>
          <h3>{editingId ? 'Edit Product' : 'Add Product'}</h3>
          <input name="name" value={productForm.name} onChange={onProductChange} placeholder="Product name" required />
          <textarea name="description" value={productForm.description} onChange={onProductChange} placeholder="Description" required />
          <input name="price" type="number" value={productForm.price} onChange={onProductChange} placeholder="Price" required />
          <input name="category" value={productForm.category} onChange={onProductChange} placeholder="Category" required />
          <input name="imageUrl" value={productForm.imageUrl} onChange={onProductChange} placeholder="Image URL" required />
          <input name="stock" type="number" value={productForm.stock} onChange={onProductChange} placeholder="Stock" required />
          <input name="rating" type="number" step="0.1" value={productForm.rating} onChange={onProductChange} placeholder="Rating" />
          <div className="card-actions">
            <button className="gold-btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
            {editingId && (
              <button className="outline-btn" type="button" onClick={resetProductForm}>Cancel</button>
            )}
          </div>
        </form>

        <div className="admin-card">
          <h3>Product Control</h3>
          <div className="admin-list">
            {products.map((product) => (
              <div className="admin-list-item" key={product.id}>
                <p>{product.name}</p>
                <div className="card-actions">
                  <button className="outline-btn" onClick={() => onEditProduct(product)}>Edit</button>
                  <button className="outline-btn" onClick={() => onDeleteProduct(product.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SuperAdminDashboardPage;
