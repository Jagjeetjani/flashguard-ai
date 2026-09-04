import React from 'react';
import ReportForm from '../components/citizen/ReportForm';
import ReportList from '../components/citizen/ReportList';
import useFloodStore from '../store/useFloodStore';
import { Users, AlertTriangle } from 'lucide-react';

const CitizenReportsPage = () => {
  const reports = useFloodStore(state => state.citizenReports || []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172033] flex items-center gap-2">
            <Users className="text-[#1976D2]" />
            Citizen Reports
          </h1>
          <p className="text-[#788597]">Crowdsourced observations and AI verification</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-[#EAF3FC] rounded-full text-xs text-[#788597] flex items-center gap-1">
            <AlertTriangle size={12} className="text-[#D4A017]" />
            Prototype: Photo analysis is simulated
          </div>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-lg text-sm font-semibold text-[#4A5568]">
            Total Reports: {reports.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ReportForm />
        </div>
        <div className="lg:col-span-2">
          <ReportList />
        </div>
      </div>
    </div>
  );
};

export default CitizenReportsPage;
