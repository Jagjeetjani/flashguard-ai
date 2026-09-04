import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useFloodStore from '../../store/useFloodStore';
import { generateRainfallTrend } from '../../data/historicalData';

const RainfallChart = () => {
  const { environment } = useFloodStore();
  const data = useMemo(() => generateRainfallTrend(environment.rainfall), [environment.rainfall]);

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5 h-80 flex flex-col">
      <h3 className="text-lg font-semibold text-[#172033] mb-4">Rainfall Trend (6h)</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#788597', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#788597', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#172033' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRain)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainfallChart;
