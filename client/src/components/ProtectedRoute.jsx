import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    return <div className="page center-page">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
