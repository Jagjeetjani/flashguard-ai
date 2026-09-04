import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import useFloodStore from '../../store/useFloodStore';
import { generateRiskTrend } from '../../data/historicalData';

const RiskTimeline = () => {
  const { overallRisk } = useFloodStore();
  const data = useMemo(() => generateRiskTrend(overallRisk), [overallRisk]);

  const getLineColor = (score) => {
    if (score >= 75) return '#ef4444'; // critical
    if (score >= 55) return '#f97316'; // high
    if (score >= 30) return '#f59e0b'; // moderate
    return '#10b981'; // low
  };

  const lineColor = getLineColor(overallRisk);

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5 h-80 flex flex-col">
      <h3 className="text-lg font-semibold text-[#172033] mb-4">Flood Risk Score Trend</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#788597', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#788597', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#172033' }}
              itemStyle={{ color: lineColor }}
            />
            <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="3 3" />
            <ReferenceLine y={55} stroke="#f97316" strokeDasharray="3 3" />
            <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskTimeline;
