import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import useFloodStore from '../../store/useFloodStore';
import { useNavigate } from 'react-router-dom';

const StatusBar = () => {
  const { showWarningBanner, dismissWarning } = useFloodStore();
  const navigate = useNavigate();

  if (!showWarningBanner) return null;

  return (
    <div className="relative z-50 bg-[#D33D3D] text-white h-8 flex items-center justify-center px-4 shadow-lg overflow-hidden cursor-pointer" onClick={() => navigate('/alerts')}>
      <div className="absolute inset-0 bg-[#D33D3D]/80 animate-pulse opacity-50"></div>
      
      <div className="relative z-10 flex items-center gap-2 text-sm font-bold tracking-wide">
        <AlertTriangle className="w-4 h-4" />
        FLASH FLOOD WARNING ACTIVE — Click Alerts for details
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          dismissWarning();
        }}
        className="absolute right-2 z-10 p-1 hover:bg-[#C0392B] rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StatusBar;
