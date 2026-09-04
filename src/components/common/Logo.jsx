import React from 'react';

/**
 * FlashGuard Official Branding Logo
 * Matches the exact design:
 * "FLASH" in Deep Navy (#12355B)
 * "GUARD" in Primary Blue (#1976D2)
 * Subtitle: "Flash Flood Prediction System" in Slate Grey (#788597)
 */
export const FlashGuardLogo = ({ variant = 'light', size = 'default', className = '' }) => {
  const isDark = variant === 'dark';

  const flashColor = isDark ? '#FFFFFF' : '#12355B';
  const guardColor = isDark ? '#60A5FA' : '#1976D2';
  const subColor = isDark ? 'rgba(219, 234, 254, 0.7)' : '#788597';

  const textSizes = {
    small: { title: 'text-lg', sub: 'text-[9.5px]' },
    default: { title: 'text-2xl', sub: 'text-[11px]' },
    large: { title: 'text-3xl', sub: 'text-[13px]' }
  };

  const selectedSize = textSizes[size] || textSizes.default;

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center tracking-tight leading-none">
        <span 
          className={`${selectedSize.title} font-extrabold tracking-[-0.03em]`}
          style={{ 
            color: flashColor, 
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800
          }}
        >
          FLASH
        </span>
        <span 
          className={`${selectedSize.title} font-extrabold tracking-[-0.03em]`}
          style={{ 
            color: guardColor, 
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800
          }}
        >
          GUARD
        </span>
      </div>
      <span 
        className={`${selectedSize.sub} font-medium tracking-[0.01em] mt-1 whitespace-nowrap`}
        style={{ 
          color: subColor,
          fontFamily: "'Inter', sans-serif"
        }}
      >
        Flash Flood Prediction System
      </span>
    </div>
  );
};

/**
 * Clean SVG version for crisp vector rendering in any resolution
 */
export const FlashGuardLogoSVG = ({ variant = 'light', width = 210, height = 50, className = '' }) => {
  const isDark = variant === 'dark';
  const flashColor = isDark ? '#FFFFFF' : '#12355B';
  const guardColor = isDark ? '#60A5FA' : '#1976D2';
  const subColor = isDark ? '#93C5FD' : '#788597';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 240 56" 
      width={width} 
      height={height}
      className={className}
    >
      <text 
        x="0" 
        y="32" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="34" 
        fontWeight="800" 
        letterSpacing="-0.03em"
        fill={flashColor}
      >
        FLASH
      </text>
      <text 
        x="102" 
        y="32" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="34" 
        fontWeight="800" 
        letterSpacing="-0.03em"
        fill={guardColor}
      >
        GUARD
      </text>
      <text 
        x="1" 
        y="50" 
        fontFamily="'Inter', sans-serif" 
        fontSize="13" 
        fontWeight="500" 
        letterSpacing="0.01em"
        fill={subColor}
      >
        Flash Flood Prediction System
      </text>
    </svg>
  );
};

export default FlashGuardLogo;
