import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { QuoteRequest } from '../types';

export default function Quote() {
  const [formData, setFormData] = useState<QuoteRequest>({
    service_type: 'security',
    service_category: '',
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const securityCategories = [
    'Vault Access',
    'Warehousing',
    'Safety Deposit',
    'Gem Storage',
    'Document Storage',
    'Packaging & Storage'
  ];

  const logisticsCategories = [
    'Standard Delivery',
    'Express Service',
    'High-Value Transport',
    'International Shipping',
    'Custom Solutions'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('quote_requests')
        .insert([formData]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData({
        service_type: 'security',
        service_category: '',
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = formData.service_type === 'security'
    ? securityCategories
    : formData.service_type === 'logistics'
    ? logisticsCategories
    : [...securityCategories, ...logisticsCategories];

  return (
    <div className="quote-page">
      <section className="page-hero">
        <div className="container">
          <h1>Request a Quote</h1>
          <p>Get customized solutions for your security and logistics needs.</p>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <div className="quote-container">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Request Submitted Successfully</h2>
                <p>
                  Thank you for your interest. Our team will review your requirements
                  and contact you within 24 hours with a detailed quote.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-form">
                <div className="form-section">
                  <h3>Service Type</h3>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="service_type"
                        value="security"
                        checked={formData.service_type === 'security'}
                        onChange={handleChange}
                      />
                      <span>Security Services</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="service_type"
                        value="logistics"
                        checked={formData.service_type === 'logistics'}
                        onChange={handleChange}
                      />
                      <span>Logistics Services</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="service_type"
                        value="both"
                        checked={formData.service_type === 'both'}
                        onChange={handleChange}
                      />
                      <span>Both Services</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Service Category</h3>
                  <select
                    name="service_category"
                    value={formData.service_category}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-section">
                  <h3>Contact Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Company Name *</label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Contact Name *</label>
                      <input
                        type="text"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Requirements</h3>
                  <div className="form-group">
                    <label>Describe your needs *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows={6}
                      placeholder="Please provide details about your requirements, timeline, and any specific concerns..."
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="alert alert-error">{error}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
