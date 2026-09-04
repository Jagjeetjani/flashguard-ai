import React from 'react';
import { Bot, Info } from 'lucide-react';

const RiskExplanation = ({ village, riskResult, envConditions }) => {
  if (!village || !riskResult) return null;

  const explanation = riskResult.explanation || { bullets: [], summary: '' };

  return (
    <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-1.5 bg-[#EAF3FC] rounded-lg text-[#1976D2]">
          <Info className="w-4 h-4" />
        </div>
        <h3 className="text-base font-bold text-[#172033] font-heading">
          Why is {village.name} at risk?
        </h3>
      </div>

      <div className="space-y-2.5 mb-6">
        {explanation.bullets && explanation.bullets.length > 0 ? (
          explanation.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="w-2 h-2 rounded-full bg-[#1976D2] mt-2 shrink-0"></span>
              <p className="text-sm font-medium text-[#2D3748] leading-relaxed">{bullet}</p>
            </div>
          ))
        ) : (
          <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <p className="text-sm text-[#788597]">
              Current conditions are within normal parameters for {village.name}.
            </p>
          </div>
        )}

        {/* Additional village context */}
        <div className="grid grid-cols-2 gap-2.5 mt-3">
          <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#788597]">Elevation</p>
            <p className="text-sm font-bold text-[#172033] mt-0.5">{village.elevation}m</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#788597]">Nearest Stream</p>
            <p className="text-sm font-bold text-[#172033] mt-0.5">{village.nearestStream}</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#788597]">Stream Distance</p>
            <p className="text-sm font-bold text-[#172033] mt-0.5">{village.streamDistance} km</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#788597]">Population</p>
            <p className="text-sm font-bold text-[#172033] mt-0.5">{village.population?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {explanation.summary && (
        <div className="bg-[#EAF3FC] border border-[#1976D2]/30 rounded-xl p-4 flex gap-3.5 shadow-sm">
          <div className="p-2 bg-[#1976D2]/10 rounded-lg text-[#1976D2] shrink-0 self-start">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1976D2] mb-1 font-heading">
              AI Assessment
            </h4>
            <p className="text-sm font-semibold text-[#12355B] leading-relaxed">
              {explanation.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskExplanation;
