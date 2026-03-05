import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(form);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page center-page auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Create Account</h2>
        <input name="name" placeholder="Full name" required onChange={onChange} />
        <input name="email" type="email" placeholder="Email" required onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required onChange={onChange} />
        {error && <p className="error-text">{error}</p>}
        <button className="gold-btn" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
