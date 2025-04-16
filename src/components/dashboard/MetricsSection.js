// components/dashboard/MetricsSection.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import MetricCard from './MetricCard'
import { CalendarIcon, MailIcon, ClockIcon, CheckIcon } from '../ui/icons'

const MetricsSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Time-frame Sensitive Metrics</h2>
      <div className={styles.metricsGrid}>
        <MetricCard
          title="Organizations Onboarded"
          value="98"
          change="15%"
          positive={true}
          icon={<CalendarIcon />}
          type="teal"
        />
        
        <MetricCard
          title="Organizations Contacted"
          value="210"
          change="5%"
          positive={true}
          icon={<MailIcon />}
          type="blue"
        />
        
        <MetricCard
          title="Organizations in Standby"
          value="45"
          change="2%"
          positive={true}
          icon={<ClockIcon />}
          type="orange"
        />
        
        <MetricCard
          title="Organizations in Verification"
          value="32"
          change="10%"
          positive={true}
          icon={<CheckIcon />}
          type="gold"
        />
      </div>
    </section>
  )
}

export default MetricsSection