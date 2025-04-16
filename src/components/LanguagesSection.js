import React from 'react';

const LanguagesSection = () => {
  const languages = [
    {
      name: 'Japanese',
      speakers: '125 million',
      difficulty: 'Hard',
      description: 'Learn one of the world\'s most unique writing systems and immerse yourself in Japan\'s rich culture.',
      greeting: 'こんにちは (Konnichiwa)',
      color: 'color-red',
    },
    {
      name: 'Mandarin',
      speakers: '1.1 billion',
      difficulty: 'Hard',
      description: 'The most spoken language in the world opens doors to understanding Chinese history and philosophy.',
      greeting: '你好 (Nǐ hǎo)',
      color: 'color-amber',
    },
    {
      name: 'German',
      speakers: '130 million',
      difficulty: 'Medium',
      description: 'A logical language with consistent rules and many similarities to English.',
      greeting: 'Hallo',
      color: 'color-yellow',
    },
    {
      name: 'French',
      speakers: '280 million',
      difficulty: 'Medium',
      description: 'The language of love, art, and diplomacy, spoken across five continents.',
      greeting: 'Bonjour',
      color: 'color-blue',
    },
    {
      name: 'English',
      speakers: '1.5 billion',
      difficulty: 'Easy',
      description: 'The global language of business, science, and entertainment.',
      greeting: 'Hello',
      color: 'color-green',
    },
    {
      name: 'Spanish',
      speakers: '550 million',
      difficulty: 'Easy',
      description: 'A beautiful Romance language with consistent pronunciation and global reach.',
      greeting: '¡Hola!',
      color: 'color-purple',
    },
  ];

  return (
    <section id="languages" className="languages-section">
      <div className="container">
        <div className="section-heading">
          <h2>Explore Our Languages</h2>
          <p>
            Choose from six world languages, each with carefully designed courses to take you from beginner to fluent.
          </p>
        </div>
        
        <div className="language-grid">
          {languages.map((language, index) => (
            <div 
              key={language.name}
              className={`language-card ${language.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <div className="language-name">{language.name}</div>
                <div className={`difficulty-badge difficulty-${language.difficulty.toLowerCase()}`}>
                  {language.difficulty}
                </div>
              </div>
              <div className="speakers-count">
                {language.speakers} speakers worldwide
              </div>
              <div className="language-description">
                {language.description}
              </div>
              <div className="greeting-container">
                <div className="greeting-label">Say hello:</div>
                <div className="greeting-text">{language.greeting}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="language-cta">
          <button className="btn-primary">Start Your Language Journey</button>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;