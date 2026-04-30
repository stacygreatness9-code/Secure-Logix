import { Link } from 'react-router-dom';

export default function SecurityServices() {
  const services = [
    {
      title: 'Vault Access',
      description: 'High-security vault facilities with biometric access control, 24/7 monitoring, and climate regulation for sensitive materials.',
      features: ['Biometric Authentication', '24/7 Surveillance', 'Climate Controlled']
    },
    {
      title: 'Warehousing',
      description: 'Secure warehouse storage with advanced inventory management, temperature control, and restricted access zones for high-value goods.',
      features: ['Inventory Tracking', 'Security Zones', 'Temperature Control']
    },
    {
      title: 'Safety Deposit',
      description: 'Private safety deposit boxes in fortified facilities, providing secure storage for documents, valuables, and irreplaceable items.',
      features: ['Private Access', 'Fortified Structure', 'Insurance Options']
    },
    {
      title: 'Gem Storage',
      description: 'Specialized storage for precious stones and metals with certification tracking, insurance coordination, and expert handling protocols.',
      features: ['Certified Handling', 'Insurance Coordination', 'Audit Trail']
    },
    {
      title: 'Document Storage',
      description: 'Archival-quality document storage with environmental controls, digital cataloging, and compliance with data protection regulations.',
      features: ['Digital Cataloging', 'Compliance Ready', 'Retrieval Service']
    },
    {
      title: 'Packaging & Storage',
      description: 'Custom packaging solutions for fragile or unusual items, combined with secure storage in controlled environments.',
      features: ['Custom Solutions', 'Protective Packaging', 'Secure Handling']
    }
  ];

  return (
    <div className="security-services">
      <section className="page-hero">
        <div className="container">
          <h1>Security Services</h1>
          <p>Comprehensive protection for your most valuable assets.</p>
        </div>
      </section>

      <section className="services-detail">
        <div className="container">
          <div className="intro-text">
            <h2>Built for High-Risk Industries</h2>
            <p>
              Our security infrastructure protects assets for financial institutions,
              jewelry dealers, legal firms, and organizations handling sensitive
              materials. Every facility meets international security standards with
              redundant protection systems.
            </p>
          </div>

          <div className="services-detailed-grid">
            {services.map((service, index) => (
              <div key={index} className="detailed-service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="feature-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="security-protocols">
            <h2>Security Protocols</h2>
            <div className="protocols-grid">
              <div className="protocol-card">
                <h4>Access Control</h4>
                <p>Multi-factor authentication and biometric verification for all facility access.</p>
              </div>
              <div className="protocol-card">
                <h4>Surveillance</h4>
                <p>Continuous monitoring with recorded footage and motion detection systems.</p>
              </div>
              <div className="protocol-card">
                <h4>Environmental</h4>
                <p>Climate control, fire suppression, and moisture protection systems.</p>
              </div>
              <div className="protocol-card">
                <h4>Audit Trail</h4>
                <p>Complete documentation of all access events and asset movements.</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Secure Your Assets Today</h3>
            <p>Contact us for a security assessment and customized solution.</p>
            <Link to="/quote" className="btn btn-primary">Request Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
