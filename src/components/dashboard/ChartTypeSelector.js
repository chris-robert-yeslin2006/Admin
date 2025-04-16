// components/dashboard/ChartTypeSelector.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'

const ChartTypeSelector = ({ chartType, setChartType }) => {
  const chartTypes = ['bar', 'line', 'area']
  
  return (
    <div className={styles.chartTypeSelector}>
      {chartTypes.map(type => (
        <button
          key={type}
          className={`${styles.timeframeButton} ${
            chartType === type ? styles.active : ''
          }`}
          onClick={() => setChartType(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default ChartTypeSelector