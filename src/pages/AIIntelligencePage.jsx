import React from 'react';
import AgentPipeline from '../components/agents/AgentPipeline';
import useFloodStore from '../store/useFloodStore';
import { runAgentPipeline } from '../engine/agents';
import { Play, RotateCcw, Activity } from 'lucide-react';

const AIIntelligencePage = () => {
  const { isSimulating, agentResults, resetSimulation } = useFloodStore();
  
  const isComplete = Object.keys(agentResults).length === 7;
  
  const handleRun = () => {
    if (isComplete) {
      resetSimulation();
    }
    runAgentPipeline();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172033] flex items-center gap-2">
            <Activity className="text-[#1976D2]" />
            AI Intelligence
          </h1>
          <p className="text-[#788597]">Multi-Agent Architecture for Flood Risk Assessment</p>
        </div>
        
        <div className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2
          ${isSimulating ? 'bg-[#1976D2]/10 border-[#1976D2]/20 text-[#1976D2]' : 
            isComplete ? 'bg-[#25844B]/10 border-[#25844B]/30 text-[#25844B]' : 
            'bg-[#EAF3FC]/60 border-[#E2E8F0] text-[#788597]'}`}
        >
          <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-[#1976D2] animate-pulse' : isComplete ? 'bg-[#25844B]' : 'bg-[#8994A3]'}`}></span>
          Pipeline {isSimulating ? 'RUNNING' : isComplete ? 'COMPLETE' : 'IDLE'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AgentPipeline />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#172033] mb-4">How It Works</h3>
            <ol className="space-y-3 text-sm text-[#4A5568] relative border-l border-[#E2E8F0] ml-3 pl-4">
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                Environmental sensors provide real-time data
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#1976D2] font-medium">Weather Agent</span> analyzes rainfall patterns
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#D4A017] font-medium">Terrain Agent</span> evaluates slope and elevation risk
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#0891B2] font-medium">Hydrology Agent</span> monitors stream conditions
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#25844B] font-medium">Geospatial Agent</span> maps vulnerable infrastructure
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#7C3AED] font-medium">Risk Assessment Agent</span> combines all signals
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#D33D3D] font-medium">Emergency Response Agent</span> prioritizes actions
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#F4F7FB]"></span>
                <span className="text-[#E67E22] font-medium">Alert Agent</span> notifies authorities and citizens
              </li>
            </ol>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#172033] mb-4">Architecture Benefits</h3>
            <ul className="space-y-2 text-sm text-[#4A5568] list-disc list-inside">
              <li>Modular and extensible</li>
              <li>Each agent is independently upgradeable</li>
              <li>Real ML models can replace prototype scoring</li>
              <li>Supports real-time data integration</li>
            </ul>
          </div>
          
          <button 
            onClick={handleRun}
            disabled={isSimulating}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
              isSimulating 
                ? 'bg-[#EAF3FC] text-[#8994A3] cursor-not-allowed' 
                : 'bg-[#1976D2] hover:bg-[#1565C0] text-white'
            }`}
          >
            {isSimulating ? (
              <>
                <span className="w-4 h-4 border-2 border-[#8994A3] border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : isComplete ? (
              <>
                <RotateCcw size={18} />
                Restart Pipeline
              </>
            ) : (
              <>
                <Play size={18} />
                Run Agent Pipeline
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIIntelligencePage;
