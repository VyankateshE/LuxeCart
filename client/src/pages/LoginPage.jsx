import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page center-page auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Welcome Back</h2>
        <input name="email" type="email" placeholder="Email" required onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required onChange={onChange} />
        {error && <p className="error-text">{error}</p>}
        <button className="gold-btn" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
