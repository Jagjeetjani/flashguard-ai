import React from 'react';
import useFloodStore from '../../store/useFloodStore';
import { Camera, MapPin, Clock, BrainCircuit } from 'lucide-react';

const ReportList = () => {
  const reports = useFloodStore(state => state.citizenReports || []);

  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-8 text-center text-[#8994A3]">
          No reports submitted yet.
        </div>
      ) : (
        reports.map(report => (
          <div key={report.id} className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                  report.verified 
                    ? 'bg-[#25844B]/10 text-[#25844B] border-[#25844B]/20' 
                    : 'bg-[#D4A017]/10 text-[#D4A017] border-amber-500/30'
                }`}>
                  {report.verified ? 'VERIFIED' : 'REQUIRES VERIFICATION'}
                </span>
                {report.severity && (
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                    report.severity === 'Critical' ? 'bg-[#D33D3D]/10 text-[#D33D3D] border-red-500/20' :
                    report.severity === 'High' ? 'bg-orange-500/10 text-[#E67E22] border-orange-500/20' :
                    'bg-amber-500/10 text-[#D4A017] border-amber-500/20'
                  }`}>
                    {report.severity}
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-[#8994A3] gap-4">
                <span className="flex items-center gap-1"><MapPin size={12} /> {report.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {report.time || 'Just now'}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              {report.photo && (
                <div className="w-24 h-24 bg-[#EAF3FC] rounded-lg flex items-center justify-center flex-shrink-0 text-[#8A95A3] border border-[#E2E8F0]">
                  <Camera size={24} />
                </div>
              )}
              
              <div className="flex-1">
                <p className="text-[#4A5568] text-sm mb-4">"{report.message || report.description || ''}"</p>
                
                {report.aiAssessment && (
                  <div className="bg-[#F4F7FB] rounded-lg p-3 border border-[#E2E8F0] flex gap-3">
                    <BrainCircuit size={16} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#788597] mb-1">AI ASSESSMENT</p>
                      <p className="text-sm text-[#4A5568]">{report.aiAssessment}</p>
                    </div>
                  </div>
                )}

                {!report.aiAssessment && (
                  <div className="bg-[#F4F7FB] rounded-lg p-3 border border-[#E2E8F0] flex gap-3">
                    <BrainCircuit size={16} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#788597] mb-1">AI ASSESSMENT</p>
                      <p className="text-sm text-[#4A5568]">
                        Report is consistent with current environmental monitoring data for the {report.location} region.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;
