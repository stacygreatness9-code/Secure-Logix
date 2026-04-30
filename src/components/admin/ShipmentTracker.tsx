import { useState, useEffect, useRef } from 'react';

export default function ShipmentTracker() {
    const [trackingInput, setTrackingInput] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<number | null>(null);

    const steps = [
        { title: "Hub Pickup", desc: "Verified at Bangkok Hub" },
        { title: "Security Clearance", desc: "Biometric auth confirmed" },
        { title: "Armored Transit", desc: "En route via secure corridor" },
        { title: "Final Handover", desc: "Arrived at destination vault" }
    ];

    const simulateTracking = () => {
        if (!trackingInput) return;
        
        setIsTracking(true);
        setCurrentStep(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        drawMapBase();
        
        intervalRef.current = window.setInterval(() => {
            setCurrentStep(prev => {
                if (prev < steps.length) {
                    if (prev === 2) {
                        animateMapRoute();
                    }
                    return prev + 1;
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return prev;
                }
            });
        }, 1500);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (isTracking) drawMapBase();
        
        const handleResize = () => {
            if (isTracking) drawMapBase();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isTracking]);

    const drawMapBase = () => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        }
        for (let j = 0; j < canvas.height; j += 40) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
        }
    };

    const animateMapRoute = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let progress = 0;
        const start = { x: canvas.width * 0.2, y: canvas.height * 0.8 };
        const end = { x: canvas.width * 0.8, y: canvas.height * 0.2 };
        
        const drawFrame = () => {
            drawMapBase();
            
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            
            const currentX = start.x + (end.x - start.x) * progress;
            const currentY = start.y + (end.y - start.y) * progress;
            
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = '#3b82f6'; 
            ctx.lineWidth = 3;
            ctx.shadowColor = '#60a5fa';
            ctx.shadowBlur = 10;
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(start.x, start.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            
            progress += 0.01;
            if (progress <= 1) {
                requestAnimationFrame(drawFrame);
            } else {
                ctx.beginPath();
                ctx.arc(end.x, end.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#10b981';
                ctx.fill();
            }
        };
        
        drawFrame();
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <p className="text-slate-600 max-w-3xl leading-relaxed">
                    The Fleet Tracking module provides real-time oversight of armored transit vehicles. Input a verified tracking identifier to initialize the secure timeline and monitor live telemetry data overlaid on the Bangkok grid simulation.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tracking ID</label>
                        <input 
                            type="text" 
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                            placeholder="e.g. SL-BKK-2024-XXXX" 
                            className="w-full border border-slate-300 rounded-md p-3 text-navy font-mono focus:ring-2 focus:ring-gold outline-none"
                        />
                    </div>
                    <button onClick={simulateTracking} className="bg-navy text-white font-bold py-3 px-8 rounded-md hover:bg-slate-800 transition">
                        Initiate Trace
                    </button>
                </div>
            </div>

            {isTracking && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-1">
                        <h3 className="text-navy font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">⏳ Transit Timeline</h3>
                        <div className="pl-2 relative">
                            {steps.map((step, idx) => {
                                const isActive = currentStep === idx + 1;
                                const isCompleted = currentStep > idx + 1;
                                const isPending = currentStep < idx + 1;
                                
                                return (
                                    <div key={idx} className="relative pl-8 pb-8">
                                        {/* Line */}
                                        {idx !== steps.length - 1 && (
                                            <div className={`absolute left-[0.45rem] top-5 bottom-[-0.25rem] w-[2px] ${isCompleted ? 'bg-navy' : 'bg-slate-200'} z-0`}></div>
                                        )}
                                        {/* Dot */}
                                        <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 z-10 
                                            ${isActive ? 'bg-gold border-[#b45309] shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 
                                              isCompleted ? 'bg-navy border-navy' : 'bg-slate-200 border-slate-300'}`}>
                                        </div>
                                        
                                        <h4 className={`font-bold text-sm ${isActive || isCompleted ? 'text-navy' : 'text-slate-400'}`}>{step.title}</h4>
                                        <p className={`text-xs mt-1 ${isActive ? 'text-gold font-bold' : 'text-slate-400'}`}>
                                            {isActive || isCompleted ? step.desc : 'Pending verification'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="bg-navy rounded-xl border border-slate-800 shadow-inner p-2 lg:col-span-2 relative h-96 flex flex-col">
                        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur px-3 py-1 rounded text-xs text-emerald-400 font-mono border border-slate-700">
                            LIVE TELEMETRY ●
                        </div>
                        <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden relative">
                            <canvas ref={canvasRef} className="w-full h-full absolute inset-0"></canvas>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
