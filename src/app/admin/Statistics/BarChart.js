'use client'

import { useEffect, useRef } from 'react'

export default function BarChart ({
  data = [],
  width = 500,
  height = 350,
  xLabel = 'X Axis',
  yLabel = 'Y Axis'
}) {
  // Increased left padding to accommodate Y-axis label
  const padding = { top: 40, right: 20, bottom: 40, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Find the maximum value for Y-axis scaling
  const maxValue = data.length ? Math.max(...data.map(item => item.value)) : 0
  const yScale = maxValue ? chartHeight / maxValue : 0
  const barWidth = data.length ? (chartWidth / data.length) * 0.7 : 0

  // Create Y-axis ticks
  const yTicks = Array.from({ length: 6 }, (_, i) => (maxValue * i) / 5)

  return (
    <div className='bar-chart-container relative'>
      <svg width={width} height={height}>
        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke='#ccc'
          strokeWidth='1'
        />

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke='#ccc'
          strokeWidth='1'
        />

        {/* Y-axis ticks and labels */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={padding.left - 5}
              y1={height - padding.bottom - tick * yScale}
              x2={padding.left}
              y2={height - padding.bottom - tick * yScale}
              stroke='#ccc'
              strokeWidth='1'
            />
            <text
              x={padding.left - 10}
              y={height - padding.bottom - tick * yScale}
              textAnchor='end'
              dominantBaseline='middle'
              fontSize='12'
              fill='#64748b'
            >
              {tick.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((item, i) => {
          const barHeight = item.value * yScale
          const x =
            padding.left +
            (chartWidth / data.length) * i +
            (chartWidth / data.length - barWidth) / 2
          const y = height - padding.bottom - barHeight

          // Define colors for the bars
          const colors = ['#ef4444', '#eab308', '#10b981', '#6366f1', '#f59e0b']

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors[i % colors.length]}
                rx='2'
              />

              {/* Bar value */}
              <text
                x={x + barWidth / 2}
                y={y - 10}
                textAnchor='middle'
                fontSize='12'
                fontWeight='500'
              >
                {item.value.toFixed(1)}
              </text>

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 20}
                textAnchor='middle'
                fontSize='12'
                fill='#64748b'
              >
                {item.day}
              </text>
            </g>
          )
        })}

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 5}
          textAnchor='middle'
          fontSize='14'
          fontWeight='500'
        >
          {xLabel}
        </text>
        
        {/* Adjusted Y-axis label positioning */}
        <text 
          transform={`rotate(-90)`}
          x={-height / 2} 
          y={15}  
          textAnchor="middle" 
          fontSize="14"
          fontWeight="500"
        >
          {yLabel}
        </text>

      </svg>
    </div>
  )
}