export function generateWarnings(villages, riskResults, envConditions) {
  const warnings = [];
  const now = new Date().toISOString();

  villages.forEach(village => {
    const result = riskResults.find(r => r.id === village.id);
    if (!result) return;
    
    if (result.riskScore > 55) {
      let severity = 'ADVISORY';
      let type = 'Flood Advisory';
      
      if (result.riskScore >= 76) {
        severity = result.riskScore >= 86 ? 'EMERGENCY' : 'WARNING';
        type = result.riskScore >= 86 ? 'Flash Flood Emergency' : 'Flood Warning';
      }

      warnings.push({
        id: `warn-${village.id}-${Date.now()}`,
        type,
        severity,
        location: village.name,
        riskScore: result.riskScore,
        reason: result.explanation.summary,
        actions: getRecommendedActions(severity, village),
        timestamp: now,
        villages: [village.id]
      });
    }
  });

  // Sort by highest risk first
  return warnings.sort((a, b) => b.riskScore - a.riskScore);
}

export function getRecommendedActions(severity, village) {
  if (severity === 'EMERGENCY') {
    return [
      `Initiate immediate evacuation of ${village.name} lower areas.`,
      `Deploy SDRF response teams to ${village.nearestStream} banks.`,
      'Sound emergency sirens in the valley.',
      `Move population to designated shelter (Capacity: ${village.shelterCapacity}).`,
      'Close all connecting roads and bridges.'
    ];
  } else if (severity === 'WARNING') {
    return [
      `Prepare ${village.name} for possible evacuation.`,
      'Alert local disaster management authorities.',
      `Monitor ${village.nearestStream} levels every 15 minutes.`,
      'Advise residents to move valuables to higher ground.',
      'Check emergency communication channels.'
    ];
  } else {
    return [
      `Issue advisory broadcast for ${village.name}.`,
      'Restrict access to riverbanks and streams.',
      'Keep emergency kits ready.',
      'Monitor weather updates continuously.',
      'Review evacuation routes.'
    ];
  }
}
