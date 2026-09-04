import React from 'react';

const factorLabels = {
  normRainfall: 'Rainfall',
  normIntensity: 'Rainfall Intensity',
  normSoil: 'Soil Moisture',
  normSlope: 'Terrain Slope',
  normElevation: 'Elevation Risk',
  normStream: 'Stream Level',
  normHist: 'Historical Risk',
  normDrainage: 'Drainage Density'
};

const factorWeights = {
  normRainfall: 0.25,
  normIntensity: 0.10,
  normSoil: 0.20,
  normSlope: 0.12,
  normElevation: 0,
  normStream: 0.20,
  normHist: 0.08,
  normDrainage: 0.05
};

const FactorBreakdown = ({ factors }) => {
  if (!factors) return null;

  const factorArray = Object.entries(factors)
    .filter(([key]) => factorLabels[key])
    .map(([key, value]) => ({
      name: factorLabels[key],
      value: Math.round(value),
      weight: factorWeights[key] || 0,
      contribution: Math.round(value * (factorWeights[key] || 0.1))
    }))
    .sort((a, b) => b.contribution - a.contribution);

  const getBarColor = (score) => {
    if (score > 80) return 'bg-red-500';
    if (score > 60) return 'bg-orange-500';
    if (score > 40) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-3">
      {factorArray.map((factor, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-[#4A5568] font-medium">{factor.name}</span>
            <span className="text-[#788597] font-mono">{factor.value}%</span>
          </div>
          <div className="h-2 w-full bg-[#EAF3FC] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${getBarColor(factor.value)}`}
              style={{ width: `${factor.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FactorBreakdown;
