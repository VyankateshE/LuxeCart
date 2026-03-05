import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">Spring 2026 Luxury Drop</p>
        <h1>Elevated essentials designed to outlast trends.</h1>
        <p>
          Explore artisan craftsmanship, premium materials, and timeless silhouettes in one curated collection.
        </p>
        <Link to="/products" className="gold-btn large-btn">
          Discover Collection
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
