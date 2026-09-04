import React, { useState, useEffect } from 'react';
import useFloodStore from '../../store/useFloodStore';
import { Loader2 } from 'lucide-react';

const Header = ({ title = 'Dashboard' }) => {
  const [time, setTime] = useState(new Date());
  const { isSimulating, simulateHeavyRainfall, resetSimulation } = useFloodStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm flex items-center justify-between px-6">
      {/* Left: Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-[#172033]">{title}</h2>
      </div>

      {/* Center: Status */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <div className="bg-[#25844B]/10 border border-[#25844B]/20 text-[#25844B] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_10px_rgba(37,132,75,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25844B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25844B]"></span>
          </span>
          SYSTEM OPERATIONAL
        </div>
      </div>

      {/* Right: Controls & Time */}
      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-[#788597] tabular-nums">
          {time.toLocaleDateString('en-IN', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })} &nbsp;
          {time.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetSimulation}
            className="text-xs font-medium text-[#788597] hover:text-[#172033] transition-colors px-2 py-1"
          >
            Reset
          </button>
          
          <button
            onClick={simulateHeavyRainfall}
            disabled={isSimulating}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all
              ${isSimulating 
                ? 'bg-[#EAF3FC] text-[#8994A3] cursor-not-allowed border border-[#E2E8F0]' 
                : 'bg-[#D33D3D] hover:bg-[#C0392B] text-white shadow-[0_0_15px_rgba(211,61,61,0.2)] hover:shadow-[0_0_20px_rgba(211,61,61,0.5)] border border-[#D33D3D]'
              }
            `}
          >
            {isSimulating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Simulating...
              </>
            ) : (
              'Simulate Heavy Rainfall'
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
