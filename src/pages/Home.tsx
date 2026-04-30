import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Secure Storage, Reliable Logistics</h1>
            <p>
              Protecting high-value assets and delivering critical shipments worldwide.
              Trusted by industries requiring maximum security, compliance, and reliability
              since 1990.
            </p>
            <div className="hero-buttons">
              <Link to="/quote" className="btn btn-primary">Request Quote</Link>
              <Link to="/tracking" className="btn btn-secondary">Track Shipment</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number">34+</div>
              <div className="metric-label">Years Experience</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">200+</div>
              <div className="metric-label">Global Partners</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">98</div>
              <div className="metric-label">Courier Network</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">618</div>
              <div className="metric-label">Daily Deliveries</div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-overview">
        <div className="container">
          <h2>Our Core Services</h2>

          <div className="services-grid">
            <Link to="/services/security" className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Security Services</h3>
              <p>
                High-security vaults, warehousing, safety deposits, gem storage, and
                document protection. Comprehensive solutions for assets requiring
                maximum security and climate control.
              </p>
              <span className="service-link">Explore Security →</span>
            </Link>

            <Link to="/services/logistics" className="service-card">
              <div className="service-icon">📦</div>
              <h3>Logistics Services</h3>
              <p>
                Global door-to-door delivery with real-time tracking. Express and
                high-value transport solutions for time-sensitive and critical
                shipments worldwide.
              </p>
              <span className="service-link">Explore Logistics →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="industries">
        <div className="container">
          <h2>Industries We Serve</h2>
          <div className="industries-grid">
            <div className="industry-card">
              <h4>Financial Services</h4>
              <p>Banks, investment firms requiring secure document and asset storage.</p>
            </div>
            <div className="industry-card">
              <h4>Jewelry & Gems</h4>
              <p>High-value precious stones and metals with specialized security.</p>
            </div>
            <div className="industry-card">
              <h4>Legal & Compliance</h4>
              <p>Confidential documents requiring long-term secure archival.</p>
            </div>
            <div className="industry-card">
              <h4>Healthcare</h4>
              <p>Medical supplies, equipment, and sensitive records logistics.</p>
            </div>
            <div className="industry-card">
              <h4>Technology</h4>
              <p>Critical components and prototypes with tracking and security.</p>
            </div>
            <div className="industry-card">
              <h4>Infrastructure</h4>
              <p>Large-scale logistics for construction and development projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Secure Your Assets?</h2>
            <p>Get a customized quote for your security and logistics needs.</p>
            <Link to="/quote" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
