'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BarChart from '../../Statistics/BarChart';
import DonutChart from '../../Statistics/DonutChart';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import Cookies from 'js-cookie';

// Mock data constants for fallback
const MOCK_STUDENTS = [
  { id: '1', name: "Alex Johnson", email: "alex@example.com", overall_mark: 82.8, average_mark: 82.8, recent_test_mark: 85, fluency_mark: 80, vocab_mark: 84, sentence_mastery: 83, pronunciation: 82 },
  { id: '2', name: "Samantha Lee", email: "samantha@example.com", overall_mark: 90.0, average_mark: 90.0, recent_test_mark: 92, fluency_mark: 89, vocab_mark: 91, sentence_mastery: 90, pronunciation: 88 },
  { id: '3', name: "Michael Chen", email: "michael@example.com", overall_mark: 85.0, average_mark: 85.0, recent_test_mark: 83, fluency_mark: 86, vocab_mark: 85, sentence_mastery: 84, pronunciation: 87 },
  { id: '4', name: "Taylor Moore", email: "taylor@example.com", overall_mark: 85.0, average_mark: 85.0, recent_test_mark: 86, fluency_mark: 84, vocab_mark: 86, sentence_mastery: 85, pronunciation: 84 },
  { id: '5', name: "Jordan Smith", email: "jordan@example.com", overall_mark: 80.0, average_mark: 80.0, recent_test_mark: 82, fluency_mark: 79, vocab_mark: 81, sentence_mastery: 80, pronunciation: 78 },
  { id: '6', name: "Emma Williams", email: "emma@example.com", overall_mark: 91.0, average_mark: 91.0, recent_test_mark: 89, fluency_mark: 92, vocab_mark: 90, sentence_mastery: 91, pronunciation: 93 },
  { id: '7', name: "Noah Brown", email: "noah@example.com", overall_mark: 84.0, average_mark: 84.0, recent_test_mark: 85, fluency_mark: 83, vocab_mark: 84, sentence_mastery: 85, pronunciation: 83 },
  { id: '8', name: "Olivia Davis", email: "olivia@example.com", overall_mark: 88.0, average_mark: 88.0, recent_test_mark: 87, fluency_mark: 89, vocab_mark: 88, sentence_mastery: 87, pronunciation: 89 },
];

const MOCK_SUMMARY = {
  avg_overall: 84.5,
  avg_fluency: 85.2,
  avg_vocab: 86.1,
  avg_sentence_mastery: 83.8,
  avg_pronunciation: 85.5,
  weekly_improvement: 1.2
};

const MOCK_LANGUAGE_DETAILS = {
  total_students: 1480,
  active_students: 1245,
  tests_conducted: 58,
  pass_rate: 78
};

