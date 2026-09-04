import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import useFloodStore from '../../store/useFloodStore';
import { Link } from 'react-router-dom';

const AlertBanner = () => {
  const { showWarningBanner, villageRisks } = useFloodStore();

  // Find highest risk village
  const highestRisk = villageRisks?.length 
    ? [...villageRisks].sort((a, b) => b.riskScore - a.riskScore)[0] 
    : null;

  if (!highestRisk) return null;

  return (
    <AnimatePresence>
      {showWarningBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-6 w-full bg-[#D33D3D]/5 border border-[#D33D3D]/20 rounded-xl p-5 shadow-[0_0_30px_rgba(211,61,61,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-[#D33D3D] animate-pulse"></div>
          
          <div className="flex items-center justify-between gap-6 pl-4">
            <div className="flex items-start gap-4">
              <div className="bg-[#D33D3D]/20 p-3 rounded-full mt-1">
                <AlertTriangle className="w-8 h-8 text-[#D33D3D] animate-pulse" />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#D33D3D] tracking-tight flex items-center gap-2">
                  FLASH FLOOD WARNING
                  <span className="bg-[#D33D3D] text-white text-[10px] uppercase px-2 py-0.5 rounded font-black tracking-wider">Critical</span>
                </h2>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#172033]">{highestRisk.name}</span>
                  <span className="text-[#D33D3D] font-medium text-sm">Risk Score: {highestRisk.riskScore}/100</span>
                </div>
                <p className="text-[#4A5568] mt-2 text-sm max-w-2xl">
                  {highestRisk.explanation?.summary || 'High vulnerability due to recent rainfall and saturated soil conditions.'} Immediate evacuation preparation recommended.
                </p>
              </div>
            </div>

            <Link 
              to="/alerts"
              className="group flex items-center gap-2 px-5 py-2.5 bg-[#D33D3D] hover:bg-[#D33D3D]/90 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;
