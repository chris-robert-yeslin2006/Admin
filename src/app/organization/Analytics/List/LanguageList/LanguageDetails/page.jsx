'use client';

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import BarChart from '../../../../Statistics/BarChart'
import DonutChart from '../../../../Statistics/DonutChart'
import ProtectedRoute from '../../../../../components/ProtectedRoute';

export default function AnalyticsPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId');
  const language = searchParams.get('language');
  // Sample data - replace with your actual data
  const studentCount = 1480
  const testCount = 58
  
  const leaderboardData = [
    { name: "Alex Johnson", testsAttended: 47, highestScore: 98, totalScore: 3890, avgScore: 82.8 },
    { name: "Samantha Lee", testsAttended: 52, highestScore: 100, totalScore: 4680, avgScore: 90.0 },
    { name: "Michael Chen", testsAttended: 49, highestScore: 95, totalScore: 4165, avgScore: 85.0 },
    { name: "Taylor Moore", testsAttended: 51, highestScore: 97, totalScore: 4335, avgScore: 85.0 },
    { name: "Jordan Smith", testsAttended: 43, highestScore: 96, totalScore: 3440, avgScore: 80.0 },
    { name: "Emma Williams", testsAttended: 48, highestScore: 99, totalScore: 4368, avgScore: 91.0 },
    { name: "Noah Brown", testsAttended: 50, highestScore: 94, totalScore: 4200, avgScore: 84.0 },
    { name: "Olivia Davis", testsAttended: 46, highestScore: 98, totalScore: 4048, avgScore: 88.0 },
  ]
  
  const passPercentage = 78 // Sample pass percentage
  const overallAvgScore = 84.5 // Sample overall average score
  
  // Donut chart data for pass percentage
  const passData = [
    { name: "Pass", value: 1154, color: "#10b981" },
    { name: "Fail", value: 326, color: "#ef4444" }
  ]
  
  // Bar chart data for average scores
  const avgScoreData = [
    { day: "Week 1", value: 81.2 },
    { day: "Week 2", value: 83.5 },
    { day: "Week 3", value: 85.8 },
    { day: "Week 4", value: 84.5 },
    { day: "Week 5", value: 87.2 }
  ]

  return (
    <ProtectedRoute>
    <div className="analytics-container">
      <div className="page-header">
        <h1 className="page-title">Student Analytics Dashboard</h1>
        <button 
          className="student-button"
          onClick={() => router.push(`/Dashboard/Analytics/List/LanguageList/LanguageDetails/StudentList?orgId=${orgId}&language=${language}`)}
        >
          View All Students <span className="button-icon">→</span>
        </button>
      </div>
      
      {/* Top boxes */}
      <div className="top-boxes">
        <div className="info-box">
          <h2 className="box-label">Total Students</h2>
          <div className="box-value-container">
            <span className="box-value">{studentCount}</span>
            <span className="trend-indicator positive">+12% ↑</span>
          </div>
        </div>
        
        <div className="info-box">
          <h2 className="box-label">Tests Conducted</h2>
          <div className="box-value-container">
            <span className="box-value">{testCount}</span>
            <span className="trend-indicator positive">+3 this week</span>
          </div>
        </div>

        <div className="info-box">
          <h2 className="box-label">Pass Rate</h2>
          <div className="box-value-container">
            <span className="box-value">{passPercentage}%</span>
            <span className="trend-indicator positive">+2.5% ↑</span>
          </div>
        </div>
        
        <div className="info-box">
          <h2 className="box-label">Average Score</h2>
          <div className="box-value-container">
            <span className="box-value">{overallAvgScore.toFixed(1)}</span>
            <span className="trend-indicator positive">+1.2 pts ↑</span>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-box">
          <h2 className="chart-title">Pass Percentage</h2>
          <div className="chart-container">
            <DonutChart 
              data={passData} 
              width={300} 
              height={300} 
              centerLabel="Pass Rate" 
              centerValue={`${passPercentage}%`}
              showTooltip={true} 
            />
          </div>
        </div>
        
        <div className="chart-box">
          <h2 className="chart-title">Average Scores Trend</h2>
          <div className="chart-container">
            <BarChart 
              data={avgScoreData} 
              width={500} 
              height={300} 
              xLabel="Time Period" 
              yLabel="Average Score" 
            />
          </div>
        </div>
      </div>
      
      {/* Leaderboard */}
      <div className="leaderboard-section">
        <div className="leaderboard-header">
          <h2 className="section-title">Student Leaderboard</h2>
          <div className="leaderboard-actions">
            <button 
              className="secondary-button"
              onClick={() => router.push(`/Dashboard/Analytics/List/LanguageList/LanguageDetails/StudentList?orgId=${orgId}&language=${language}&sort=topPerformers`)}
            >
              View All Rankings
            </button>
          </div>
        </div>
        <div className="leaderboard">
          <div className="table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Tests Attended</th>
                  <th>Highest Score</th>
                  <th>Total Score</th>
                  <th>Avg. Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .map((student, index) => (
                    <tr key={index} className={index < 3 ? "top-performer" : ""}>
                      <td>
                        <div className={`rank ${index < 3 ? "top-rank" : ""}`}>
                          {index < 3 ? 
                            <span className="rank-medal">🏆</span> : 
                            <span>#{index + 1}</span>
                          }
                        </div>
                      </td>
                      <td>
                        <div className="student-name">{student.name}</div>
                      </td>
                      <td>
                        <div className="data-cell">{student.testsAttended}</div>
                      </td>
                      <td>
                        <div className="data-cell">{student.highestScore}</div>
                      </td>
                      <td>
                        <div className="data-cell">{student.totalScore}</div>
                      </td>
                      <td>
                        <div className="avg-score">{student.avgScore.toFixed(1)}</div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Base styles */
        .analytics-container {
          padding: 24px;
          background-color: #f9fafb;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        /* Button styles */
        .student-button {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
        }

        .student-button:hover {
          background-color: #1d4ed8;
        }

        .button-icon {
          margin-left: 6px;
        }

        .secondary-button {
          background-color: white;
          color: #2563eb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .secondary-button:hover {
          border-color: #2563eb;
          background-color: #f0f5ff;
        }

        /* Top boxes styles */
        .top-boxes {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        @media (min-width: 640px) {
          .top-boxes {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .top-boxes {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .info-box {
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .info-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .box-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .box-value-container {
          display: flex;
          align-items: flex-end;
        }

        .box-value {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
        }

        .trend-indicator {
          font-size: 14px;
          margin-left: 10px;
          font-weight: 500;
        }

        .trend-indicator.positive {
          color: #10b981;
        }

        .trend-indicator.negative {
          color: #ef4444;
        }

        /* Charts section */
        .charts-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (min-width: 1024px) {
          .charts-section {
            grid-template-columns: 1fr 1fr;
          }
        }

        .chart-box {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
        }

        .chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 320px;
        }

        /* Leaderboard styles */
        .leaderboard-section {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .leaderboard-header {
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .table-container {
          overflow-x: auto;
          padding: 0 8px;
        }

        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leaderboard-table th {
          padding: 14px 20px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .leaderboard-table td {
          padding: 16px 20px;
          white-space: nowrap;
        }

        .leaderboard-table tr {
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.2s;
        }

        .leaderboard-table tr:hover {
          background-color: #f9fafb;
        }

        .leaderboard-table tbody tr:last-child {
          border-bottom: none;
        }

        .top-performer {
          background-color: #f0f9ff;
        }

        .top-performer:hover {
          background-color: #e0f2fe !important;
        }

        .rank {
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          display: flex;
          align-items: center;
        }

        .top-rank {
          color: #d97706;
        }

        .rank-medal {
          font-size: 18px;
          margin-right: 5px;
        }

        .student-name {
          font-size: 15px;
          font-weight: 500;
          color: #1f2937;
        }

        .data-cell {
          font-size: 14px;
          color: #4b5563;
        }

        .avg-score {
          font-size: 16px;
          font-weight: 600;
          color: #2563eb;
        }
      `}</style>
    </div>
    </ProtectedRoute>
  );
}