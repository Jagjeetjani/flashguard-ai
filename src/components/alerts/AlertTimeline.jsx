import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const AlertTimeline = ({ alerts }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!alerts || alerts.length === 0) return null;

  const getDotColor = (severity) => {
    if (severity === 'EMERGENCY') return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    if (severity === 'WARNING') return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]';
    return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
  };

  const getBadgeColor = (severity) => {
    if (severity === 'EMERGENCY') return 'bg-[#D33D3D]/10 text-[#D33D3D] border border-[#D33D3D]/20';
    if (severity === 'WARNING') return 'bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20';
    return 'bg-[#D4A017]/10 text-[#D4A017] border border-amber-500/30';
  };

  const getIconColor = (severity) => {
    if (severity === 'EMERGENCY') return 'text-[#D33D3D]';
    if (severity === 'WARNING') return 'text-[#E67E22]';
    return 'text-[#D4A017]';
  };

  return (
    <div className="relative border-l-2 border-[#E2E8F0] ml-4 pl-8 space-y-4 py-2">
      {alerts.map((alert, idx) => {
        const isExpanded = expandedId === alert.id;

        return (
          <div key={alert.id || idx} className="relative">
            <div className={`absolute -left-[41px] top-4 w-4 h-4 rounded-full border-2 border-white ${getDotColor(alert.severity)}`}></div>
            
            <div 
              className={`bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border ${isExpanded ? 'border-[#E2E8F0]' : 'border-[#E2E8F0] hover:border-[#E2E8F0]'} rounded-xl overflow-hidden transition-all cursor-pointer`}
              onClick={() => setExpandedId(isExpanded ? null : alert.id)}
            >
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-sm font-mono text-[#8994A3] w-16 shrink-0">
                    {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : 'Now'}
                  </div>
                  
                  <div className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${getBadgeColor(alert.severity)}`}>
                    {alert.severity}
                  </div>
                  
                  <div className="flex items-center gap-2 text-[#2D3748] font-medium">
                    <MapPin className="w-4 h-4 text-[#8994A3]" />
                    {alert.location}
                  </div>
                  
                  <span className="text-[#8994A3] text-sm font-mono">{alert.riskScore}/100</span>
                </div>
                
                <div className="text-[#8994A3]">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#E2E8F0] bg-[#F4F7FB]/30">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${getIconColor(alert.severity)}`} />
                    <p className="text-[#4A5568] text-sm leading-relaxed">
                      {alert.reason}
                    </p>
                  </div>
                  
                  {alert.actions && alert.actions.length > 0 && (
                    <div className="ml-8 space-y-1">
                      <p className="text-xs font-semibold text-[#8994A3] uppercase tracking-wider mb-2">Recommended Actions</p>
                      {alert.actions.map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-[#788597]">
                          <span className="text-[#8A95A3] font-mono mt-0.5">{i + 1}.</span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertTimeline;
