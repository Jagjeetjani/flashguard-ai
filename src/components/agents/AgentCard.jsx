import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Mountain, Waves, Satellite, Brain, Shield, Bell } from 'lucide-react';

const icons = {
  CloudRain,
  Mountain,
  Waves,
  Satellite,
  Brain,
  Shield,
  Bell
};

const AgentCard = ({ agent, result, index, isActive }) => {
  const Icon = icons[agent.icon] || Brain;
  const isComplete = !!result;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border rounded-xl p-5 relative overflow-hidden ${isActive ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : isComplete ? 'border-[#25844B]/20' : 'border-[#E2E8F0]'}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${isActive ? 'bg-[#1976D2]/10 text-[#1976D2]' : isComplete ? 'bg-[#25844B]/10 text-[#25844B]' : 'bg-[#EAF3FC] text-[#788597]'}`}>
          <Icon size={24} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-[#172033]">{agent.name}</h3>
            <div className="flex items-center gap-2">
              {isActive && <span className="flex w-2 h-2 rounded-full bg-[#1976D2] animate-pulse"></span>}
              <span className={`text-xs font-medium ${isActive ? 'text-[#1976D2]' : isComplete ? 'text-[#25844B]' : 'text-[#8994A3]'}`}>
                {isActive ? 'PROCESSING' : isComplete ? 'COMPLETE' : 'IDLE'}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-[#788597] mb-2">{agent.description}</p>
          
          {isComplete && result && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-[#F4F7FB]/60 rounded-lg border border-[#E2E8F0] text-sm text-[#4A5568]"
            >
              {result.summary || JSON.stringify(result)}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
