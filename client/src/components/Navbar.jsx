import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { isAuthenticated, isSuperAdmin, isSubAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          LuxeCart
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/products">Shop</NavLink>
          {isSuperAdmin && <NavLink to="/admin/super">Super Admin</NavLink>}
          {isSubAdmin && <NavLink to="/admin/sub">Sub Admin</NavLink>}
          {isAuthenticated && <NavLink to="/wishlist">Wishlist</NavLink>}
          {isAuthenticated && <NavLink to="/cart">Cart</NavLink>}
          {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
        </nav>
        <div className="nav-actions">
          {!isAuthenticated ? (
            <>
              <NavLink className="outline-btn" to="/login">
                Login
              </NavLink>
              <NavLink className="gold-btn" to="/register">
                Join
              </NavLink>
            </>
          ) : (
            <button className="outline-btn" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
