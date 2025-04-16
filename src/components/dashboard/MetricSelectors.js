// components/dashboard/MetricSelectors.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'

const MetricSelectors = ({ selectedMetrics, toggleMetricSelection }) => {
  const metrics = ['onboarded', 'contacted', 'standby', 'verification']
  
  return (
    <div className={styles.metricSelectors}>
      {metrics.map(metric => (
        <button
          key={metric}
          className={`${styles.metricButton} ${
            selectedMetrics.includes(metric) ? styles.active : ''
          }`}
          onClick={() => toggleMetricSelection(metric)}
        >
          {metric.charAt(0).toUpperCase() + metric.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default MetricSelectors