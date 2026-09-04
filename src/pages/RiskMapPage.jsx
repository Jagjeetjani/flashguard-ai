import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Users, Activity, ShieldAlert, ArrowRight, X } from 'lucide-react';
import useFloodStore from '../store/useFloodStore';
import RiskMap from '../components/map/RiskMap';
import RiskGauge from '../components/dashboard/RiskGauge';

const RiskMapPage = () => {
  const { villageRisks, selectedVillage, selectVillage } = useFloodStore();

  const selectedData = villageRisks?.find(v => v.id === selectedVillage);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#F4F7FB] overflow-hidden">
      {/* Full Screen Map */}
      <RiskMap height="100%" showControls={true} />

      {/* Floating Side Panel */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute top-4 left-4 bottom-4 w-80 bg-white/90 backdrop-blur-md border border-[#E2E8F0] shadow-2xl rounded-2xl overflow-hidden z-[1000] flex flex-col"
        >
          {selectedData ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-start bg-[#EAF3FC]/30">
                <div>
                  <h2 className="text-2xl font-bold text-[#172033]">{selectedData.name}</h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#788597]">
                    <Users className="w-4 h-4" />
                    <span>Pop: {selectedData.population}</span>
                  </div>
                </div>
                <button 
                  onClick={() => selectVillage(null)}
                  className="p-1 hover:bg-[#EAF3FC] rounded-full text-[#788597] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Risk Gauge */}
                <div className="flex justify-center py-2">
                  <RiskGauge score={selectedData.riskScore} size={180} />
                </div>

                {/* Factors */}
                <div>
                  <h3 className="text-sm font-bold text-[#788597] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4" /> Contributing Factors
                  </h3>
                  <ul className="space-y-2">
                    {selectedData.explanation?.bullets?.map((point, idx) => (
                      <li key={idx} className="text-sm text-[#4A5568] bg-[#EAF3FC]/60 p-2.5 rounded-lg border border-[#E2E8F0] leading-relaxed">
                        • {point}
                      </li>
                    )) || (
                      <li className="text-sm text-[#4A5568] bg-[#EAF3FC]/60 p-2.5 rounded-lg">
                        Standard risk parameters applied.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div>
                  <h3 className="text-sm font-bold text-[#788597] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-4 h-4 text-[#D4A017]" /> Action Required
                  </h3>
                  <div className="bg-[#D4A017]/10 border border-[#D4A017]/20 rounded-lg p-3">
                    <p className="text-sm text-[#D4A017] leading-relaxed">
                      {selectedData.riskLevel === 'CRITICAL' || selectedData.riskLevel === 'HIGH' 
                        ? 'Initiate immediate evacuation protocols. Notify local disaster response teams and stage emergency supplies at higher elevation.'
                        : 'Maintain standard monitoring. Inform local community leaders to stay alert for weather updates.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer Action */}
              <div className="p-4 border-t border-[#E2E8F0] bg-white">
                <button className="w-full bg-[#1976D2] hover:bg-[#1976D2]/90 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#1976D2]/20">
                  Issue Direct Alert <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#788597] p-8 text-center">
              <Info className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium text-[#4A5568] mb-2">No Location Selected</p>
              <p className="text-sm text-[#8994A3]">Click on any village or region marker on the map to view detailed risk analysis and vulnerability data.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RiskMapPage;
