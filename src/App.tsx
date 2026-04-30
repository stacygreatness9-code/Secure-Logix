import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SecurityErrorBoundary from './components/SecurityErrorBoundary';
import { RBACProvider } from './context/RBACContext';
import Home from './pages/Home';
import About from './pages/About';
import SecurityServices from './pages/SecurityServices';
import LogisticsServices from './pages/LogisticsServices';
import Tracking from './pages/Tracking';
import Quote from './pages/Quote';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <SecurityErrorBoundary>
      <RBACProvider role="operator">
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services/security" element={<SecurityServices />} />
                <Route path="/services/logistics" element={<LogisticsServices />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </RBACProvider>
    </SecurityErrorBoundary>
  );
}

export default App;
