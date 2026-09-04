export const agents = [
  {
    id: 'weather',
    name: 'Weather Agent',
    icon: 'CloudRain',
    description: 'Analyzes rainfall patterns and weather conditions',
    process: (envConditions) => {
      if (envConditions.rainfall > 100) {
        return { status: 'critical', analysis: `Rainfall of ${Math.round(envConditions.rainfall)}mm recorded with intensity of ${Math.round(envConditions.rainfallIntensity)}mm/h. Conditions indicate continued heavy precipitation. Cloud cover analysis suggests sustained rainfall for the next 2-3 hours.` };
      }
      return { status: 'normal', analysis: `Normal rainfall patterns detected (${Math.round(envConditions.rainfall)}mm). No significant weather anomalies expected in the short term.` };
    }
  },
  {
    id: 'terrain',
    name: 'Terrain & Soil Agent',
    icon: 'Mountain',
    description: 'Evaluates soil saturation and slope stability',
    process: (envConditions) => {
      if (envConditions.soilMoisture > 80) {
        return { status: 'critical', analysis: `Soil saturation critical at ${Math.round(envConditions.soilMoisture)}%. High probability of mudslides on slopes > 30°. Ground absorption capacity is severely compromised.` };
      }
      return { status: 'normal', analysis: `Soil moisture levels stable at ${Math.round(envConditions.soilMoisture)}%. Slope stability remains within safe margins.` };
    }
  },
  {
    id: 'hydrology',
    name: 'Hydrology Agent',
    icon: 'Waves',
    description: 'Monitors river levels and discharge rates',
    process: (envConditions) => {
      if (envConditions.streamLevel > 4) {
        return { status: 'critical', analysis: `River level rapidly rising, currently at ${envConditions.streamLevel.toFixed(1)}m. Flow rates exceeding safe thresholds. Tributary backflow detected.` };
      }
      return { status: 'normal', analysis: `River level nominal at ${envConditions.streamLevel.toFixed(1)}m. Discharge rates normal.` };
    }
  },
  {
    id: 'geospatial',
    name: 'Geospatial Agent',
    icon: 'Map',
    description: 'Maps impact zones and vulnerable infrastructure',
    process: (envConditions, villages) => {
      const atRisk = villages.filter(v => v.riskScore > 60).length;
      if (atRisk > 0) {
        return { status: 'warning', analysis: `Identified ${atRisk} population centers in high-risk zones. Bridge infrastructure near affected areas requires immediate structural assessment.` };
      }
      return { status: 'normal', analysis: `Spatial analysis shows no immediate threat to critical infrastructure or population centers.` };
    }
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment Agent',
    icon: 'Activity',
    description: 'Calculates compound risk probabilities',
    process: (envConditions) => {
      if (envConditions.rainfall > 80 && envConditions.soilMoisture > 70) {
        return { status: 'critical', analysis: `Compound risk factors escalating exponentially. Simultaneous high rainfall and soil saturation creating extreme flash flood probability.` };
      }
      return { status: 'normal', analysis: `Compound risk factors are within normal operational limits.` };
    }
  },
  {
    id: 'emergency-response',
    name: 'Logistics Agent',
    icon: 'Truck',
    description: 'Plans evacuation and resource deployment',
    process: (envConditions, villages) => {
      const atRisk = villages.filter(v => v.riskScore > 75).length;
      if (atRisk > 0) {
        return { status: 'warning', analysis: `Pre-positioning NDRF units recommended. Evacuation routes may be compromised by rising water levels.` };
      }
      return { status: 'normal', analysis: `Emergency response resources on standard standby. Routes are clear.` };
    }
  },
  {
    id: 'alert',
    name: 'Alert & Comm Agent',
    icon: 'BellRing',
    description: 'Manages multi-channel public warnings',
    process: (envConditions, villages) => {
      const atRisk = villages.filter(v => v.riskScore > 75).length;
      if (atRisk > 0) {
        return { status: 'critical', analysis: `Preparing localized SMS alerts for at-risk zones. Broadcasting emergency instructions on local radio frequencies.` };
      }
      return { status: 'normal', analysis: `No active mass communications required. Channels operating normally.` };
    }
  }
];

export function runAgentPipeline(envConditions, villagesRiskResults) {
  const timestamp = new Date().toISOString();
  return agents.map(agent => {
    const result = agent.process(envConditions, villagesRiskResults);
    return {
      agentId: agent.id,
      name: agent.name,
      icon: agent.icon,
      status: result.status,
      analysis: result.analysis,
      timestamp
    };
  });
}
