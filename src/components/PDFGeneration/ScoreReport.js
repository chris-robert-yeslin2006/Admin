'use client'

import ScoreBar from './ScoreBar'
import SkillDetails from './SkillDetails'

function ScoreScaleGraph ({ score, min = 0, max = 90 }) {
  const percentage = Math.min(
    Math.max(((score - min) / (max - min)) * 100, 0),
    100
  )

  return (
    <div className='score-scale-graph'>
      <div className='graph-container'>
        <div className='scale-bar'>
          <div className='scale-track-empty'></div>
          <div className='scale-labels'>
            <span className='min-label'>{min}</span>
            <span className='max-label'>{max}</span>
          </div>
          <div
            className='scale-track-fill'
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <style jsx>{`
        .score-scale-graph {
          width: 100%;
          padding: 0;
          margin: 0;
        }

        .graph-container {
          position: relative;
        }

        .scale-bar {
          position: relative;
          height: 20px;
          margin-bottom: 2px;
        }

        .scale-track-empty {
          position: absolute;
          width: 100%;
          height: 8px;
          background-color: transparent;
          border: 1px solid #ccc;
          border-radius: 4px;
          top: 80%;
          transform: translateY(-50%);
        }

        .scale-track-fill {
          position: absolute;
          height: 8px;
          background-color: #4cd137;
          border-radius: 4px;
          top: 80%;
          transform: translateY(-50%);
          transition: width 0.5s ease;
        }

        .scale-labels {
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -moz-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-top: 2px;
          font-size: 10px;
          font-weight: bold;
          color: #666;
          top: -5px;
          position: relative;
        }
      `}</style>
    </div>
  )
}

// Update the pdfStyles object to better control page breaks
const pdfStyles = {
  reportContainer: {
    maxWidth: '216mm', // Increased from 210mm
    margin: '0',
    padding: '0',
    backgroundColor: '#ffffff',
    overflow: 'visible'
  },
  reportBody: {
    display: 'flex',
    padding: '5px 2px', // Reduced padding
    gap: '5px', // Reduced gap
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  overallScoreSection: {
    flex: '1',
    maxWidth: '50%',
    padding: '0 2px' // Added padding reduction
  },
  scoreBarSection: {
    flex: '1',
    maxWidth: '50%',
    padding: '0 2px' // Added padding reduction
  },
  skillDetailsSection: {
    padding: '0 2px 5px' // Reduced padding
  },
  skillDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px' // Reduced gap
  }
}

export default function ScoreReport ({ data }) {
  const languageName = data.language || 'Japanese'

  return (
    <div className='report-container' style={pdfStyles.reportContainer}>
      {/* Logo Section - Reduced space */}
      <div className='logo-section' style={{ marginBottom: '0' }}>
        <div className='logo-text'>
          <span className='logo-brand' style={{ fontSize: '40px' }}>
            {languageName}
            <span className='logo-tm'>™</span>
          </span>
          <div
            className='report-header'
            style={{ padding: '5px 2px', justifyContent: 'flex-end' }}
          >
            <div className='header-content'>
              <div className='candidate-info'>
                <p style={{ fontWeight: 300, margin: '2px 0' }}>
                  Name:<span className='bold'> {data.candidateName}</span>
                </p>
                <div className='candidate-Details'>
                  <p style={{ fontWeight: 300, margin: '2px 0' }}>
                    Test Date: <span className='bold'> {data.testDate}</span>
                  </p>
                  <p style={{ fontWeight: 300, margin: '2px 0' }}>
                    Test ID:<span className='bold'> 12345</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span
          style={{
            position: 'absolute',
            top: '60px',
            fontWeight: 'bold'
          }}
        >
          {languageName} Test Score
        </span>
      </div>

      {/* Header - Reduced padding */}

      {/* Overall score and bar chart */}
      <div className='report-body' style={pdfStyles.reportBody}>
        {/* Left side: Overall Score section */}
        <div
          className='overall-score-section'
          style={pdfStyles.overallScoreSection}
        >
          <div
            className='overall-score-header'
            style={{ marginBottom: '5px', padding: '5px' }}
          >
            <div
              className='score-display'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <h2
                className='overall'
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '2px'
                }}
              >
                Overall Score
              </h2>
              <div
                className='overall-score'
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  position: 'static',
                  left: 'auto'
                }}
              >
                {data.overallScore}
              </div>
              <div style={{ width: '100px', margin: '2px auto' }}>
                <ScoreScaleGraph score={data.overallScore} />
              </div>
              <div
                className='cefr-badge'
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  position: 'static',
                  marginTop: '0'
                }}
              >
                CEFR: {data.cefr}
              </div>
            </div>
            <p
              className='overall-description'
              style={{ fontSize: '11px', lineHeight: '1.3', marginTop: '5px' }}
            >
              {data.overallDescription}
            </p>
          </div>

          <div className='overall-score-header' style={{ padding: '5px' }}>
            <div
              className='score-display'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <h2
                className='overall'
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '2px'
                }}
              >
                Intelligibility
              </h2>
              <div
                className='overall-score'
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  position: 'static',
                  left: 'auto'
                }}
              >
                {data.intelligibility.score}
              </div>
              <div
                className='cefr-badge'
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  position: 'static',
                  marginTop: '0'
                }}
              >
                {data.intelligibility.level}
              </div>
            </div>
            <p
              className='overall-description'
              style={{ fontSize: '11px', lineHeight: '1.3', marginTop: '5px' }}
            >
              {data.intelligibility.description}
            </p>
          </div>
        </div>

        {/* Right side: Skills bar chart section */}
        <div className='score-bars-section' style={pdfStyles.scoreBarSection}>
          <h2
            className='score-bars-title'
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}
          >
            Skills Overview
          </h2>
          <ScoreBar
            Sentence_mastery={data.skills.sentenceMastery.score}
            Pronouncation={data.skills.pronunciation.score}
            Vocabulary={data.skills.vocabulary.score}
            Fluency={data.skills.fluency.score}
          />
        </div>
      </div>

      {/* Skills detail section - Compressed */}
      <div
        className='skill-details-section'
        style={pdfStyles.skillDetailsSection}
      >
        <h2
          className='skill-details-title'
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '5px',
            marginTop: '5px'
          }}
        >
          Current Capabilities in Detail
        </h2>

        <div style={pdfStyles.skillDetailsContainer}>
          <SkillDetails
            name='Sentence Mastery'
            data={data.skills.sentenceMastery}
          />
          <SkillDetails name='Vocabulary' data={data.skills.vocabulary} />
          <SkillDetails name='Fluency' data={data.skills.fluency} />
          <SkillDetails name='Pronunciation' data={data.skills.pronunciation} />
        </div>
      </div>
    </div>
  )
}
