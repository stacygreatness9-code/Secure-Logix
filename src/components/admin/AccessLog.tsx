import { useState, useEffect } from 'react';
import { sanitizeAccessLog, type AccessLogEntry } from '../../lib/vault';

/**
 * @security Access log table with sanitized user identifiers and IP addresses.
 * Prevents exposure of sensitive audit trail information.
 */
export default function AccessLog() {
  const [logs, setLogs] = useState<AccessLogEntry[]>([]);

  useEffect(() => {
    // Simulate access log data with encryption verification
    const mockLogs: AccessLogEntry[] = [
      {
        timestamp: new Date(Date.now() - 300000).toISOString(),
        userId: 'admin_user_001',
        userRole: 'admin',
        accessMethod: 'biometric',
        vaultId: 'vault_04',
        action: 'read',
        status: 'success',
        ipAddress: '192.168.1.100',
        encryptionVerified: true,
      },
      {
        timestamp: new Date(Date.now() - 600000).toISOString(),
        userId: 'operator_user_002',
        userRole: 'operator',
        accessMethod: 'multi_sig',
        vaultId: 'vault_12',
        action: 'write',
        status: 'success',
        ipAddress: '192.168.1.101',
        encryptionVerified: true,
      },
      {
        timestamp: new Date(Date.now() - 900000).toISOString(),
        userId: 'viewer_user_003',
        userRole: 'viewer',
        accessMethod: 'api_key',
        vaultId: 'vault_08',
        action: 'read',
        status: 'denied',
        ipAddress: '10.0.0.50',
        encryptionVerified: false,
      },
      {
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        userId: 'admin_user_001',
        userRole: 'admin',
        accessMethod: 'multi_sig',
        vaultId: 'vault_01',
        action: 'export',
        status: 'success',
        ipAddress: '192.168.1.100',
        encryptionVerified: true,
      },
      {
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        userId: 'emergency_user_004',
        userRole: 'admin',
        accessMethod: 'emergency',
        vaultId: 'vault_04',
        action: 'read',
        status: 'success',
        ipAddress: '192.168.1.102',
        encryptionVerified: true,
      },
    ];

    setLogs(mockLogs);
  }, []);

  const getStatusColor = (status: AccessLogEntry['status']): string => {
    const colors: Record<AccessLogEntry['status'], string> = {
      success: 'bg-secure text-white',
      failed: 'bg-breach text-white',
      denied: 'bg-accessing text-navy',
    };
    return colors[status];
  };

  const getMethodBadge = (method: AccessLogEntry['accessMethod']): string => {
    const badges: Record<AccessLogEntry['accessMethod'], string> = {
      biometric: 'bg-blue-100 text-blue-800',
      multi_sig: 'bg-purple-100 text-purple-800',
      api_key: 'bg-green-100 text-green-800',
      emergency: 'bg-red-100 text-red-800',
    };
    return badges[method];
  };

  const getMethodLabel = (method: AccessLogEntry['accessMethod']): string => {
    const labels: Record<AccessLogEntry['accessMethod'], string> = {
      biometric: 'Biometric',
      multi_sig: 'Multi-Sig',
      api_key: 'API Key',
      emergency: 'Emergency',
    };
    return labels[method];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-navy mb-6">Access Log</h2>

      {/* Desktop view */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b-2 border-gold">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-navy">Timestamp</th>
              <th className="px-4 py-3 text-left font-bold text-navy">User ID</th>
              <th className="px-4 py-3 text-left font-bold text-navy">Role</th>
              <th className="px-4 py-3 text-left font-bold text-navy">Method</th>
              <th className="px-4 py-3 text-left font-bold text-navy">Vault ID</th>
              <th className="px-4 py-3 text-left font-bold text-navy">Action</th>
              <th className="px-4 py-3 text-left font-bold text-navy">Status</th>
              <th className="px-4 py-3 text-left font-bold text-navy">Encryption</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              const sanitized = sanitizeAccessLog(log);
              return (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">{sanitized.userId}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 capitalize">{log.userRole}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodBadge(log.accessMethod)}`}>
                      {getMethodLabel(log.accessMethod)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">{log.vaultId}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 capitalize">{log.action}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(log.status)}`}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {log.encryptionVerified ? (
                      <span className="text-secure font-bold">✓ Verified</span>
                    ) : (
                      <span className="text-breach font-bold">✗ Failed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-4">
        {logs.map((log, index) => {
          const sanitized = sanitizeAccessLog(log);
          return (
            <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(log.status)}`}>
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600 font-semibold">User:</span>
                  <p className="text-gray-700 font-mono text-xs">{sanitized.userId}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Role:</span>
                  <p className="text-gray-700 capitalize">{log.userRole}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Method:</span>
                  <p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodBadge(log.accessMethod)}`}>
                      {getMethodLabel(log.accessMethod)}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Action:</span>
                  <p className="text-gray-700 capitalize">{log.action}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600 font-semibold">Vault ID:</span>
                  <p className="text-gray-700 font-mono text-xs">{log.vaultId}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600 font-semibold">Encryption:</span>
                  <p>
                    {log.encryptionVerified ? (
                      <span className="text-secure font-bold">✓ Verified</span>
                    ) : (
                      <span className="text-breach font-bold">✗ Failed</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
