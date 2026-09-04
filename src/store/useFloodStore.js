import { create } from 'zustand';
import { calculateVillageRisk } from '../engine/riskEngine';
import { generateWarnings } from '../engine/warningGenerator';
import { runAgentPipeline } from '../engine/agents';
import villages from '../data/villages';

const useFloodStore = create((set, get) => ({
  // Environment state (initial = normal conditions)
  environment: {
    rainfall: 45,
    rainfallIntensity: 8,
    soilMoisture: 52,
    streamLevel: 2.1,
  },

  // Simulation state
  isSimulating: false,
  simulationPhase: 0,
  simulationInterval: null,

  // Derived data
  villageRisks: [],
  overallRisk: 38,
  warnings: [],
  agentResults: [],
  
  // UI state
  selectedVillage: null,
  showWarningBanner: false,

  // Citizen reports
  citizenReports: [
    {
      id: 'rep-1',
      location: 'Reni',
      message: 'Water level rapidly increasing near Reni bridge',
      time: '1 hour ago',
      verified: true
    },
    {
      id: 'rep-2',
      location: 'Rishiganga tributary',
      message: 'Unusual muddy water flow observed in Rishiganga tributary',
      time: '30 min ago',
      verified: false
    }
  ],

  // Actions
  setEnvironment: (updates) => {
    set(state => ({
      environment: { ...state.environment, ...updates }
    }));
    get().recalculateRisks();
  },
  
  recalculateRisks: () => {
    const env = get().environment;
    const computedRisks = villages.map(v => calculateVillageRisk(v, env));
    
    const avgRisk = computedRisks.reduce((acc, curr) => acc + curr.riskScore, 0) / computedRisks.length;
    const warnings = generateWarnings(villages, computedRisks, env);
    const agentResults = runAgentPipeline(env, computedRisks);
    
    set({
      villageRisks: computedRisks,
      overallRisk: Math.round(avgRisk),
      warnings,
      agentResults
    });
  },

  simulateHeavyRainfall: () => {
    if (get().isSimulating) return;

    set({ isSimulating: true, simulationPhase: 1, showWarningBanner: false });

    let tick = 0;
    const maxTicks = 20; // 20 ticks * 500ms = 10s
    
    const interval = setInterval(() => {
      tick++;
      const progress = tick / maxTicks;
      
      let newRainfall = 45;
      let newSoil = 52;
      let newStream = 2.1;
      let newIntensity = 8;
      let phase = 1;

      if (tick <= 4) { // Phase 1: 0-2s
        phase = 1;
        newRainfall = 45 + (180 - 45) * (tick / 4);
      } else if (tick <= 8) { // Phase 2: 2-4s
        phase = 2;
        newRainfall = 180;
        newSoil = 52 + (92 - 52) * ((tick - 4) / 4);
      } else if (tick <= 12) { // Phase 3: 4-6s
        phase = 3;
        newRainfall = 180;
        newSoil = 92;
        newStream = 2.1 + (5.8 - 2.1) * ((tick - 8) / 4);
      } else if (tick <= 16) { // Phase 4: 6-8s
        phase = 4;
        newRainfall = 180;
        newSoil = 92;
        newStream = 5.8;
        newIntensity = 8 + (38 - 8) * ((tick - 12) / 4);
      } else { // Phase 5: 8-10s
        phase = 5;
        newRainfall = 180;
        newSoil = 92;
        newStream = 5.8;
        newIntensity = 38;
      }

      set(state => ({
        simulationPhase: phase,
        environment: {
          ...state.environment,
          rainfall: newRainfall,
          soilMoisture: newSoil,
          streamLevel: newStream,
          rainfallIntensity: newIntensity
        }
      }));
      
      get().recalculateRisks();

      if (tick >= maxTicks) {
        clearInterval(get().simulationInterval);
        set({ isSimulating: false, showWarningBanner: true, simulationInterval: null });
      }
    }, 500);

    set({ simulationInterval: interval });
  },

  resetSimulation: () => {
    const currentInterval = get().simulationInterval;
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    
    set({
      environment: {
        rainfall: 45,
        rainfallIntensity: 8,
        soilMoisture: 52,
        streamLevel: 2.1,
      },
      isSimulating: false,
      simulationPhase: 0,
      simulationInterval: null,
      showWarningBanner: false,
      selectedVillage: null
    });
    
    get().recalculateRisks();
  },

  selectVillage: (villageId) => set({ selectedVillage: villageId }),

  dismissWarning: () => set({ showWarningBanner: false }),
  
  addCitizenReport: (report) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      time: 'Just now',
      verified: false,
      ...report
    };
    set(state => ({
      citizenReports: [newReport, ...state.citizenReports]
    }));
  }
}));

// Initial calculation
useFloodStore.getState().recalculateRisks();

export default useFloodStore;
