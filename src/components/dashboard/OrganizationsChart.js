// components/dashboard/OrganizationsChart.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import ChartTypeSelector from './ChartTypeSelector'
import ChartContainer from '../ui/ChartContainer'
import { ResponsiveContainer } from 'recharts'
import { renderChart } from './ChartRender'

const OrganizationsChart = ({ chartType, setChartType, data }) => {
  return (
    <ChartContainer
      title="Organizations Activity"
      subtitle="Visualizing organization status"
      rightContent={
        <ChartTypeSelector 
          chartType={chartType}
          setChartType={setChartType}
        />
      }
    >
      <ResponsiveContainer width="100%" height={350}>
        {renderChart(chartType, data)}
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default OrganizationsChart