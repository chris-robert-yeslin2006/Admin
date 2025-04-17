// components/dashboard/DateRangeSelector.js
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'
import CustomDateRange from './DateRange'

const timeframeOptions = [
  { id: '7days', label: '7 Days' },
  { id: '15days', label: '15 Days' },
  { id: '1month', label: 'Month' },
  { id: 'quarter', label: 'Quarter' },
  { id: 'halfyear', label: 'Half Year' },
  { id: 'year', label: 'Year' },
  { id: 'alltime', label: 'All Time' }
]

const DateRangeSelector = ({ customTimeframe, setCustomTimeframe }) => {
  return (
    <section className={styles.timeFilterSection}>
      <h2 className={styles.sectionTitle}>Date Range</h2>
      <div className={styles.timeFilterContainer}>
        <div className={styles.timeFilterButtons}>
          {timeframeOptions.map(option => (
            <button
              key={option.id}
              className={`${styles.timeFilterButton} ${
                customTimeframe === option.id ? styles.active : ''
              }`}
              onClick={() => setCustomTimeframe(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <CustomDateRange/>
      </div>
    </section>
  )
}

export default DateRangeSelector