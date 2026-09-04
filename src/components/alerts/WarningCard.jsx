import React from 'react';
import { AlertTriangle, MapPin, Clock, CheckCircle } from 'lucide-react';

const WarningCard = ({ warning }) => {
  if (!warning) return null;

  const { severity, location, riskScore, reason, actions, timestamp } = warning;

  const getColorConfig = () => {
    if (severity === 'EMERGENCY') return {
      borderLeft: 'border-l-[#D33D3D]',
      badge: 'bg-[#D33D3D]/10 text-[#D33D3D] border-[#D33D3D]/30',
      icon: 'text-[#D33D3D]',
      title: 'FLASH FLOOD EMERGENCY'
    };
    if (severity === 'WARNING') return {
      borderLeft: 'border-l-[#E67E22]',
      badge: 'bg-[#E67E22]/10 text-[#E67E22] border-[#E67E22]/30',
      icon: 'text-[#E67E22]',
      title: 'FLASH FLOOD WARNING'
    };
    return {
      borderLeft: 'border-l-[#D4A017]',
      badge: 'bg-[#D4A017]/10 text-[#D4A017] border-[#D4A017]/30',
      icon: 'text-[#D4A017]',
      title: 'FLOOD ADVISORY'
    };
  };

  const colors = getColorConfig();

  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#E2E8F0] border-l-[6px] ${colors.borderLeft} bg-white shadow-sm p-6`}>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-xl bg-slate-50 border border-[#E2E8F0] ${colors.icon}`}>
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colors.badge}`}>
                  {severity}
                </span>
                <span className="text-[#788597] text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#12355B] font-heading mt-1">
                {colors.title}
              </h2>
            </div>
          </div>
          
          <div className="text-right sm:border-l sm:border-[#E2E8F0] sm:pl-6">
            <div className="flex items-center sm:justify-end gap-1.5 text-[#172033] mb-0.5">
              <MapPin className="w-4 h-4 text-[#788597]" />
              <span className="font-bold text-base">{location}</span>
            </div>
            <div className="text-xs font-medium text-[#788597]">
              Risk Score: <span className={`font-mono font-extrabold text-sm ${colors.icon}`}>{riskScore}/100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-[#788597] uppercase tracking-wider mb-2 font-heading">
                Reason for Alert
              </h3>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[#172033] text-sm font-medium leading-relaxed shadow-sm">
                {reason}
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#F8FAFC] text-[#172033] rounded-lg font-semibold text-sm transition-colors border border-[#CBD5E1] shadow-sm">
              <CheckCircle className="w-4 h-4 text-[#25844B]" />
              Acknowledge Alert
            </button>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#788597] uppercase tracking-wider mb-2 font-heading">
              Required Actions
            </h3>
            <ul className="space-y-2">
              {actions?.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] shadow-sm">
                  <span className={`font-mono font-bold text-sm mt-0.5 ${colors.icon}`}>
                    {idx + 1}.
                  </span>
                  <span className="text-sm font-medium text-[#172033] leading-snug">
                    {action}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningCard;
