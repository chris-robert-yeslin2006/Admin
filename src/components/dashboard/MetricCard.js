// components/dashboard/MetricCard.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import { ArrowUpIcon } from '../ui/icons'

const MetricCard = ({ title, value, change, positive, icon, type }) => {
  return (
    <div
      className={`${styles.metricCard} ${styles.glassCard} ${styles[type]}`}
    >
      <div className={styles.metricContent}>
        <h3>{title}</h3>
        <div className={styles.statValuecont}>
          <div className={styles.metricValue}>{value}</div>
          <div className={`${styles.metricChange} ${positive ? styles.positive : styles.negative}`}>
            <ArrowUpIcon />
            {change} vs previous period
          </div>
        </div>
      </div>
      <div className={styles.metricIcon}>
        {icon}
      </div>
    </div>
  )
}

export default MetricCard