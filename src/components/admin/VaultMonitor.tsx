import { useState, useEffect, useRef } from 'react';

// Tell TS that Chart exists globally
declare global {
    interface Window {
        Chart: any;
    }
}

export default function VaultMonitor() {
    const [temp, setTemp] = useState(20.0);
    const [humidity, setHumidity] = useState(45.0);
    const [vibration, setVibration] = useState(0);
    
    const tempCanvasRef = useRef<HTMLCanvasElement>(null);
    const humCanvasRef = useRef<HTMLCanvasElement>(null);
    const tempChartRef = useRef<any>(null);
    const humChartRef = useRef<any>(null);
    const intervalRef = useRef<number | null>(null);

    const logs = [
        { time: new Date(Date.now() - 3600000).toLocaleString(), user: 'BKK-OP-45', method: 'Biometric (Retina)', hash: 'X7K9-XXXX' },
        { time: new Date(Date.now() - 7200000).toLocaleString(), user: 'BKK-OP-12', method: 'Multi-Sig (Card+Pin)', hash: 'P2M1-XXXX' },
        { time: new Date(Date.now() - 10800000).toLocaleString(), user: 'SYS-ADMIN', method: 'Admin Override', hash: 'A9B2-XXXX' },
    ];

    useEffect(() => {
        if (!window.Chart) return;
        
        window.Chart.defaults.color = '#94a3b8';
        window.Chart.defaults.font.family = 'Inter, sans-serif';

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { 
                    border: { display: false },
                    grid: { color: '#f1f5f9' }
                }
            }
        };

        const initialData = Array(20).fill(0).map((_, i) => i);
        
        if (tempCanvasRef.current) {
            tempChartRef.current = new window.Chart(tempCanvasRef.current.getContext('2d'), {
                type: 'line',
                data: {
                    labels: initialData,
                    datasets: [{
                        data: Array(20).fill(20).map(v => v + (Math.random() * 0.4 - 0.2)),
                        borderColor: '#0f172a',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: { ...commonOptions, scales: { y: { min: 19, max: 21, ...commonOptions.scales.y } } }
            });
        }

        if (humCanvasRef.current) {
            humChartRef.current = new window.Chart(humCanvasRef.current.getContext('2d'), {
                type: 'line',
                data: {
                    labels: initialData,
                    datasets: [{
                        data: Array(20).fill(45).map(v => v + (Math.random() * 2 - 1)),
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: { ...commonOptions, scales: { y: { min: 40, max: 50, ...commonOptions.scales.y } } }
            });
        }

        intervalRef.current = window.setInterval(() => {
            const newTemp = 20 + (Math.random() * 0.4 - 0.2);
            if(tempChartRef.current) {
                tempChartRef.current.data.datasets[0].data.shift();
                tempChartRef.current.data.datasets[0].data.push(newTemp);
                tempChartRef.current.update();
            }
            setTemp(newTemp);

            const newHum = 45 + (Math.random() * 2 - 1);
            if(humChartRef.current) {
                humChartRef.current.data.datasets[0].data.shift();
                humChartRef.current.data.datasets[0].data.push(newHum);
                humChartRef.current.update();
            }
            setHumidity(newHum);

            setVibration(Math.random() * 0.05);
        }, 2000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (tempChartRef.current) tempChartRef.current.destroy();
            if (humChartRef.current) humChartRef.current.destroy();
        };
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <p className="text-slate-600 max-w-3xl leading-relaxed">
                    The Vault Monitor displays active telemetry from physical storage facilities. This dashboard visualizes environmental controls (Temperature and Humidity) and physical security metrics (Vibration analysis) to ensure absolute asset integrity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Climate: Temp</h3>
                        <span className="text-emerald-500 font-mono text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {temp.toFixed(1)}°C
                        </span>
                    </div>
                    <div className="relative h-[200px] flex-1">
                        <canvas ref={tempCanvasRef}></canvas>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Climate: Humidity</h3>
                        <span className="text-emerald-500 font-mono text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {humidity.toFixed(1)}%
                        </span>
                    </div>
                    <div className="relative h-[200px] flex-1">
                        <canvas ref={humCanvasRef}></canvas>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Seismic / Auth</h3>
                        <span className="text-gold font-mono text-sm bg-amber-50 px-2 py-0.5 rounded border border-amber-100">SECURE</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                <span>Vibration Variance</span>
                                <span>{vibration.toFixed(3)}g</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${vibration > 0.04 ? 'bg-gold' : 'bg-navy'}`}
                                    style={{ width: `${Math.min(100, vibration * 1000)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center">
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Active Unit</div>
                            <div className="text-xl font-bold text-navy">Gem Vault 04</div>
                            <div className="text-xs text-emerald-600 mt-1 flex justify-center items-center gap-1">
                                <span>🔒</span> Multi-Sig Engaged
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Access Log Audit</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-white border-b border-slate-100 text-xs uppercase font-bold text-slate-400">
                            <tr>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Access Method</th>
                                <th className="px-6 py-3">Auth Key Hash</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {logs.map((log, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">{log.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{log.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{log.method}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400">{log.hash}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-bold border border-emerald-100">GRANTED</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
