// components/dashboard/Overview.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import StatCard from './StatCard'
import { DocumentIcon, UsersIcon } from '../ui/icons'

const Overview = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Overview</h2>
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Organizations"
          value="455"
          change="12%"
          positive={true}
          icon={<DocumentIcon />}
          type="primary"
        />
        
        <StatCard
          title="Total Students"
          value="12,650"
          change="8%"
          positive={true}
          icon={<UsersIcon />}
          type="secondary"
        />
      </div>
    </section>
  )
}

export default Overview