import React from 'react';
import WarningCard from '../components/alerts/WarningCard';
import AlertTimeline from '../components/alerts/AlertTimeline';
import useFloodStore from '../store/useFloodStore';
import { ShieldCheck, BellRing, AlertTriangle } from 'lucide-react';

const AlertsPage = () => {
  const { warnings, villageRisks, showWarningBanner } = useFloodStore();

  const criticalCount = warnings.filter(w => w.severity === 'EMERGENCY').length;
  const warningCount = warnings.filter(w => w.severity === 'WARNING').length;
  const advisoryCount = warnings.filter(w => w.severity === 'ADVISORY').length;
  const affectedVillages = villageRisks?.filter(v => v.riskScore > 55).length || 0;

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#788597] font-medium uppercase tracking-wider">Total Alerts</p>
              <p className="text-3xl font-bold text-[#172033] mt-1">{warnings.length}</p>
            </div>
            <div className="bg-[#1976D2]/10 p-3 rounded-full">
              <BellRing className="w-6 h-6 text-[#1976D2]" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#788597] font-medium uppercase tracking-wider">Critical / Emergency</p>
              <p className="text-3xl font-bold text-[#D33D3D] mt-1">{criticalCount}</p>
            </div>
            <div className="bg-[#D33D3D]/10 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-[#D33D3D]" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#788597] font-medium uppercase tracking-wider">Villages Affected</p>
              <p className="text-3xl font-bold text-[#D4A017] mt-1">{affectedVillages}</p>
            </div>
            <div className="bg-[#D4A017]/10 p-3 rounded-full">
              <ShieldCheck className="w-6 h-6 text-[#D4A017]" />
            </div>
          </div>
        </div>

        {warnings.length > 0 ? (
          <>
            {/* Most Critical Warning */}
            <div>
              <h3 className="text-lg font-bold text-[#172033] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#D33D3D]" />
                Highest Priority Alert
              </h3>
              <WarningCard warning={warnings[0]} />
            </div>

            {/* All Alerts Timeline */}
            {warnings.length > 1 && (
              <div>
                <h3 className="text-lg font-bold text-[#172033] mb-4 flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-[#1976D2]" />
                  All Active Alerts ({warnings.length})
                </h3>
                <AlertTimeline alerts={warnings} />
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-12 text-center">
            <div className="bg-[#25844B]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-[#25844B]" />
            </div>
            <h3 className="text-2xl font-bold text-[#25844B] mb-2">All Clear</h3>
            <p className="text-[#788597] max-w-md mx-auto">
              No active flood warnings at this time. All monitored regions are within safe parameters.
            </p>
            <p className="text-[#8994A3] text-sm mt-4">
              Tip: Use the "Simulate Heavy Rainfall" button to see how warnings are generated.
            </p>
          </div>
        )}

        {/* Prototype Notice */}
        <div className="text-center py-2">
          <span className="text-xs text-[#8A95A3] bg-white/80 px-3 py-1 rounded-full border border-[#E2E8F0]">
            Prototype: Alerts generated from simulated environmental data
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
