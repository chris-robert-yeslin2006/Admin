// utils/chartData.js

// Sample data for different timeframes
const weeklyData = [
    { name: 'Mon', onboarded: 15, contacted: 30, standby: 8, verification: 5 },
    { name: 'Tue', onboarded: 18, contacted: 25, standby: 10, verification: 7 },
    { name: 'Wed', onboarded: 25, contacted: 35, standby: 12, verification: 9 },
    { name: 'Thu', onboarded: 20, contacted: 28, standby: 7, verification: 6 },
    { name: 'Fri', onboarded: 22, contacted: 32, standby: 9, verification: 8 },
    { name: 'Sat', onboarded: 10, contacted: 15, standby: 6, verification: 3 },
    { name: 'Sun', onboarded: 8, contacted: 10, standby: 4, verification: 2 }
  ]
  
  const fifteenDaysData = [
    ...weeklyData,
    {
      name: 'Mon 2',
      onboarded: 16,
      contacted: 31,
      standby: 9,
      verification: 6
    },
    {
      name: 'Tue 2',
      onboarded: 19,
      contacted: 26,
      standby: 11,
      verification: 8
    },
    {
      name: 'Wed 2',
      onboarded: 26,
      contacted: 36,
      standby: 13,
      verification: 10
    },
    {
      name: 'Thu 2',
      onboarded: 21,
      contacted: 29,
      standby: 8,
      verification: 7
    },
    {
      name: 'Fri 2',
      onboarded: 23,
      contacted: 33,
      standby: 10,
      verification: 9
    },
    {
      name: 'Sat 2',
      onboarded: 11,
      contacted: 16,
      standby: 7,
      verification: 4
    },
    { name: 'Sun 2', onboarded: 9, contacted: 11, standby: 5, verification: 3 }
  ]
  
  const monthlyData = [
    {
      name: 'Week 1',
      onboarded: 75,
      contacted: 120,
      standby: 35,
      verification: 22
    },
    {
      name: 'Week 2',
      onboarded: 85,
      contacted: 130,
      standby: 38,
      verification: 25
    },
    {
      name: 'Week 3',
      onboarded: 95,
      contacted: 145,
      standby: 42,
      verification: 28
    },
    {
      name: 'Week 4',
      onboarded: 80,
      contacted: 125,
      standby: 40,
      verification: 24
    }
  ]
  
  const quarterlyData = [
    {
      name: 'Jan',
      onboarded: 300,
      contacted: 600,
      standby: 150,
      verification: 90
    },
    {
      name: 'Feb',
      onboarded: 320,
      contacted: 620,
      standby: 160,
      verification: 95
    },
    {
      name: 'Mar',
      onboarded: 350,
      contacted: 650,
      standby: 170,
      verification: 100
    }
  ]
  
  const halfYearlyData = [
    {
      name: 'Jan',
      onboarded: 300,
      contacted: 600,
      standby: 150,
      verification: 90
    },
    {
      name: 'Feb',
      onboarded: 320,
      contacted: 620,
      standby: 160,
      verification: 95
    },
    {
      name: 'Mar',
      onboarded: 350,
      contacted: 650,
      standby: 170,
      verification: 100
    },
    {
      name: 'Apr',
      onboarded: 380,
      contacted: 680,
      standby: 180,
      verification: 110
    },
    {
      name: 'May',
      onboarded: 400,
      contacted: 700,
      standby: 190,
      verification: 120
    },
    {
      name: 'Jun',
      onboarded: 420,
      contacted: 720,
      standby: 200,
      verification: 130
    }
  ]
  
  const yearlyData = [
    {
      name: 'Jan',
      onboarded: 300,
      contacted: 600,
      standby: 150,
      verification: 90
    },
    {
      name: 'Feb',
      onboarded: 320,
      contacted: 620,
      standby: 160,
      verification: 95
    },
    {
      name: 'Mar',
      onboarded: 350,
      contacted: 650,
      standby: 170,
      verification: 100
    },
    {
      name: 'Apr',
      onboarded: 380,
      contacted: 680,
      standby: 180,
      verification: 110
    },
    {
      name: 'May',
      onboarded: 400,
      contacted: 700,
      standby: 190,
      verification: 120
    },
    {
      name: 'Jun',
      onboarded: 420,
      contacted: 720,
      standby: 200,
      verification: 130
    },
    {
      name: 'Jul',
      onboarded: 410,
      contacted: 710,
      standby: 195,
      verification: 125
    },
    {
      name: 'Aug',
      onboarded: 430,
      contacted: 730,
      standby: 205,
      verification: 135
    },
    {
      name: 'Sep',
      onboarded: 440,
      contacted: 740,
      standby: 210,
      verification: 140
    },
    {
      name: 'Oct',
      onboarded: 450,
      contacted: 750,
      standby: 215,
      verification: 145
    },
    {
      name: 'Nov',
      onboarded: 460,
      contacted: 760,
      standby: 220,
      verification: 150
    },
    {
      name: 'Dec',
      onboarded: 470,
      contacted: 770,
      standby: 225,
      verification: 155
    }
  ]
  
  const allTimeData = yearlyData
  
  // Display chart data based on the selected timeframe
  export const getChartData = (timeframe) => {
    switch (timeframe) {
      case '7days':
        return weeklyData
      case '15days':
        return fifteenDaysData
      case '1month':
        return monthlyData
      case 'quarter':
        return quarterlyData
      case 'halfyear':
        return halfYearlyData
      case 'year':
        return yearlyData
      case 'alltime':
      default:
        return allTimeData
    }
  }
  
  // Date formatting utilities
  export const formatDateString = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  export const getDateRangeText = (customDateRange) => {
    if (!customDateRange) return ''
    return `${formatDateString(customDateRange.startDate)} - ${formatDateString(
      customDateRange.endDate
    )}`
  }
  
  // Common chart styles
  export const tooltipStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }
  
  export const commonChartMargin = { top: 20, right: 30, left: 20, bottom: 30 }