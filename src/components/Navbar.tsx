import { Link } from 'react-router-dom';
import { useRBAC } from '../context/RBACContext';

export default function Navbar() {
  const { permissions } = useRBAC();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-text">SecureLogix</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services/security">Security</Link></li>
          <li><Link to="/services/logistics">Logistics</Link></li>
          <li><Link to="/tracking">Track Shipment</Link></li>
          {permissions.canViewDashboard && (
            <li><Link to="/admin">Admin</Link></li>
          )}
          <li><Link to="/quote" className="btn-quote">Get Quote</Link></li>
        </ul>
      </div>
    </nav>
  );
}
