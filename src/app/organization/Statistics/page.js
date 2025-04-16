'use client'
import { useState, useEffect } from 'react'
import styles from './StatisticsSection.module.css'
import Overview from '../../../components/dashboard/Overview'
import MetricsSection from '../../../components/dashboard/MetricsSection'
import DateRangeSelector from '../../../components/dashboard/DateRangeSelector'
import OrganizationsChart from '../../../components/dashboard/OrganizationsChart'
import ComparisonChart from '../../../components/dashboard/ComparisonChart'
import { getChartData } from '../../../utils/chartData'

export default function Dashboard() {
  const [timeframeView, setTimeframeView] = useState('Week')
  const [chartType, setChartType] = useState('bar')
  const [customTimeframe, setCustomTimeframe] = useState('7days')
  const [selectedMetrics, setSelectedMetrics] = useState([
    'onboarded',
    'contacted'
  ])
  const [comparisonTimeframe, setComparisonTimeframe] = useState(customTimeframe)
  const [customDateRange, setCustomDateRange] = useState(null)

  useEffect(() => {
    setComparisonTimeframe(customTimeframe)
  }, [customTimeframe])

  const toggleMetricSelection = metric => {
    if (selectedMetrics.includes(metric)) {
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter(m => m !== metric))
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  const handleCustomDateRange = ({ startDate, endDate }) => {
    setCustomDateRange({ startDate, endDate })
    setComparisonTimeframe('custom')
  }

  const chartData = getChartData(customTimeframe)
  const comparisonData = comparisonTimeframe === 'custom' && customDateRange 
    ? getChartData('7days') // Replace with actual custom date range data
    : getChartData(comparisonTimeframe)

  return (
    <div className={styles.container} style={{ overflowX: 'hidden' }}>
      <main className={styles.dashboardContent}>
        {/* Overview Section */}
        <Overview />

        {/* Time-frame Sensitive Metrics */}
        <MetricsSection />

        {/* Global Time Filter */}
        <DateRangeSelector 
          customTimeframe={customTimeframe}
          setCustomTimeframe={setCustomTimeframe}
        />

        {/* Chart Grid Layout */}
        <section className={styles.chartsGridContainer}>
          <OrganizationsChart 
            chartType={chartType}
            setChartType={setChartType}
            data={chartData}
          />

          <ComparisonChart 
            selectedMetrics={selectedMetrics}
            toggleMetricSelection={toggleMetricSelection}
            customDateRange={customDateRange}
            comparisonTimeframe={comparisonTimeframe}
            handleCustomDateRange={handleCustomDateRange}
            data={comparisonData}
          />
        </section>
      </main>
    </div>
  )
}