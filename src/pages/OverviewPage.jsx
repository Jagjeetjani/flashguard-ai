import React from 'react';
import { CloudRain, Droplets, Waves, AlertTriangle, Home, Route } from 'lucide-react';
import useFloodStore from '../store/useFloodStore';
import AlertBanner from '../components/dashboard/AlertBanner';
import SimulationButton from '../components/dashboard/SimulationButton';
import KPICard from '../components/dashboard/KPICard';
import RiskMap from '../components/map/RiskMap';
import RiskGauge from '../components/dashboard/RiskGauge';

const OverviewPage = () => {
  const { environment, overallRisk, villageRisks, isSimulating } = useFloodStore();

  // Derived metrics
  const atRiskVillagesCount = villageRisks?.filter(v => v.riskScore > 55).length || 0;
  
  // Sorting villages by risk for the priority list
  const priorityList = villageRisks 
    ? [...villageRisks].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5)
    : [];

  // Determine trend for UI
  const getTrend = (isSimulating) => isSimulating ? 'up' : 'stable';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Row 1: Alert Banner (Conditional) */}
      <AlertBanner />

      {/* Row 2: Simulation Trigger */}
      <SimulationButton />

      {/* Row 3: KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard 
          icon={CloudRain} 
          label="Rainfall (6h)" 
          value={environment?.rainfall?.toFixed(1) || '0'} 
          unit="mm" 
          trend={getTrend(isSimulating)}
          status={environment?.rainfall > 100 ? 'critical' : environment?.rainfall > 50 ? 'warning' : 'normal'}
        />
        <KPICard 
          icon={Droplets} 
          label="Soil Moisture" 
          value={environment?.soilMoisture?.toFixed(1) || '0'} 
          unit="%" 
          trend={getTrend(isSimulating)}
          status={environment?.soilMoisture > 85 ? 'danger' : 'normal'}
        />
        <KPICard 
          icon={Waves} 
          label="Stream Level" 
          value={environment?.streamLevel?.toFixed(2) || '0'} 
          unit="m" 
          trend={getTrend(isSimulating)}
          status={environment?.streamLevel > 5 ? 'danger' : 'normal'}
        />
        <KPICard 
          icon={AlertTriangle} 
          label="System Risk" 
          value={Math.round(overallRisk || 0)} 
          unit="/100" 
          trend={getTrend(isSimulating)}
          status={overallRisk > 75 ? 'critical' : overallRisk > 50 ? 'danger' : 'normal'}
        />
        <KPICard 
          icon={Home} 
          label="At-Risk Villages" 
          value={atRiskVillagesCount} 
          unit="" 
          trend={atRiskVillagesCount > 0 ? 'up' : 'stable'}
          status={atRiskVillagesCount > 3 ? 'critical' : atRiskVillagesCount > 0 ? 'danger' : 'normal'}
        />
        <KPICard 
          icon={Route} 
          label="Vuln. Roads" 
          value={isSimulating ? 4 : 0} // Hardcoded for demo visualization
          unit="" 
          trend={getTrend(isSimulating)}
          status={isSimulating ? 'warning' : 'normal'}
        />
      </div>

      {/* Row 4: Map & Priority List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Map */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#172033]">Live Threat Map</h3>
            <span className="text-xs font-medium text-[#788597] bg-[#EAF3FC] px-2 py-1 rounded">Chamoli-Rudraprayag Sector</span>
          </div>
          <RiskMap height="450px" />
        </div>

        {/* Right Column: Emergency Priority */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E2E8F0]">
            <AlertTriangle className="w-5 h-5 text-[#D33D3D]" />
            <h3 className="text-lg font-bold text-[#172033]">Emergency Priority</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {priorityList.map((village, idx) => (
              <div 
                key={village.id}
                className="bg-[#EAF3FC]/60 border border-[#E2E8F0] rounded-lg p-4 hover:border-[#E2E8F0] transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#8994A3] font-mono font-bold text-sm">#{idx + 1}</span>
                    <h4 className="font-bold text-[#172033]">{village.name}</h4>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    village.riskLevel === 'CRITICAL' ? 'bg-[#D33D3D]/20 text-[#D33D3D] border border-[#D33D3D]/30' :
                    village.riskLevel === 'HIGH' ? 'bg-[#E67E22]/20 text-[#E67E22] border border-[#E67E22]/30' :
                    village.riskLevel === 'MODERATE' ? 'bg-[#D4A017]/20 text-[#D4A017] border border-[#D4A017]/30' :
                    'bg-[#25844B]/20 text-[#25844B] border border-[#25844B]/30'
                  }`}>
                    {village.riskLevel}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 rounded p-2 text-center">
                    <div className="text-xs text-[#788597] mb-0.5">Risk Score</div>
                    <div className="font-bold text-[#2D3748]">{village.riskScore}/100</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 rounded p-2 text-center">
                    <div className="text-xs text-[#788597] mb-0.5">Population</div>
                    <div className="font-bold text-[#2D3748]">{village.population}</div>
                  </div>
                </div>
              </div>
            ))}
            {priorityList.length === 0 && (
              <div className="text-center text-[#8994A3] py-10">
                No active threats detected.
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewPage;
