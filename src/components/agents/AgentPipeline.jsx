import React from 'react';
import AgentCard from './AgentCard';
import useFloodStore from '../../store/useFloodStore';
import { agents } from '../../engine/agents';
import { ArrowDown } from 'lucide-react';

const AgentPipeline = () => {
  const { isSimulating, currentAgentIndex, agentResults } = useFloodStore();

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#172033]">AI Agent Pipeline</h2>
        <p className="text-sm text-[#788597]">Multi-agent architecture for comprehensive flood risk assessment</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start space-y-2">
        {agents.map((agent, index) => {
          const isActive = isSimulating && currentAgentIndex === index;
          const result = agentResults[agent.id];
          const isComplete = !!result;
          
          return (
            <React.Fragment key={agent.id}>
              <div className="w-full max-w-2xl">
                <AgentCard 
                  agent={agent} 
                  result={result} 
                  index={index} 
                  isActive={isActive} 
                />
              </div>
              
              {index < agents.length - 1 && (
                <div className="flex flex-col items-center justify-center h-8">
                  <div className={`w-0.5 h-full ${isActive || isComplete ? 'bg-[#1976D2]/50' : 'bg-[#EAF3FC]'}`}></div>
                  <ArrowDown size={16} className={`-mt-2 ${isActive || isComplete ? 'text-[#1976D2]' : 'text-slate-700'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl text-center">
        <p className="text-xs text-[#788597] font-medium">DATA FLOW</p>
        <p className="text-sm text-[#4A5568] mt-1">
          Weather Data → Terrain Analysis → Water Conditions → Geographic Risk → Flood Risk Score → Emergency Actions → Public Alerts
        </p>
      </div>
    </div>
  );
};

export default AgentPipeline;
