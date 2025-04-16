// components/dashboard/StatCard.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import { ArrowUpIcon } from '../ui/icons'

const StatCard = ({ title, value, change, positive, icon, type }) => {
  return (
    <div
      className={`${styles.statCard} ${styles.glassCard} ${
        type === 'primary' ? styles.primaryCard : styles.secondaryCard
      }`}
    >
      <div className={styles.statContent}>
        <h3>{title}</h3>
        <div className={styles.statValuecont}>
          <div className={styles.statValue}>{value}</div>
          <div className={`${styles.statChange} ${positive ? styles.positive : styles.negative}`}>
            <ArrowUpIcon />
            {change} vs previous period
          </div>
        </div>
      </div>
      <div className={styles.statIcon}>
        {icon}
      </div>
    </div>
  )
}

export default StatCard