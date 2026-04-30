import React, { createContext } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'admin' | 'operator' | 'viewer' | 'guest';

export interface RBACPermissions {
  canViewDashboard: boolean;
  canViewTracking: boolean;
  canManageVaults: boolean;
  canManageUsers: boolean;
  canViewAccessLogs: boolean;
  canManageAlerts: boolean;
  canExportData: boolean;
}

const rolePermissions: Record<UserRole, RBACPermissions> = {
  admin: {
    canViewDashboard: true,
    canViewTracking: true,
    canManageVaults: true,
    canManageUsers: true,
    canViewAccessLogs: true,
    canManageAlerts: true,
    canExportData: true,
  },
  operator: {
    canViewDashboard: true,
    canViewTracking: true,
    canManageVaults: true,
    canManageUsers: false,
    canViewAccessLogs: true,
    canManageAlerts: true,
    canExportData: false,
  },
  viewer: {
    canViewDashboard: true,
    canViewTracking: true,
    canManageVaults: false,
    canManageUsers: false,
    canViewAccessLogs: true,
    canManageAlerts: false,
    canExportData: false,
  },
  guest: {
    canViewDashboard: false,
    canViewTracking: false,
    canManageVaults: false,
    canManageUsers: false,
    canViewAccessLogs: false,
    canManageAlerts: false,
    canExportData: false,
  },
};

interface RBACContextType {
  role: UserRole;
  permissions: RBACPermissions;
  hasPermission: (key: keyof RBACPermissions) => boolean;
}

const RBACContext = createContext<RBACContextType>({
  role: 'guest',
  permissions: rolePermissions.guest,
  hasPermission: () => false,
});

interface RBACProviderProps {
  children: ReactNode;
  role?: UserRole;
}

export const RBACProvider: React.FC<RBACProviderProps> = ({ children, role = 'viewer' }) => {
  const permissions = rolePermissions[role];

  const hasPermission = (key: keyof RBACPermissions): boolean => {
    return permissions[key];
  };

  return (
    <RBACContext.Provider value={{ role, permissions, hasPermission }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = (): RBACContextType => {
  const context = React.useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within RBACProvider');
  }
  return context;
};
