// components/DateRange.js
import { useState } from 'react'
import styles from '../../app/organization/Statistics/StatisticsSection.module.css'

const CustomDateRange = ({ onApply }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  const handleApply = () => {
    if (startDate && endDate) {
      onApply({ startDate, endDate })
    }
  }
  
  return (
    <div className={styles.dateRangeSelector}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={styles.dateInput}
      />
      <span className={styles.dateRangeSeparator}>to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={styles.dateInput}
      />
      <button 
        onClick={handleApply}
        className={styles.applyButton}
        disabled={!startDate || !endDate}
      >
        Apply
      </button>
    </div>
  )
}

export default CustomDateRange