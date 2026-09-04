import React from 'react';
import RainfallChart from '../components/analytics/RainfallChart';
import RiskTimeline from '../components/analytics/RiskTimeline';
import StreamLevelChart from '../components/analytics/StreamLevelChart';
import useFloodStore from '../store/useFloodStore';
import { classifyRisk } from '../engine/riskEngine';
import { generatePopulationImpact } from '../data/historicalData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Droplets, Activity, Users } from 'lucide-react';

const AnalyticsPage = () => {
  const { environment, overallRisk, villageRisks } = useFloodStore();
  const riskClass = classifyRisk(overallRisk);
  const atRiskCount = villageRisks?.filter(v => v.riskScore > 55).length || 0;
  const affectedPop = villageRisks?.filter(v => v.riskScore > 55).reduce((sum, v) => sum + (v.population || 0), 0) || 0;
  const popData = React.useMemo(() => generatePopulationImpact(affectedPop), [affectedPop]);

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172033] flex items-center gap-2">
            <BarChart3 className="text-[#1976D2]" />
            Analytics Dashboard
          </h1>
          <p className="text-[#788597]">Real-time data visualization and historical trends</p>
        </div>
        <div className="px-3 py-1 bg-[#EAF3FC] rounded-full text-xs text-[#788597] border border-[#E2E8F0]">
          Prototype: Analytics based on simulated data
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-3 text-[#788597] mb-2">
            <Droplets size={18} className="text-[#1976D2]" />
            <span className="text-sm font-medium">Peak Rainfall</span>
          </div>
          <div className="text-2xl font-bold text-[#172033]">{Math.round(environment.rainfall)} <span className="text-base font-normal text-[#8994A3]">mm/6h</span></div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-3 text-[#788597] mb-2">
            <Activity size={18} className="text-[#7C3AED]" />
            <span className="text-sm font-medium">Max Risk Score</span>
          </div>
          <div className="text-2xl font-bold text-[#172033]">{overallRisk} <span className="text-sm px-2 py-1 ml-2 rounded bg-[#EAF3FC] text-[#4A5568]">{riskClass.label}</span></div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-3 text-[#788597] mb-2">
            <Activity size={18} className="text-[#0891B2]" />
            <span className="text-sm font-medium">Stream Level</span>
          </div>
          <div className="text-2xl font-bold text-[#172033]">{environment.streamLevel.toFixed(1)} <span className="text-base font-normal text-[#8994A3]">m</span></div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-3 text-[#788597] mb-2">
            <Users size={18} className="text-[#E67E22]" />
            <span className="text-sm font-medium">Affected Population</span>
          </div>
          <div className="text-2xl font-bold text-[#172033]">{affectedPop.toLocaleString()} <span className="text-base font-normal text-[#8994A3]">est.</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RainfallChart />
        <RiskTimeline />
        <StreamLevelChart />
        
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5 h-80 flex flex-col">
          <h3 className="text-lg font-semibold text-[#172033] mb-4">Estimated Population Impact</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={popData} margin={{ top: 5, right: 0, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#8994A3', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8994A3', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#172033' }}
                  itemStyle={{ color: '#f97316' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorPop)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
