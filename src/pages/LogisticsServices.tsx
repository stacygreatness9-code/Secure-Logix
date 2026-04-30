import { Link } from 'react-router-dom';

export default function LogisticsServices() {
  return (
    <div className="logistics-services">
      <section className="page-hero">
        <div className="container">
          <h1>Logistics Services</h1>
          <p>Global delivery solutions with real-time visibility.</p>
        </div>
      </section>

      <section className="services-detail">
        <div className="container">
          <div className="intro-text">
            <h2>Worldwide Door-to-Door Service</h2>
            <p>
              Our logistics network spans continents, delivering time-sensitive and
              high-value shipments with complete tracking transparency. Whether
              standard or express, every package receives professional handling.
            </p>
          </div>

          <div className="logistics-types">
            <div className="logistics-card">
              <h3>Standard Delivery</h3>
              <p>
                Cost-effective shipping for regular commercial goods with full tracking
                and insurance options. Reliable transit times and secure handling.
              </p>
              <ul>
                <li>Real-time tracking</li>
                <li>Insurance available</li>
                <li>Signature confirmation</li>
                <li>Customs clearance</li>
              </ul>
            </div>

            <div className="logistics-card">
              <h3>Express Service</h3>
              <p>
                Priority handling for urgent shipments requiring expedited delivery.
                Fastest routes with dedicated support and updates.
              </p>
              <ul>
                <li>Priority processing</li>
                <li>Expedited customs</li>
                <li>Direct routing</li>
                <li>24/7 support</li>
              </ul>
            </div>

            <div className="logistics-card">
              <h3>High-Value Transport</h3>
              <p>
                Specialized service for valuable items requiring extra security, insurance,
                and white-glove handling throughout the journey.
              </p>
              <ul>
                <li>Enhanced security</li>
                <li>Premium insurance</li>
                <li>Dedicated courier</li>
                <li>GPS monitoring</li>
              </ul>
            </div>
          </div>

          <div className="tracking-info">
            <h2>Advanced Tracking Technology</h2>
            <p>
              Monitor your shipment at every stage with our comprehensive tracking
              system. Receive automatic updates and access detailed location history.
            </p>
            <div className="tracking-features">
              <div className="feature">
                <h4>Real-Time Updates</h4>
                <p>GPS tracking provides current location and estimated arrival times.</p>
              </div>
              <div className="feature">
                <h4>Event History</h4>
                <p>Complete timeline showing every scan point and facility.</p>
              </div>
              <div className="feature">
                <h4>Notifications</h4>
                <p>Automated alerts for key milestones and delivery confirmation.</p>
              </div>
            </div>
          </div>

          <div className="fleet-info">
            <h2>Our Logistics Network</h2>
            <div className="network-stats">
              <div className="stat">
                <div className="stat-number">98</div>
                <div className="stat-label">Courier Partners</div>
              </div>
              <div className="stat">
                <div className="stat-number">618</div>
                <div className="stat-label">Daily Deliveries</div>
              </div>
              <div className="stat">
                <div className="stat-number">200+</div>
                <div className="stat-label">Global Partners</div>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to Ship?</h3>
            <p>Get instant quotes and schedule pickups online.</p>
            <div className="cta-buttons">
              <Link to="/quote" className="btn btn-primary">Get Quote</Link>
              <Link to="/tracking" className="btn btn-secondary">Track Shipment</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
