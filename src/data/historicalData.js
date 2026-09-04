export function generateRainfallTrend(currentRainfall) {
  const points = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 30 * 60000);
    const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
    
    // Smooth ramp up
    const progress = (11 - i) / 11; // 0 to 1
    // Exponential-like curve
    const multiplier = Math.pow(progress, 3);
    const baseRain = 10;
    
    let val;
    if (currentRainfall > 80) { // Simulating high rainfall
      val = baseRain + (currentRainfall - baseRain) * multiplier + (Math.random() * 5 - 2.5);
    } else {
      val = currentRainfall * 0.8 + (Math.random() * 5); // Stable
    }
    
    points.push({ time: timeStr, value: Math.max(0, val) });
  }
  return points;
}

export function generateRiskTrend(currentRisk) {
  const points = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 30 * 60000);
    const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
    
    const progress = (11 - i) / 11;
    const multiplier = Math.pow(progress, 2.5);
    const baseRisk = Math.min(20, currentRisk);
    
    let val;
    if (currentRisk > 50) {
      val = baseRisk + (currentRisk - baseRisk) * multiplier;
    } else {
      val = currentRisk - (Math.random() * 5);
    }
    
    points.push({ time: timeStr, value: Math.max(0, Math.min(100, val)) });
  }
  return points;
}

export function generateStreamTrend(currentLevel) {
  const points = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 30 * 60000);
    const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
    
    const progress = (11 - i) / 11;
    const multiplier = Math.pow(progress, 4);
    const baseLevel = Math.max(1, currentLevel * 0.4);
    
    let val;
    if (currentLevel > 3.5) {
      val = baseLevel + (currentLevel - baseLevel) * multiplier;
    } else {
      val = currentLevel * 0.9 + (Math.random() * 0.2);
    }
    
    points.push({ time: timeStr, value: Math.max(0, val) });
  }
  return points;
}

export function generatePopulationImpact(atRiskVillagesCount) {
  const points = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 30 * 60000);
    const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
    
    const progress = (11 - i) / 11;
    const multiplier = Math.pow(progress, 5); // very steep at the end
    
    const val = Math.floor(atRiskVillagesCount * multiplier);
    points.push({ time: timeStr, value: val });
  }
  return points;
}
