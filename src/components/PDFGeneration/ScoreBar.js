"use client"

import { useState, useEffect } from "react"

function ScoreBar({ Vocabulary, Sentence_mastery, Fluency, Pronouncation }) {
  const [data, setData] = useState([])
  const [average, setAverage] = useState(0)

  // Colors for the bars
  const colors = ["#f05654", "#f0c354", "#20c997", "#6c5ce7"]

  useEffect(() => {
    const apiData = [
      { category: "Vocabulary", score: Vocabulary },
      { category: "Sentence M.", score: Sentence_mastery },
      { category: "Fluency", score: Fluency },
      { category: "Pronun.", score: Pronouncation },
    ]
    setData(apiData)
    
    // Calculate average score
    const sum = apiData.reduce((total, item) => total + item.score, 0)
    const avg = sum / apiData.length
    setAverage(Math.round(avg * 10) / 10) // Round to 1 decimal place
  }, [Vocabulary, Sentence_mastery, Fluency, Pronouncation])

  // Generate Y-axis labels from 0 to 90 in increments of 30
  const yAxisLabels = [100, 75, 50, 25, 0]

  // Define a neater color for the average line
  const averageLineColor = "#2c3e50" // Darker blue, more professional

  return (
    <div className="chart-container" style={{ width: "100%", maxWidth: "100%" }}>
      <div className="chart-content" style={{ height: "180px", position: "relative" }}>
        <div className="chart-area" style={{ display: "flex", height: "150px" }}>
          {/* Y-axis labels */}
          <div
            className="y-axis"
            style={{ 
              display: "flex",
              flexDirection: "column",
              paddingRight: '5px',
              height: '170%',
              justifyContent: 'space-evenly',
              top: '-60px',
              position: 'relative',
            }}
          >
            {yAxisLabels.map((value) => (
              <div 
                key={value} 
                className="y-label" 
                style={{ 
                  fontSize: "10px", 
                  color: "#718096",
                  height: "0",
                  display: "flex",
                  alignItems: "center",
                  transform: "translateY(-50%)"
                }}
              >
                {value}
              </div>
            ))}
          </div>

          {/* Chart grid and bars */}
          <div className="chart-grid" style={{ flex: "1", position: "relative", height: "100%" }}>
            {/* Horizontal grid lines */}
            {yAxisLabels.map((value) => (
              <div
                key={value}
                className="grid-line"
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: `${(value / 90) * 100}%`,
                  borderTop: "1px solid #d1d5db",
                }}
              />
            ))}
            
            {/* Average line - Modified to be neater and start from the very left */}
            <div
              className="average-line"
              style={{
                position: "absolute",
                left: "-5px", // Extended to start before the first bar
                right: "0",
                bottom: `${(average / 90) * 100}%`,
                borderTop: `2px dashed ${averageLineColor}`, // Changed to dashed for better visibility
                zIndex: 5,
              }}
            >
              <div 
                className="average-label"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "-15px",
                  backgroundColor: averageLineColor,
                  color: "white",
                  fontSize: "9px",
                  padding: "2px 5px",
                  borderRadius: "3px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)", // Added subtle shadow for depth
                }}
              >
                Avg: {average}
              </div>
            </div>

            {/* Bars with improved spacing */}
            <div
              className="bars-container"
              style={{
                display: "flex",
                justifyContent: "space-around",
                height: "100%",
                position: "relative",
                padding: "0 5px",
              }}
            >
              {data.map((item, index) => (
                <div
                  key={item.category}
                  className="bar-column"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "20%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    className="bar"
                    style={{
                      width: "25px",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                      position: "absolute",
                      bottom: "0",
                      height: `${(item.score / 90) * 100}%`,
                      backgroundColor: colors[index % colors.length],
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      className="bar-value"
                      style={{
                        color: "white",
                        fontWeight: "500",
                        paddingTop: "2px",
                        fontSize: "10px",
                      }}
                    >
                      {item.score}
                    </div>
                  </div>
                  <div
                    className="x-label"
                    style={{
                      position: "absolute",
                      bottom: "-15px",
                      fontSize: "9px",
                      color: "#718096",
                      textAlign: "center",
                      width: "100%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X-axis title */}
        <div
          className="x-axis-title"
          style={{
            textAlign: "center",
            color: "#4a5568",
            fontSize: "10px",
          }}
        >
          Category
        </div>
      </div>
    </div>
  )
}

export default ScoreBar