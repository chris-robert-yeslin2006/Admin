"use client"

import { useState, useEffect } from "react"

function BarChart() {
  const [xAxis, setXAxis] = useState("Category")
  const [yAxis, setYAxis] = useState("Score")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // Colors for the bars
  const colors = ["#f05654", "#f0c354", "#20c997", "#6c5ce7", "#f7a440", "#ff7675", "#74b9ff"]

  // Simulate fetching data from an API
  useEffect(() => {
    // This would be your actual API call
    const fetchData = async () => {
      try {
        // Simulating API response
        const apiData = [
          { category: "Vocabulary", score: 75 },
          { category: "Sentence Mastery", score: 60 },
          { category: "Fluency", score: 85 },
          { category: "Pronunciation", score: 70 },
          { category: "Grammar", score: 65 },
        ]

        setData(apiData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Generate Y-axis labels from 0 to 90 in increments of 10
  const yAxisLabels = Array.from({ length: 10 }, (_, i) => 90 - i * 10)

  if (loading) {
    return <div className="loading">Loading data...</div>
  }

  return (
    <div className="chart-container">
      <div className="header">
        <h2 className="title">Activity by Category</h2>
        <div className="selectors">
          <div className="selector">
            <span>X:</span>
            <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="select">
              <option value="Category">Category</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
          </div>
          <div className="selector">
            <span>Y:</span>
            <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="select">
              <option value="Score">Score</option>
              <option value="Percentile">Percentile</option>
              <option value="Progress">Progress</option>
            </select>
          </div>
        </div>
      </div>

      <div className="chart-content">
        <div className="chart-area">
          {/* Y-axis labels */}
          <div className="y-axis">
            {yAxisLabels.map((value) => (
              <div key={value} className="y-label">
                {value}
              </div>
            ))}
          </div>

          {/* Chart grid and bars */}
          <div className="chart-grid">
            {/* Horizontal grid lines */}
            {yAxisLabels.map((value) => (
              <div key={value} className="grid-line" style={{ bottom: `${(value / 90) * 100}%` }} />
            ))}

            {/* Bars */}
            <div className="bars-container">
              {data.map((item, index) => (
                <div key={item.category} className="bar-column">
                  <div
                    className="bar"
                    style={{
                      height: `${(item.score / 90) * 100}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                  >
                    <div className="bar-value">{item.score}</div>
                  </div>
                  <div className="x-label">{item.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X-axis title */}
        <div className="x-axis-title">{xAxis}</div>
      </div>
    </div>
  )
}

export default BarChart
