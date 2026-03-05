import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RoleProtectedRoute({ allowedRoles, children }) {
  const { user, loadingAuth, isAuthenticated } = useAuth();

  if (loadingAuth) return <div className="page center-page">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/profile" replace />;

  return children;
}

export default RoleProtectedRoute;
