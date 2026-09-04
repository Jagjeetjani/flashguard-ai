import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Loader2 } from 'lucide-react';
import useFloodStore from '../../store/useFloodStore';

const SimulationButton = () => {
  const { isSimulating, simulationPhase, simulateHeavyRainfall } = useFloodStore();

  const phaseMessages = [
    'Initializing simulation engine...',
    'Increasing rainfall intensity...',
    'Analyzing soil saturation limits...',
    'Calculating stream level surges...',
    'AI recalculating vulnerability models...',
    'Generating predictive warnings...',
    'Finalizing threat assessment...'
  ];

  const currentMessage = phaseMessages[simulationPhase] || 'Processing data...';
  const progressPercent = Math.min(100, Math.round((simulationPhase / (phaseMessages.length - 1)) * 100));

  if (isSimulating) {
    return (
      <div className="mb-6 w-full bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-[#1976D2] animate-spin" />
            <h3 className="text-lg font-bold text-[#172033]">Live Simulation in Progress</h3>
          </div>
          <span className="text-[#1976D2] font-mono font-medium">{progressPercent}%</span>
        </div>
        
        <p className="text-[#788597] text-sm mb-4">{currentMessage}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#EAF3FC] h-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#1976D2]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={simulateHeavyRainfall}
      className="mb-6 w-full group relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] hover:border-[#1976D2]/50 rounded-xl p-6 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1976D2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left">
          <div className="bg-[#EAF3FC] group-hover:bg-[#1976D2]/20 p-4 rounded-full transition-colors border border-[#E2E8F0] group-hover:border-[#1976D2]/30">
            <CloudRain className="w-8 h-8 text-[#788597] group-hover:text-[#1976D2] transition-colors" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#172033] group-hover:text-[#1976D2] transition-colors">
              Simulate Heavy Rainfall Event
            </h3>
            <p className="text-[#788597] text-sm mt-1">
              Test system responsiveness by injecting extreme weather data into the AI model.
            </p>
          </div>
        </div>
        
        <div className="bg-[#1976D2] hover:bg-[#1976D2]/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-[#1976D2]/20 transition-colors whitespace-nowrap">
          Launch Simulation
        </div>
      </div>
    </button>
  );
};

export default SimulationButton;
