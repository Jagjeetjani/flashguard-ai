import React from 'react';
import useFloodStore from '../../store/useFloodStore';
import { CloudRain, Droplets, Waves, Zap } from 'lucide-react';

const EnvironmentSliders = () => {
  const { environment, setEnvironment } = useFloodStore();

  const handleSliderChange = (param, value) => {
    setEnvironment({ ...environment, [param]: parseFloat(value) });
  };

  const simulateFlood = () => {
    setEnvironment({
      rainfall: 180,
      soilMoisture: 92,
      streamLevel: 5.8,
      rainfallIntensity: 38
    });
  };

  const resetToNormal = () => {
    setEnvironment({
      rainfall: 45,
      soilMoisture: 52,
      streamLevel: 2.1,
      rainfallIntensity: 8
    });
  };

  const getRainfallText = (val) => {
    if (val < 50) return 'Light';
    if (val < 100) return 'Moderate';
    if (val < 150) return 'Heavy';
    return 'Extreme';
  };

  const getSoilText = (val) => {
    if (val < 40) return 'Dry';
    if (val < 70) return 'Moist';
    if (val < 90) return 'Wet';
    return 'Saturated';
  };

  const getStreamText = (val) => {
    if (val < 3) return 'Low';
    if (val < 5) return 'Normal';
    if (val < 7) return 'High';
    return 'Flood Stage';
  };

  const getIntensityText = (val) => {
    if (val < 10) return 'Light';
    if (val < 25) return 'Moderate';
    if (val < 40) return 'Heavy';
    return 'Violent';
  };

  const getColorClass = (val, max, threshold1, threshold2) => {
    const ratio = val / max;
    if (val >= threshold2) return 'text-[#D33D3D]';
    if (val >= threshold1) return 'text-[#E67E22]';
    if (ratio > 0.4) return 'text-[#D4A017]';
    return 'text-[#25844B]';
  };

  return (
    <div className="space-y-6">
      {/* Rainfall Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 text-[#172033] font-medium">
            <CloudRain className="w-4 h-4 text-[#1976D2]" />
            <span>Rainfall (6h)</span>
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${getColorClass(environment.rainfall, 200, 100, 150)}`}>
              {getRainfallText(environment.rainfall)}
            </span>
            <span className="text-sm text-[#788597] font-mono w-16 text-right">{environment.rainfall} mm</span>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="200" 
          value={environment.rainfall} 
          onChange={(e) => handleSliderChange('rainfall', e.target.value)}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Soil Moisture Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 text-[#172033] font-medium">
            <Droplets className="w-4 h-4 text-[#25844B]" />
            <span>Soil Moisture</span>
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${getColorClass(environment.soilMoisture, 100, 70, 90)}`}>
              {getSoilText(environment.soilMoisture)}
            </span>
            <span className="text-sm text-[#788597] font-mono w-16 text-right">{environment.soilMoisture}%</span>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={environment.soilMoisture} 
          onChange={(e) => handleSliderChange('soilMoisture', e.target.value)}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Stream Level Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 text-[#172033] font-medium">
            <Waves className="w-4 h-4 text-[#0891B2]" />
            <span>Stream Level</span>
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${getColorClass(environment.streamLevel, 8, 5, 7)}`}>
              {getStreamText(environment.streamLevel)}
            </span>
            <span className="text-sm text-[#788597] font-mono w-16 text-right">{environment.streamLevel} m</span>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="8" 
          step="0.1"
          value={environment.streamLevel} 
          onChange={(e) => handleSliderChange('streamLevel', e.target.value)}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Rainfall Intensity Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 text-[#172033] font-medium">
            <Zap className="w-4 h-4 text-[#D4A017]" />
            <span>Rainfall Intensity</span>
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${getColorClass(environment.rainfallIntensity, 50, 25, 40)}`}>
              {getIntensityText(environment.rainfallIntensity)}
            </span>
            <span className="text-sm text-[#788597] font-mono w-16 text-right">{environment.rainfallIntensity} mm/h</span>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="50" 
          value={environment.rainfallIntensity} 
          onChange={(e) => handleSliderChange('rainfallIntensity', e.target.value)}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      <div className="pt-4 space-y-3">
        <button 
          onClick={simulateFlood}
          className="w-full bg-[#D33D3D] hover:bg-[#C0392B] transition-colors text-white py-3 rounded-lg font-semibold shadow-lg"
        >
          Simulate Flood Conditions
        </button>
        <button 
          onClick={resetToNormal}
          className="w-full bg-[#EAF3FC] hover:bg-[#E2E8F0] transition-colors text-[#2D3748] border border-[#E2E8F0] py-3 rounded-lg font-semibold"
        >
          Reset to Normal
        </button>
      </div>
    </div>
  );
};

export default EnvironmentSliders;
