// components/dashboard/ComparisonChart.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import MetricSelectors from './MetricSelectors'
import CustomDateRange from './DateRange'
import ChartContainer from '../ui/ChartContainer'
import { getDateRangeText, tooltipStyle } from '../../utils/chartData'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

const ComparisonChart = ({
  selectedMetrics,
  toggleMetricSelection,
  customDateRange,
  comparisonTimeframe,
  handleCustomDateRange,
  data
}) => {
  const subtitle = `Compare metrics over time${
    customDateRange && comparisonTimeframe === 'custom'
      ? ` (${getDateRangeText(customDateRange)})`
      : ''
  }`;

  const controls = (
    <div className={styles.comparisonControls}>
      <MetricSelectors
        selectedMetrics={selectedMetrics}
        toggleMetricSelection={toggleMetricSelection}
      />
      <div className={styles.timeframeControls}>
        <CustomDateRange onApply={handleCustomDateRange} />
      </div>
    </div>
  );

  return (
    <ChartContainer
      title="Parameter Comparison"
      subtitle={subtitle}
      rightContent={controls}
    >
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {selectedMetrics.includes('onboarded') && (
            <Line
              type="monotone"
              dataKey="onboarded"
              name="Onboarded"
              stroke="#0D9488"
              strokeWidth={2}
            />
          )}
          {selectedMetrics.includes('contacted') && (
            <Line
              type="monotone"
              dataKey="contacted"
              name="Contacted"
              stroke="#1EAEDB"
              strokeWidth={2}
            />
          )}
          {selectedMetrics.includes('standby') && (
            <Line
              type="monotone"
              dataKey="standby"
              name="In Standby"
              stroke="#EA580C"
              strokeWidth={2}
            />
          )}
          {selectedMetrics.includes('verification') && (
            <Line
              type="monotone"
              dataKey="verification"
              name="In Verification"
              stroke="#D97706"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default ComparisonChart