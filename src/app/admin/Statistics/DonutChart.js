'use client'
import { useState } from 'react';

export default function DonutChart({ 
  data, 
  width = 200, 
  height = 200, 
  centerLabel = '', 
  centerValue = '',
  showTooltip = false
}) {
  const [activeSegment, setActiveSegment] = useState(null);
  
  const radius = Math.min(width, height) / 2 * 0.8;
  const innerRadius = radius * 0.6;
  const center = { x: width / 2, y: height / 2 };
  
  // Calculate the total value
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate each segment
  let startAngle = 0;
  const segments = data.map(item => {
    const angle = (item.value / totalValue) * 360;
    const segment = {
      ...item,
      startAngle,
      endAngle: startAngle + angle,
      isActive: false
    };
    startAngle += angle;
    return segment;
  });
  
  // Convert angle to coordinates for SVG path
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  // Create SVG path for each segment
  const createPath = (segment, isInner = false) => {
    const r = isInner ? innerRadius : radius;
    const start = polarToCartesian(center.x, center.y, r, segment.endAngle);
    const end = polarToCartesian(center.x, center.y, r, segment.startAngle);
    const largeArcFlag = segment.endAngle - segment.startAngle <= 180 ? 0 : 1;
    
    return `
      M ${center.x} ${center.y}
      L ${start.x} ${start.y}
      A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  };
  
  const handleMouseEnter = (segment) => {
    setActiveSegment(segment);
  };
  
  const handleMouseLeave = () => {
    setActiveSegment(null);
  };
  
  return (
    <div className="donut-chart-container">
      <svg width={width} height={height}>
        {segments.map((segment, index) => (
          <g key={index} 
            onMouseEnter={() => handleMouseEnter(segment)}
            onMouseLeave={handleMouseLeave}
          >
            <path
              d={createPath(segment)}
              fill={segment.color}
              opacity={activeSegment && activeSegment.name !== segment.name ? 0.7 : 1}
              transform={
                activeSegment && activeSegment.name === segment.name 
                  ? `translate(${(segment.startAngle + segment.endAngle) / 2 > 180 ? -5 : 5}, ${(segment.startAngle + segment.endAngle) / 2 > 90 && (segment.startAngle + segment.endAngle) / 2 < 270 ? 5 : -5})`
                  : ''
              }
            />
          </g>
        ))}
        
        <circle 
          cx={center.x} 
          cy={center.y} 
          r={innerRadius} 
          fill="#ffffff" 
        />
        
        <text 
          x={center.x} 
          y={center.y - 10} 
          textAnchor="middle" 
          fontSize="12"
          fill="#64748b"
        >
          {centerLabel}
        </text>
        
        <text 
          x={center.x} 
          y={center.y + 20} 
          textAnchor="middle" 
          fontSize="24"
          fontWeight="bold"
          fill="#000"
        >
          {centerValue || (activeSegment ? `${Math.round(activeSegment.value / totalValue * 100)}%` : totalValue)}
        </text>
      </svg>
      
      {showTooltip && activeSegment && (
        <div 
          className="tooltip" 
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <div>{activeSegment.name}: {activeSegment.value} students</div>
          <div>{activeSegment.value? `${Math.round(activeSegment.value / totalValue * 100)}%` : totalValue}</div>
        </div>
      )}
      
      <style jsx>{`
        .donut-chart-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}