import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page center-page">
      <div className="auth-card">
        <h2>404</h2>
        <p>Page not found.</p>
        <Link to="/" className="gold-btn">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
