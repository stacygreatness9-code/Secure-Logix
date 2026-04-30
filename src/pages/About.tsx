export default function About() {
  return (
    <div className="about">
      <section className="page-hero">
        <div className="container">
          <h1>About SecureLogix</h1>
          <p>Three decades of excellence in security and logistics solutions.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <h2>Our Story</h2>
              <p>
                Established in 1990 in Bangkok, Thailand, SecureLogix has grown
                into a trusted partner for organizations requiring the highest
                standards of security and logistics precision.
              </p>
              <p>
                We serve high-risk industries where loss prevention, compliance,
                and reliability are non-negotiable. From secure vault storage
                to global tracking systems, we provide visibility and protection
                for your most critical assets.
              </p>

              <h3>Our Commitment</h3>
              <p>
                Every client receives dedicated attention from decision-makers who
                understand the unique challenges of high-value asset management.
                Our infrastructure combines physical security with advanced tracking
                technology for complete peace of mind.
              </p>
            </div>

            <div className="content-sidebar">
              <div className="info-box">
                <h4>Operating Hours</h4>
                <p>Monday - Friday</p>
                <p className="hours">8:00 AM - 5:00 PM</p>
                <p className="timezone">Bangkok Time (ICT)</p>
              </div>

              <div className="info-box">
                <h4>Location</h4>
                <p>Bangkok, Thailand</p>
                <p>Serving clients worldwide</p>
              </div>

              <div className="info-box">
                <h4>Since 1990</h4>
                <p>34+ years of trusted service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h4>Security First</h4>
              <p>Multi-layered protection systems and strict access protocols.</p>
            </div>
            <div className="value-card">
              <h4>Complete Visibility</h4>
              <p>Real-time tracking and transparent reporting for every shipment.</p>
            </div>
            <div className="value-card">
              <h4>Compliance Ready</h4>
              <p>Meeting international standards and regulatory requirements.</p>
            </div>
            <div className="value-card">
              <h4>Reliable Performance</h4>
              <p>Proven track record with 618 successful deliveries daily.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
