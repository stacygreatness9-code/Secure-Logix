import { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import ShipmentTracker from '../components/admin/ShipmentTracker';
import VaultMonitor from '../components/admin/VaultMonitor';
import KeyAuthority from '../components/admin/KeyAuthority';

type ViewState = 'dashboard' | 'keys' | 'tracking' | 'vaults';

export default function AdminDashboard() {
  const { role, permissions } = useRBAC();
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  if (!permissions.canViewDashboard) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-navy flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-navy mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const views = {
    dashboard: { title: 'Operations Hub', desc: 'System overview and daily metrics', icon: '🏠' },
    keys: { title: 'Key Authority', desc: 'Generate secure hashes and tracking identifiers', icon: '🔑' },
    tracking: { title: 'Fleet Tracking', desc: 'Real-time transit visualization and timeline mapping', icon: '🚚' },
    vaults: { title: 'Vault Monitor', desc: 'Environmental telemetry and access audits', icon: '🏛️' }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-[#fdfcf7] text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col z-20 shadow-xl flex-shrink-0">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-gold">⛨</span> Secure<span className="text-gold">Logix</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Admin Operations</p>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium text-left transition-colors ${currentView === 'dashboard' ? 'bg-amber-400/10 text-gold border-r-4 border-gold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <span className="text-lg">🏠</span> Operations Hub
          </button>

          {permissions.canManageVaults && (
            <button 
              onClick={() => setCurrentView('keys')}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium text-left transition-colors ${currentView === 'keys' ? 'bg-amber-400/10 text-gold border-r-4 border-gold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              <span className="text-lg">🔑</span> Key Authority
            </button>
          )}

          {permissions.canViewTracking && (
            <button 
              onClick={() => setCurrentView('tracking')}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium text-left transition-colors ${currentView === 'tracking' ? 'bg-amber-400/10 text-gold border-r-4 border-gold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              <span className="text-lg">🚚</span> Fleet Tracking
            </button>
          )}

          {permissions.canManageVaults && (
            <button 
              onClick={() => setCurrentView('vaults')}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium text-left transition-colors ${currentView === 'vaults' ? 'bg-amber-400/10 text-gold border-r-4 border-gold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              <span className="text-lg">🏛️</span> Vault Monitor
            </button>
          )}
        </nav>

        <div className="p-6 border-t border-slate-700 text-xs text-slate-400">
          <p>System Status: <span className="text-emerald-400 font-bold">SECURE</span></p>
          <p className="mt-1">Role: <span className="capitalize">{role}</span></p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-navy">{views[currentView].title}</h2>
            <p className="text-sm text-slate-500">{views[currentView].desc}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 border border-slate-200">
              👤 Admin_01
            </span>
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200 cursor-pointer hover:bg-red-100">
              LOCKDOWN
            </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {currentView === 'dashboard' && (
            <section className="animate-in fade-in duration-500">
              <div className="mb-8">
                <p className="text-slate-600 max-w-3xl leading-relaxed">
                  Welcome to the SecureLogix Administration interface. This centralized hub provides an aggregated overview of our global logistics network, high-value asset storage, and key generation authority. Ensure all actions are logged and authorized.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-navy hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Active Shipments</div>
                  <div className="text-3xl font-bold text-navy">618</div>
                  <div className="text-emerald-500 text-xs font-bold mt-2">↑ 12% vs last week</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-navy hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Fleet Status</div>
                  <div className="text-3xl font-bold text-navy">98/98</div>
                  <div className="text-emerald-500 text-xs font-bold mt-2">100% Operational</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-navy hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Vault Alerts</div>
                  <div className="text-3xl font-bold text-navy">0</div>
                  <div className="text-slate-400 text-xs font-bold mt-2">All sensors nominal</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-gold bg-gradient-to-br from-white to-amber-50 hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Keys Issued (24h)</div>
                  <div className="text-3xl font-bold text-navy">142</div>
                  <div className="text-slate-400 text-xs font-bold mt-2">Zero-Knowledge Protocols Active</div>
                </div>
              </div>
            </section>
          )}

          {currentView === 'keys' && permissions.canManageVaults && <KeyAuthority />}
          {currentView === 'tracking' && permissions.canViewTracking && <ShipmentTracker />}
          {currentView === 'vaults' && permissions.canManageVaults && <VaultMonitor />}
        </div>
      </main>
    </div>
  );
}
