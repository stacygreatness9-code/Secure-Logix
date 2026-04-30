export interface QuoteRequest {
  id?: string;
  service_type: 'security' | 'logistics' | 'both';
  service_category: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
  status?: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  created_at?: string;
}

export interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  recipient_name: string;
  recipient_address: string;
  shipment_type: 'standard' | 'express' | 'high-value';
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'exception';
  estimated_delivery?: string;
  actual_delivery?: string;
  current_location?: string;
  created_at: string;
}

export interface TrackingEvent {
  id: string;
  shipment_id: string;
  location: string;
  status: string;
  description: string;
  event_time: string;
}

export interface SecurityAsset {
  id: string;
  asset_type: 'vault_access' | 'warehouse' | 'safety_deposit' | 'gem_storage' | 'document_storage' | 'packaging';
  location: string;
  description: string;
  status: 'active' | 'inactive' | 'expired';
  start_date: string;
  end_date?: string;
}
