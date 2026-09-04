import React from 'react';
import { motion } from 'framer-motion';

const RiskGauge = ({ score = 0, size = 160 }) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Determine color and label based on score
  let color = '#25844B'; // green
  let label = 'LOW';
  
  if (normalizedScore > 75) {
    color = '#D33D3D'; // red
    label = 'CRITICAL';
  } else if (normalizedScore > 55) {
    color = '#E67E22'; // orange
    label = 'HIGH';
  } else if (normalizedScore > 30) {
    color = '#D4A017'; // amber
    label = 'MODERATE';
  }

  // SVG parameters
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // 270 degrees is 75% of the circle
  const arcLength = circumference * 0.75;
  const dashOffset = arcLength - (arcLength * normalizedScore) / 100;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform rotate-[135deg]">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        
        {/* Animated Value Track */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: dashOffset, stroke: color }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <motion.span 
          className="text-4xl font-bold tracking-tighter"
          style={{ color: '#172033' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Math.round(normalizedScore)}
        </motion.span>
        <motion.span 
          className="text-xs font-black tracking-widest mt-1"
          style={{ color: '#172033' }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
};

export default RiskGauge;
