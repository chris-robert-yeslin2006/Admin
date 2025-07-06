'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BarChart from '../../Statistics/BarChart';
import DonutChart from '../../Statistics/DonutChart';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import Cookies from 'js-cookie';
import styles from "./languageDetails.module.css"

// Mock data constants for fallback
const MOCK_STUDENTS = [
  { id: '1', name: "Alex Johnson", org_id: '123', email: "alex@example.com", language: "English", overall_mark: 82.8, average_mark: 82.8, recent_test_mark: 85, fluency_mark: 80, vocab_mark: 84, sentence_mastery: 83, pronunciation: 82 },
  { id: '2', name: "Samantha Lee", org_id: '123', email: "samantha@example.com", language: "English", overall_mark: 90.0, average_mark: 90.0, recent_test_mark: 92, fluency_mark: 89, vocab_mark: 91, sentence_mastery: 90, pronunciation: 88 },
  { id: '3', name: "Michael Chen", org_id: '123', email: "michael@example.com", language: "English", overall_mark: 85.0, average_mark: 85.0, recent_test_mark: 83, fluency_mark: 86, vocab_mark: 85, sentence_mastery: 84, pronunciation: 87 },
  { id: '4', name: "Taylor Moore", org_id: '123', email: "taylor@example.com", language: "English", overall_mark: 85.0, average_mark: 85.0, recent_test_mark: 86, fluency_mark: 84, vocab_mark: 86, sentence_mastery: 85, pronunciation: 84 },
  { id: '5', name: "Jordan Smith", org_id: '123', email: "jordan@example.com", language: "English", overall_mark: 80.0, average_mark: 80.0, recent_test_mark: 82, fluency_mark: 79, vocab_mark: 81, sentence_mastery: 80, pronunciation: 78 },
  { id: '6', name: "Emma Williams", org_id: '123', email: "emma@example.com", language: "English", overall_mark: 91.0, average_mark: 91.0, recent_test_mark: 89, fluency_mark: 92, vocab_mark: 90, sentence_mastery: 91, pronunciation: 93 },
  { id: '7', name: "Noah Brown", org_id: '123', email: "noah@example.com", language: "English", overall_mark: 84.0, average_mark: 84.0, recent_test_mark: 85, fluency_mark: 83, vocab_mark: 84, sentence_mastery: 85, pronunciation: 83 },
  { id: '8', name: "Olivia Davis", org_id: '123', email: "olivia@example.com", language: "English", overall_mark: 88.0, average_mark: 88.0, recent_test_mark: 87, fluency_mark: 89, vocab_mark: 88, sentence_mastery: 87, pronunciation: 89 },
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
  language_name: "English",
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
  const [orgId, setOrgId] = useState(null);

  useEffect(() => {
    // Get org_id from cookies
    const orgIdFromCookie = Cookies.get('org_id');
    if (orgIdFromCookie) {
      setOrgId(orgIdFromCookie);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!orgId || !language) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Try fetching from real API
        try {
          const API_BASE_URL = 'http://localhost:8000';

          // Fetch students
          const studentsResponse = await fetch(`${API_BASE_URL}/analytics/students?org_id=${orgId}&language=${language}`);
          const studentsData = await studentsResponse.json();
          console.log("Students Data:", studentsData);

          // Fetch summary
          const summaryResponse = await fetch(`${API_BASE_URL}/analytics/summary?org_id=${orgId}&language=${language}`);
          const summaryData = await summaryResponse.json();
          console.log("Summary Data:", summaryData);

          // Fetch language details
          const detailsResponse = await fetch(`${API_BASE_URL}/analytics/language-detail?org_id=${orgId}&language=${language}`);
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
  }, [orgId, language]);

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
      .map(student => {
        // Safely calculate avgScore with fallback to 0 if both values are null/undefined
        const avgScore = student.average_mark || student.overall_mark || 0;
        
        return {
          name: student.name,
          testsAttended: Math.floor(Math.random() * 10) + 40, // Random tests attended for mock data
          highestScore: student.overall_mark || 0,
          totalScore: Math.round((student.overall_mark || 0) * (Math.random() * 30 + 70)), // Random total score
          avgScore: avgScore
        };
      })
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
    studentData.reduce((sum, student) => sum + (student.overall_mark || 0), 0) / studentData.length : 84.5);
  const testCount = languageDetails.tests_conducted || 58;

  const handleViewStudents = () => {
    if (orgId) {
      router.push(`LanguageDetails/StudentList?orgId=${orgId}&language=${language}`);
    }
  };

  const handleViewRankings = () => {
    if (orgId) {
      router.push(`/admin/Analytics/LanguageDetails/StudentList?orgId=${orgId}&language=${language}&sort=topPerformers`);
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
      <div className={styles.analyticsContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Student Analytics Dashboard</h1>
          <div className={styles.headerActions}>
            <button
              className={styles.studentButton}
              onClick={handleViewStudents}
            >
              View All Students <span className={styles.buttonIcon}>→</span>
            </button>
          </div>
        </div>

        {/* Top boxes */}
        <div className={styles.topBoxes}>
          <div className={styles.infoBox}>
            <h2 className={styles.boxLabel}>Total Students</h2>
            <div className={styles.boxValueContainer}>
              <span className={styles.boxValue}>{studentCount}</span>
              <span className={styles.trendIndicatorPositive}>+12% ↑</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h2 className={styles.boxLabel}>Tests Conducted</h2>
            <div className={styles.boxValueContainer}>
              <span className={styles.boxValue}>{testCount}</span>
              <span className={styles.trendIndicatorPositive}>+3 this week</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h2 className={styles.boxLabel}>Pass Rate</h2>
            <div className={styles.boxValueContainer}>
              <span className={styles.boxValue}>{passRate}%</span>
              <span className={styles.trendIndicatorPositive}>+2.5% ↑</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h2 className={styles.boxLabel}>Average Score</h2>
            <div className={styles.boxValueContainer}>
              <span className={styles.boxValue}>{overallAvgScore.toFixed(1)}</span>
              <span className={styles.trendIndicatorPositive}>+1.2 pts ↑</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartsSection}>
          <div className={styles.chartBox}>
            <h2 className={styles.chartTitle}>Pass Percentage</h2>
            <div className={styles.chartContainer}>
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

          <div className={styles.chartBox}>
            <h2 className={styles.chartTitle}>Average Scores Trend</h2>
            <div className={styles.chartContainer}>
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
        <div className={styles.leaderboardSection}>
          <div className={styles.leaderboardHeader}>
            <h2 className={styles.sectionTitle}>Student Leaderboard</h2>
            <div className={styles.leaderboardActions}>
              <button
                className={styles.secondaryButton}
                onClick={handleViewRankings}
              >
                View All Rankings
              </button>
            </div>
          </div>
          <div className={styles.leaderboard}>
            <div className={styles.tableContainer}>
              <table className={styles.leaderboardTable}>
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
                    <tr key={index} className={index < 3 ? styles.topPerformer : ''}>
                      <td>
                        <div className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>
                          {index < 3 ?
                            <span className={styles.rankMedal}>🏆</span> :
                            <span>#{index + 1}</span>
                          }
                        </div>
                      </td>
                      <td><div className={styles.studentName}>{student.name}</div></td>
                      <td><div className={styles.dataCell}>{student.testsAttended}</div></td>
                      <td><div className={styles.dataCell}>{student.highestScore}</div></td>
                      <td><div className={styles.dataCell}>{student.totalScore}</div></td>
                      <td><div className={styles.avgScore}>{student.avgScore.toFixed(1)}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}