import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const KPICard = ({ icon: Icon, label, value, unit, trend, status = 'normal' }) => {
  
  const statusColors = {
    normal: { bg: 'bg-[#25844B]/10', text: 'text-[#25844B]', value: 'text-[#25844B]' },
    warning: { bg: 'bg-[#D4A017]/10', text: 'text-[#D4A017]', value: 'text-[#D4A017]' },
    danger: { bg: 'bg-[#E67E22]/10', text: 'text-[#E67E22]', value: 'text-[#E67E22]' },
    critical: { bg: 'bg-[#D33D3D]/10', text: 'text-[#D33D3D]', value: 'text-[#D33D3D]' },
  };

  const colors = statusColors[status] || statusColors.normal;

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5 hover:border-[#E2E8F0] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-[#788597] text-sm font-medium">{label}</h3>
      </div>
      
      <div className="flex items-baseline gap-2 mb-3">
        <span className={`text-3xl font-bold tracking-tight ${colors.value}`}>
          {value}
        </span>
        {unit && <span className="text-[#788597] text-sm font-medium">{unit}</span>}
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium">
        {trend === 'up' && <><ArrowUpRight className="w-3.5 h-3.5 text-[#D33D3D]" /><span className="text-[#D33D3D]">Increasing</span></>}
        {trend === 'down' && <><ArrowDownRight className="w-3.5 h-3.5 text-[#25844B]" /><span className="text-[#25844B]">Decreasing</span></>}
        {trend === 'stable' && <><Minus className="w-3.5 h-3.5 text-[#788597]" /><span className="text-[#788597]">Stable</span></>}
      </div>
    </div>
  );
};

export default KPICard;
