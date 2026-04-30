import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Shipment, TrackingEvent } from '../types';

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShipment(null);
    setEvents([]);

    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber.trim())
        .maybeSingle();

      if (shipmentError) throw shipmentError;

      if (!shipmentData) {
        setError('Tracking number not found. Please check and try again.');
        return;
      }

      setShipment(shipmentData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('shipment_id', shipmentData.id)
        .order('event_time', { ascending: false });

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);
    } catch (err) {
      setError('Error fetching tracking information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'status-pending',
      picked_up: 'status-progress',
      in_transit: 'status-progress',
      delivered: 'status-success',
      exception: 'status-error'
    };
    return statusMap[status] || 'status-pending';
  };

  return (
    <div className="tracking-page">
      <section className="page-hero">
        <div className="container">
          <h1>Track Your Shipment</h1>
          <p>Enter your tracking number for real-time updates.</p>
        </div>
      </section>

      <section className="tracking-section">
        <div className="container">
          <div className="tracking-form-container">
            <form onSubmit={handleTrack} className="tracking-form">
              <div className="form-group">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="tracking-input"
                  required
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Tracking...' : 'Track'}
                </button>
              </div>
            </form>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {shipment && (
              <div className="tracking-results">
                <div className="shipment-header">
                  <div className="shipment-info">
                    <h2>Tracking Number: {shipment.tracking_number}</h2>
                    <div className={`status-badge ${getStatusClass(shipment.status)}`}>
                      {shipment.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>

                  <div className="shipment-details">
                    <div className="detail-row">
                      <span className="label">From:</span>
                      <span className="value">{shipment.sender_name}, {shipment.sender_address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">To:</span>
                      <span className="value">{shipment.recipient_name}, {shipment.recipient_address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Type:</span>
                      <span className="value">{shipment.shipment_type.replace('-', ' ')}</span>
                    </div>
                    {shipment.current_location && (
                      <div className="detail-row">
                        <span className="label">Current Location:</span>
                        <span className="value">{shipment.current_location}</span>
                      </div>
                    )}
                    {shipment.estimated_delivery && (
                      <div className="detail-row">
                        <span className="label">Est. Delivery:</span>
                        <span className="value">
                          {new Date(shipment.estimated_delivery).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {events.length > 0 && (
                  <div className="tracking-timeline">
                    <h3>Tracking History</h3>
                    <div className="timeline">
                      {events.map((event) => (
                        <div key={event.id} className="timeline-event">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="event-time">
                              {new Date(event.event_time).toLocaleString()}
                            </div>
                            <div className="event-location">{event.location}</div>
                            <div className="event-description">{event.description}</div>
                            <div className="event-status">{event.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
