import { useState } from 'react';

export default function KeyAuthority() {
    const [shipmentOutput, setShipmentOutput] = useState('---');
    const [vaultOutput, setVaultOutput] = useState('---');

    const generateShipmentKey = () => {
        const year = new Date().getFullYear();
        const randomHex = Math.floor(Math.random() * 0x10000).toString(16).toUpperCase().padStart(4, '0');
        setShipmentOutput(`SL-BKK-${year}-${randomHex}`);
    };

    const generateVaultCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for(let i=0; i<12; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const formatted = code.match(/.{1,4}/g)?.join('-') || code;
        setVaultOutput(formatted);
    };

    const copyText = (text: string) => {
        if(text !== '---') {
            navigator.clipboard.writeText(text).catch(err => {
                const dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
            });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <p className="text-slate-600 max-w-3xl leading-relaxed">
                    The Key Authority module is the sole generator of cryptographic tracking identifiers and temporary vault access hashes. Use this zero-knowledge simulation environment to issue secure access credentials for physical logbooks and logistics handover events.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-navy p-4 border-b border-slate-700">
                        <h3 className="text-white font-bold flex items-center gap-2">📦 Shipment Key Generator</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <p className="text-sm text-slate-500 mb-6">Generates a unique, non-sequential identifier for global armored transit.</p>
                        
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Origin Hub</label>
                            <select className="w-full border border-slate-300 rounded-md p-2 text-navy focus:ring-2 focus:ring-gold focus:border-transparent outline-none">
                                <option value="BKK">Bangkok (BKK)</option>
                                <option value="SIN">Singapore (SIN)</option>
                                <option value="HKG">Hong Kong (HKG)</option>
                            </select>
                        </div>

                        <button onClick={generateShipmentKey} className="w-full bg-navy text-white font-bold py-3 rounded-md hover:bg-slate-800 transition mb-6 shadow-md border border-slate-700">
                            Generate Tracking ID
                        </button>

                        <div className="mt-auto">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Generated Output</label>
                            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 flex justify-between items-center">
                                <span className="font-mono text-lg text-navy font-bold tracking-widest">{shipmentOutput}</span>
                                <button onClick={() => copyText(shipmentOutput)} className="text-slate-400 hover:text-navy" title="Copy to Clipboard">📋</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-navy p-4 border-b border-slate-700 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gold opacity-20"></div>
                        <h3 className="text-white font-bold flex items-center gap-2 relative z-10">🏛️ Vault Access Hash</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <p className="text-sm text-slate-500 mb-6">Creates a secure 12-character alphanumeric code for temporary physical vault clearance.</p>
                        
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hash Expiry</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="expiry" value="1h" defaultChecked className="text-gold focus:ring-gold accent-gold" />
                                    <span className="text-sm font-medium text-navy">1 Hour</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="expiry" value="24h" className="text-gold focus:ring-gold accent-gold" />
                                    <span className="text-sm font-medium text-navy">24 Hours</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="expiry" value="perm" className="text-gold focus:ring-gold accent-gold" />
                                    <span className="text-sm font-medium text-navy">Permanent</span>
                                </label>
                            </div>
                        </div>

                        <button onClick={generateVaultCode} className="w-full bg-gold text-navy font-bold py-3 rounded-md hover:bg-yellow-500 transition mb-6 shadow-md border border-yellow-600">
                            Generate Vault Code
                        </button>

                        <div className="mt-auto">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Generated Output</label>
                            <div className="bg-navy border border-slate-800 rounded-md p-4 flex justify-between items-center">
                                <span className="font-mono text-lg text-emerald-400 font-bold tracking-widest">{vaultOutput}</span>
                                <button onClick={() => copyText(vaultOutput)} className="text-slate-400 hover:text-white" title="Secure Print / Copy">🖨️</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
