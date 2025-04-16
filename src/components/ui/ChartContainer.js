// components/ui/ChartContainer.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import Card from './Card'

const ChartContainer = ({ title, subtitle, children, rightContent }) => {
  return (
    <Card className={styles.chartGridItem}>
      <div className={styles.chartHeader}>
        <div>
          <h2 className={styles.chartTitle}>{title}</h2>
          <p className={styles.chartSubtitle}>
            {subtitle}
          </p>
        </div>
        {rightContent && (
          <div className={styles.chartHeaderControls}>
            {rightContent}
          </div>
        )}
      </div>
      <div className={styles.chartContainer}>
        {children}
      </div>
    </Card>
  )
}

export default ChartContainer