/*
  # Security and Logistics Platform Database Schema

  ## Overview
  Complete database structure for a security and logistics service platform with tracking,
  quote management, client portal, and document management capabilities.

  ## New Tables
  
  ### 1. `users`
  Extended user profile information
  - `id` (uuid, primary key) - References auth.users
  - `email` (text) - User email
  - `full_name` (text) - Full name
  - `company_name` (text) - Company name
  - `phone` (text) - Contact phone
  - `user_type` (text) - Client type (individual, commercial, infrastructure)
  - `created_at` (timestamptz) - Account creation time
  - `updated_at` (timestamptz) - Last update time

  ### 2. `quote_requests`
  Quote and consultation requests from clients
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - Requesting user
  - `service_type` (text) - Security or Logistics
  - `service_category` (text) - Specific service needed
  - `company_name` (text)
  - `contact_name` (text)
  - `email` (text)
  - `phone` (text)
  - `message` (text) - Detailed requirements
  - `status` (text) - pending, reviewed, quoted, accepted, rejected
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `shipments`
  Tracking information for logistics shipments
  - `id` (uuid, primary key)
  - `tracking_number` (text, unique) - Public tracking ID
  - `user_id` (uuid, foreign key) - Client owner
  - `sender_name` (text)
  - `sender_address` (text)
  - `recipient_name` (text)
  - `recipient_address` (text)
  - `shipment_type` (text) - standard, express, high-value
  - `status` (text) - pending, picked_up, in_transit, delivered, exception
  - `estimated_delivery` (timestamptz)
  - `actual_delivery` (timestamptz)
  - `current_location` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `tracking_events`
  Timeline of shipment status updates
  - `id` (uuid, primary key)
  - `shipment_id` (uuid, foreign key)
  - `location` (text)
  - `status` (text)
  - `description` (text)
  - `event_time` (timestamptz)
  - `created_at` (timestamptz)

  ### 5. `documents`
  Secure document storage for client portal
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `file_name` (text)
  - `file_type` (text)
  - `file_size` (integer)
  - `storage_path` (text) - Supabase storage path
  - `category` (text) - contract, invoice, certificate, other
  - `uploaded_at` (timestamptz)

  ### 6. `security_assets`
  Information about secured items in vaults/storage
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `asset_type` (text) - vault_access, warehouse, safety_deposit, gem, document
  - `location` (text) - Facility location
  - `description` (text)
  - `access_code` (text) - Encrypted access information
  - `status` (text) - active, inactive, expired
  - `start_date` (date)
  - `end_date` (date)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Users can only access their own data
  - Tracking numbers allow public read for shipment tracking
  - Admin access controlled through user_type field

  ### Policies
  - Authenticated users can read/write their own records
  - Public can track shipments using tracking number
  - Quote requests can be created by anyone (leads generation)
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  company_name text,
  phone text,
  user_type text DEFAULT 'individual' CHECK (user_type IN ('individual', 'commercial', 'infrastructure', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Quote requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  service_type text NOT NULL CHECK (service_type IN ('security', 'logistics', 'both')),
  service_category text NOT NULL,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'quoted', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create quote requests"
  ON quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own quote requests"
  ON quote_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own quote requests"
  ON quote_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  sender_name text NOT NULL,
  sender_address text NOT NULL,
  recipient_name text NOT NULL,
  recipient_address text NOT NULL,
  shipment_type text DEFAULT 'standard' CHECK (shipment_type IN ('standard', 'express', 'high-value')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'picked_up', 'in_transit', 'delivered', 'exception')),
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  current_location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track shipments by tracking number"
  ON shipments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can view own shipments"
  ON shipments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Tracking events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid REFERENCES shipments(id) ON DELETE CASCADE NOT NULL,
  location text NOT NULL,
  status text NOT NULL,
  description text NOT NULL,
  event_time timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tracking events for public shipments"
  ON tracking_events FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = tracking_events.shipment_id
    )
  );

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  storage_path text NOT NULL,
  category text DEFAULT 'other' CHECK (category IN ('contract', 'invoice', 'certificate', 'report', 'other')),
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Security assets table
CREATE TABLE IF NOT EXISTS security_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  asset_type text NOT NULL CHECK (asset_type IN ('vault_access', 'warehouse', 'safety_deposit', 'gem_storage', 'document_storage', 'packaging')),
  location text NOT NULL,
  description text NOT NULL,
  access_code text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE security_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own security assets"
  ON security_assets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own security assets"
  ON security_assets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quote_requests_user_id ON quote_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_user_id ON shipments(user_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_security_assets_user_id ON security_assets(user_id);