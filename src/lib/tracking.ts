/**
 * @security Tracking data sanitization and validation module.
 * All tracking data is validated against XSS/injection before processing.
 */

export interface TrackingPhase {
  id: string;
  location: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'vaulted';
  timestamp: string;
  temperature?: number;
  humidity?: number;
}

const TRACKING_PHASES: Record<string, TrackingPhase> = {
  bangkok_hub: {
    id: 'phase_1',
    location: 'Bangkok Hub',
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
  customs_clearance: {
    id: 'phase_2',
    location: 'Customs Clearance',
    status: 'pending',
    timestamp: new Date(Date.now() + 3600000).toISOString(),
  },
  in_transit: {
    id: 'phase_3',
    location: 'In Transit',
    status: 'in_transit',
    timestamp: new Date(Date.now() + 7200000).toISOString(),
    temperature: 22,
    humidity: 45,
  },
  regional_hub: {
    id: 'phase_4',
    location: 'Regional Hub',
    status: 'in_transit',
    timestamp: new Date(Date.now() + 10800000).toISOString(),
  },
  final_delivery: {
    id: 'phase_5',
    location: 'Final Delivery',
    status: 'in_transit',
    timestamp: new Date(Date.now() + 14400000).toISOString(),
  },
  vaulted: {
    id: 'phase_6',
    location: 'Vaulted',
    status: 'vaulted',
    timestamp: new Date(Date.now() + 18000000).toISOString(),
    temperature: 18,
    humidity: 40,
  },
};

/**
 * @security Validates tracking number format (SL-XXXX-XXXX)
 * Prevents injection attacks by strict regex validation
 */
export const validateTrackingNumber = (trackingNumber: string): boolean => {
  const sanitized = trackingNumber.trim().toUpperCase();
  const regex = /^SL-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return regex.test(sanitized);
};

/**
 * @security Returns sanitized tracking phases
 * No sensitive data exposure, only public tracking information
 */
export const getTrackingPhases = (): TrackingPhase[] => {
  return Object.values(TRACKING_PHASES);
};

/**
 * @security Sanitizes tracking number before processing
 * Prevents XSS by escaping special characters
 */
export const sanitizeTrackingNumber = (trackingNumber: string): string => {
  return trackingNumber
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9\-]/g, '');
};
