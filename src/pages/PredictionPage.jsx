import React, { useState, useMemo } from 'react';
import SimulationPanel from '../components/simulation/SimulationPanel';
import FactorBreakdown from '../components/prediction/FactorBreakdown';
import RiskExplanation from '../components/prediction/RiskExplanation';
import useFloodStore from '../store/useFloodStore';
import { calculateVillageRisk, classifyRisk } from '../engine/riskEngine';
import villages from '../data/villages';
import { Clock, MapPin, AlertTriangle, ChevronDown } from 'lucide-react';

const PredictionPage = () => {
  const { environment } = useFloodStore();
  const [selectedVillageId, setSelectedVillageId] = useState(villages[0]?.id || '');

  const selectedVillage = useMemo(() => {
    return villages.find(v => v.id === selectedVillageId) || villages[0];
  }, [selectedVillageId]);

  const riskResult = useMemo(() => {
    if (!selectedVillage) return null;
    return calculateVillageRisk(selectedVillage, environment);
  }, [selectedVillage, environment]);

  const riskClass = riskResult ? classifyRisk(riskResult.riskScore) : null;

  const getColor = (level) => {
    if (level === 'CRITICAL') return { text: 'text-[#D33D3D]', stroke: 'stroke-[#D33D3D]', badge: 'bg-[#D33D3D]/20 text-[#D33D3D] border-[#D33D3D]/30' };
    if (level === 'HIGH') return { text: 'text-[#E67E22]', stroke: 'stroke-[#E67E22]', badge: 'bg-[#E67E22]/20 text-[#E67E22] border-[#E67E22]/30' };
    if (level === 'MODERATE') return { text: 'text-[#D4A017]', stroke: 'stroke-[#D4A017]', badge: 'bg-[#D4A017]/20 text-[#D4A017] border-[#D4A017]/30' };
    return { text: 'text-[#25844B]', stroke: 'stroke-[#25844B]', badge: 'bg-[#25844B]/20 text-[#25844B] border-[#25844B]/30' };
  };

  const colors = riskClass ? getColor(riskClass.level) : getColor('LOW');

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel: Simulation */}
          <div className="w-full lg:w-1/3">
            <SimulationPanel />
          </div>

          {/* Right Panel: Prediction Details */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Top Bar: Village Selection & Time */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] p-4 rounded-xl">
              <div className="relative">
                <div className="flex items-center gap-2 text-[#788597] mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Select Location</span>
                </div>
                <div className="relative">
                  <select 
                    value={selectedVillageId}
                    onChange={(e) => setSelectedVillageId(e.target.value)}
                    className="appearance-none bg-white border border-[#E2E8F0] text-[#172033] py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[#1976D2] w-64 font-medium"
                  >
                    {villages.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#788597] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[#788597]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Last Updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {riskResult && riskClass && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Overall Risk Gauge & Factors */}
                <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-[#172033] mb-6">Overall Risk Assessment</h3>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-[#EAF3FC]" strokeWidth="8" />
                        <circle 
                          cx="50" cy="50" r="40" fill="transparent" 
                          className={`${colors.stroke} transition-all duration-1000 ease-out`}
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * riskResult.riskScore) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-bold font-mono ${colors.text}`}>
                          {riskResult.riskScore}
                        </span>
                        <span className="text-xs text-[#8994A3] uppercase tracking-wider">Score</span>
                      </div>
                    </div>

                    <div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full border mb-2 ${colors.badge}`}>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="font-bold text-sm uppercase tracking-wider">{riskClass.label}</span>
                      </div>
                      <p className="text-sm text-[#788597]">
                        Based on current environmental factors and location vulnerability.
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-sm font-semibold text-[#4A5568] mb-3 uppercase tracking-wider">Risk Factors</h4>
                    <FactorBreakdown factors={riskResult.factors} />
                  </div>
                </div>

                {/* Explanation */}
                <div className="space-y-6">
                  <RiskExplanation 
                    village={selectedVillage} 
                    riskResult={riskResult} 
                    envConditions={environment} 
                  />
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
