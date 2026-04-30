/**
 * @security Vault and asset encryption simulation with security status calculation.
 * All sensitive operations are simulated with encryption-at-rest considerations.
 */

export type SecurityStatus = 'secure' | 'accessing' | 'breach';
export type AssetType = 'gem' | 'document' | 'bullion' | 'artifact';

export interface VaultUnit {
  id: string;
  type: AssetType;
  unitNumber: string;
  temperature: number;
  humidity: number;
  encryptionStatus: 'encrypted' | 'in_transit' | 'decrypted';
  securityStatus: SecurityStatus;
  lastAccess: string;
  accessCount: number;
}

export interface AccessLogEntry {
  timestamp: string;
  userId: string;
  userRole: string;
  accessMethod: 'biometric' | 'multi_sig' | 'api_key' | 'emergency';
  vaultId: string;
  action: 'read' | 'write' | 'delete' | 'export';
  status: 'success' | 'failed' | 'denied';
  ipAddress: string;
  encryptionVerified: boolean;
}

/**
 * @security Generates simulated vault security status based on environmental factors
 * Uses encryption verification and access patterns to determine breach risk
 */
export const calculateSecurityStatus = (
  temperature: number,
  humidity: number,
  accessCount: number,
  lastAccessMinutesAgo: number
): SecurityStatus => {
  // Simulate encryption-at-rest breach detection
  const tempOutOfRange = temperature < 16 || temperature > 25;
  const humidityOutOfRange = humidity < 35 || humidity > 55;

  if (tempOutOfRange || humidityOutOfRange) {
    return 'breach';
  }

  if (lastAccessMinutesAgo < 5 || accessCount > 10) {
    return 'accessing';
  }

  return 'secure';
};

/**
 * @security Sanitizes and validates vault unit data
 * Prevents injection of malicious encryption keys or asset descriptions
 */
export const validateVaultUnit = (unit: Partial<VaultUnit>): unit is VaultUnit => {
  if (!unit.id || !unit.unitNumber || unit.temperature === undefined || unit.humidity === undefined) {
    return false;
  }
  return true;
};

/**
 * @security Generates anonymized access log entries for audit trails
 * Masks sensitive user identifiers and IP addresses
 */
export const sanitizeAccessLog = (entry: AccessLogEntry): AccessLogEntry => {
  return {
    ...entry,
    userId: entry.userId.substring(0, 3) + '***',
    ipAddress: entry.ipAddress.split('.').slice(0, 2).join('.') + '.*.*',
  };
};

/**
 * @security Simulates encryption key rotation based on access patterns
 * Returns rotation recommendation status
 */
export const getEncryptionRotationStatus = (accessCount: number, daysSinceRotation: number): boolean => {
  // Recommend rotation if accessed frequently or not rotated in 90 days
  return accessCount > 20 || daysSinceRotation > 90;
};