export default function AnalyticsPage() {
  const router = useRouter();
  const language = Cookies.get('language');
  
  // State for storing data
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [languageDetails, setLanguageDetails] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get org_id from cookies
    const userIdFromCookie = Cookies.get('user_id');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !language) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Try fetching from real API
        try {
          const API_BASE_URL = 'http://localhost:8000';
          
          // Fetch students
          const studentsResponse = await fetch(`${API_BASE_URL}/analytics/students?user_id=${userId}`);
          const studentsData = await studentsResponse.json();
          console.log("Students Data:", studentsData);
          
          // Fetch summary
          const summaryResponse = await fetch(`${API_BASE_URL}/analytics/summary?user_id=${userId}`);
          const summaryData = await summaryResponse.json();
          console.log("Summary Data:", summaryData);
          
          // Fetch language details
          const detailsResponse = await fetch(`${API_BASE_URL}/analytics/language-detail?user_id=${userId}`);
          const detailsData = await detailsResponse.json();
          console.log("Language Details Data:", detailsData);
          
          setStudentData(studentsData.students || []);
          setSummaryData(summaryData.summary || {});
          setLanguageDetails(detailsData || {});
        } catch (error) {
          console.error("API fetch error, falling back to mock data:", error);
          // Fall back to mock data if API fails
          setStudentData(MOCK_STUDENTS);
          setSummaryData(MOCK_SUMMARY);
          setLanguageDetails(MOCK_LANGUAGE_DETAILS);
        }
      } catch (error) {
        console.error("Error in data fetching:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId, language]);

  // Calculate pass percentage data for the donut chart
  const calculatePassData = () => {
    // If we have language details with a pass rate, use that
    if (languageDetails.pass_rate) {
      const passRate = languageDetails.pass_rate;
      const totalStudents = languageDetails.total_students || 1480;
      const passStudents = Math.round((passRate / 100) * totalStudents);
      const failStudents = totalStudents - passStudents;
      
      return {
        passData: [
          { name: "Pass", value: passStudents, color: "#10b981" },
          { name: "Fail", value: failStudents, color: "#ef4444" }
        ],
        passRate
      };
    }
    
    // Otherwise calculate from student data
    if (!studentData.length) {
      return { 
        passData: [
          { name: "Pass", value: 1154, color: "#10b981" },
          { name: "Fail", value: 326, color: "#ef4444" }
        ], 
        passRate: 78 
      };
    }
    
    const passingStudents = studentData.filter(student => 
      student.overall_mark >= 70
    ).length;
    
    const failingStudents = studentData.length - passingStudents;
    const passRate = Math.round((passingStudents / studentData.length) * 100);
    
    return {
      passData: [
        { name: "Pass", value: passingStudents, color: "#10b981" },
        { name: "Fail", value: failingStudents, color: "#ef4444" }
      ],
      passRate
    };
  };
  
  // Process student data for the leaderboard
  const getLeaderboardData = () => {
    if (!studentData.length) return [];
    
    return studentData
      .map(student => ({
        name: student.name,
        testsAttended: Math.floor(Math.random() * 10) + 40, // Random tests attended for mock data
        highestScore: student.overall_mark,
        totalScore: Math.round(student.overall_mark * (Math.random() * 30 + 70)), // Random total score
        avgScore: student.average_mark || student.overall_mark
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 8);
  };
  
  // Sample data for average scores trend
  const getAvgScoreData = () => {
    const baseScore = summaryData.avg_overall || 84.5;
    return [
      { day: "Week 1", value: Math.round((baseScore - 3 + Math.random() * 2) * 10) / 10 },
      { day: "Week 2", value: Math.round((baseScore - 1 + Math.random() * 2) * 10) / 10 },
      { day: "Week 3", value: Math.round((baseScore + Math.random() * 2) * 10) / 10 },
      { day: "Week 4", value: Math.round((baseScore + 1 + Math.random() * 2) * 10) / 10 },
      { day: "Week 5", value: Math.round((baseScore + 2 + Math.random() * 2) * 10) / 10 }
    ];
  };
  
  const { passData, passRate } = calculatePassData();
  const leaderboardData = getLeaderboardData();
  const avgScoreData = getAvgScoreData();
  
  const studentCount = languageDetails.total_students || studentData.length || 1480;
  const overallAvgScore = summaryData.avg_overall || (studentData.length > 0 ? 
    studentData.reduce((sum, student) => sum + student.overall_mark, 0) / studentData.length : 84.5);
  const testCount = languageDetails.tests_conducted || 58;

  const handleViewStudents = () => {
    if (userId) {
      router.push(`LanguageDetails/StudentList?user_id=${userId}`);
    }
  };

  const handleViewRankings = () => {
    if (userId) {
      router.push(`LanguageList/LanguageDetails/StudentList?user_id=${userId}&sort=topPerformers`);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="analytics-container">
          <div className="loading">Loading analytics data...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="analytics-container">
        <div className="page-header">
          <h1 className="page-title">Student Analytics Dashboard</h1>
          <div className="header-actions">
            <button 
              className="student-button"
              onClick={handleViewStudents}
            >
              View All Students <span className="button-icon">→</span>
            </button>
          </div>
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
              <span className="box-value">{passRate}%</span>
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
                centerValue={`${passRate}%`}
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
                onClick={handleViewRankings}
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
                  {leaderboardData.map((student, index) => (
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
          
          .header-actions {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          
          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            font-size: 18px;
            color: #6b7280;
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
            min-width: 280px;
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