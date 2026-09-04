export function calculateFloodRisk({ rainfall, rainfallIntensity, soilMoisture, slope, elevation, streamLevel, historicalRisk, drainageDensity }) {
  // Normalize each input to 0-100 scale
  const normRainfall = Math.min(100, (rainfall / 200) * 100);
  const normIntensity = Math.min(100, (rainfallIntensity / 50) * 100);
  const normSoil = Math.min(100, soilMoisture);
  const normSlope = Math.min(100, (slope / 60) * 100);
  
  // Elevation: 500-3000m. Inverse scale + sweet spot (800-1500 is moderate/high risk for river valleys)
  let normElevation = 0;
  if (elevation < 800) normElevation = 80;
  else if (elevation >= 800 && elevation <= 1500) normElevation = 90;
  else if (elevation > 1500 && elevation <= 2000) normElevation = 60;
  else normElevation = 30;

  // Stream level: 0-8m, exponential
  const normStream = Math.min(100, Math.pow(streamLevel / 8, 2) * 100);
  
  // Historical risk and drainage directly map
  const normHist = historicalRisk * 100;
  const normDrainage = drainageDensity * 100;

  // Apply weights
  let score = 
    (normRainfall * 0.25) +
    (normSoil * 0.20) +
    (normStream * 0.20) +
    (normSlope * 0.12) +
    (normIntensity * 0.10) +
    (normHist * 0.08) +
    (normDrainage * 0.05);

  // Apply non-linear amplification
  if (rainfall > 150 && soilMoisture > 80) {
    score *= 1.15;
  }
  
  score = Math.min(100, Math.max(0, score));

  return {
    score: Math.round(score),
    classification: classifyRisk(score),
    factors: { normRainfall, normIntensity, normSoil, normSlope, normElevation, normStream, normHist, normDrainage }
  };
}

export function classifyRisk(score) {
  if (score <= 30) return { level: 'LOW', color: 'emerald-500', label: 'Low Risk' };
  if (score <= 55) return { level: 'MODERATE', color: 'amber-500', label: 'Moderate Risk' };
  if (score <= 75) return { level: 'HIGH', color: 'orange-500', label: 'High Risk' };
  return { level: 'CRITICAL', color: 'red-500', label: 'Critical Risk' };
}

export function calculateVillageRisk(village, envConditions) {
  const result = calculateFloodRisk({
    ...envConditions,
    slope: village.slope,
    elevation: village.elevation,
    historicalRisk: village.historicalRisk,
    drainageDensity: village.drainageDensity
  });

  return {
    ...village,
    riskScore: result.score,
    riskLevel: result.classification.level,
    riskColor: result.classification.color,
    riskLabel: result.classification.label,
    factors: result.factors,
    explanation: generateExplanation(village, result, envConditions)
  };
}

export function generateExplanation(village, riskResult, envConditions) {
  const bullets = [];
  
  if (envConditions.rainfall > 100) {
    bullets.push(`Heavy rainfall of ${Math.round(envConditions.rainfall)}mm detected in the region.`);
  }
  if (envConditions.soilMoisture > 75) {
    bullets.push(`Soil saturation is extremely high (${Math.round(envConditions.soilMoisture)}%), increasing runoff probability.`);
  }
  if (envConditions.streamLevel > 4) {
    bullets.push(`Nearby stream (${village.nearestStream}) is flowing dangerously high at ${envConditions.streamLevel.toFixed(1)}m.`);
  }
  if (village.slope > 30) {
    bullets.push(`Steep slope of ${village.slope}° increases landslide and flash flood velocity risks.`);
  }
  if (village.historicalRisk > 0.6) {
    bullets.push(`Area has a high historical vulnerability to flood events.`);
  }

  let summary = `The risk in ${village.name} is currently ${riskResult.classification.label}. `;
  if (riskResult.score > 75) {
    summary += 'Immediate evacuation protocols should be evaluated due to compounding critical factors.';
  } else if (riskResult.score > 55) {
    summary += 'Residents should be on high alert as conditions continue to deteriorate.';
  } else {
    summary += 'Conditions are currently stable, but continuous monitoring is advised.';
  }

  return { bullets, summary };
}
