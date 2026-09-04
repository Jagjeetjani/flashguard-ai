import React from 'react';
import EnvironmentSliders from './EnvironmentSliders';
import useFloodStore from '../../store/useFloodStore';
import { classifyRisk } from '../../engine/riskEngine';
import { Activity, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

const SimulationPanel = () => {
  const { environment, overallRisk } = useFloodStore();
  
  const riskClass = classifyRisk(overallRisk);

  const getRiskIcon = () => {
    if (riskClass.level === 'CRITICAL') return <ShieldAlert className="w-6 h-6 text-[#D33D3D]" />;
    if (riskClass.level === 'HIGH') return <ShieldAlert className="w-6 h-6 text-[#E67E22]" />;
    if (riskClass.level === 'MODERATE') return <Shield className="w-6 h-6 text-[#D4A017]" />;
    return <ShieldCheck className="w-6 h-6 text-[#25844B]" />;
  };

  const getRiskTextColor = () => {
    if (riskClass.level === 'CRITICAL') return 'text-[#D33D3D]';
    if (riskClass.level === 'HIGH') return 'text-[#E67E22]';
    if (riskClass.level === 'MODERATE') return 'text-[#D4A017]';
    return 'text-[#25844B]';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-6 shadow-xl flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-[#172033] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#1976D2]" />
            Environment Simulator
          </h2>
          <p className="text-sm text-[#788597] mt-1">
            Adjust parameters to see how environmental changes affect flood risk
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-[#1976D2]/10 text-[#1976D2] rounded border border-[#1976D2]/20 uppercase tracking-wider">
          Simulated Data
        </span>
      </div>

      <div className="my-6 p-4 bg-[#F4F7FB] rounded-lg border border-[#E2E8F0] flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8994A3] uppercase tracking-wider font-semibold mb-1">Baseline Risk</p>
          <div className="flex items-center gap-2">
            {getRiskIcon()}
            <span className={`text-lg font-bold ${getRiskTextColor()}`}>
              {riskClass.label}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8994A3] uppercase tracking-wider font-semibold mb-1">Score</p>
          <p className="text-2xl font-mono font-bold text-[#2D3748]">
            {overallRisk}<span className="text-sm text-[#8994A3]">/100</span>
          </p>
        </div>
      </div>

      <div className="flex-1">
        <EnvironmentSliders />
      </div>
    </div>
  );
};

export default SimulationPanel;
