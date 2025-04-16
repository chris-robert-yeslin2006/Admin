// components/dashboard/ChartRenderer.js
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    ComposedChart,
    Area
  } from 'recharts'
  import { tooltipStyle, commonChartMargin } from '../../utils/chartData'
  
  export const renderChart = (chartType, data) => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data} margin={commonChartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey="onboarded"
              name="Onboarded"
              fill="#0D9488"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="contacted"
              name="Contacted"
              fill="#1EAEDB"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="standby"
              name="In Standby"
              fill="#EA580C"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="verification"
              name="In Verification"
              fill="#D97706"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )
      
      case 'line':
        return (
          <LineChart data={data} margin={commonChartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="onboarded"
              name="Onboarded"
              stroke="#0D9488"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="contacted"
              name="Contacted"
              stroke="#1EAEDB"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="standby"
              name="In Standby"
              stroke="#EA580C"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="verification"
              name="In Verification"
              stroke="#D97706"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )
      
      case 'area':
        return (
          <ComposedChart data={data} margin={commonChartMargin}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area
              type="monotone"
              dataKey="onboarded"
              name="Onboarded"
              fill="#0D9488"
              stroke="#0D9488"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="contacted"
              name="Contacted"
              fill="#1EAEDB"
              stroke="#1EAEDB"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="standby"
              name="In Standby"
              fill="#EA580C"
              stroke="#EA580C"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="verification"
              name="In Verification"
              fill="#D97706"
              stroke="#D97706"
              fillOpacity={0.3}
            />
          </ComposedChart>
        )
      
      default:
        return null
    }
  }