import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fade-in">
            <h1>
              Unlock Your <span style={{ color: 'var(--bright-blue)' }}>Language</span> Potential
            </h1>
            <p>
              Learn Japanese, Mandarin, German, French, English, and Spanish with our interactive and engaging platform. Start your language journey today!
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                Start Learning for Free
              </button>
              <button className="btn-secondary">
                Explore Languages
              </button>
            </div>
            <div className="hero-tip">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Learn at your own pace with just 15 minutes a day</span>
            </div>
          </div>
          
          <div className="hero-demo animate-fade-in-right">
            <div className="demo-accent-circle"></div>
            <div className="demo-accent-circle"></div>
            <div className="demo-box">
              <div className="demo-header">
                <div className="demo-window-controls">
                  <div className="window-control"></div>
                  <div className="window-control"></div>
                  <div className="window-control"></div>
                </div>
                <div className="demo-lesson-title">
                  <div className="lesson-title">Japanese Lesson 1</div>
                  <div className="lesson-difficulty">Beginner</div>
                </div>
              </div>
              
              <div className="demo-content">
                <div className="demo-vocab">
                  <div className="vocab-item">
                    <div>Hello</div>
                    <div style={{ fontWeight: '500' }}>こんにちは</div>
                  </div>
                  <div className="vocab-item">
                    <div>Thank you</div>
                    <div style={{ fontWeight: '500' }}>ありがとう</div>
                  </div>
                  <div className="vocab-item">
                    <div>Goodbye</div>
                    <div style={{ fontWeight: '500' }}>さようなら</div>
                  </div>
                </div>
                
                <div className="demo-practice">
                  <div className="practice-heading">Practice saying:</div>
                  <div className="practice-text">こんにちは、ありがとう！</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;