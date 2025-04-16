import React from 'react';

const PricingSection = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Basic language essentials to get you started',
      features: [
        'Access to one language',
        'Basic lessons and exercises',
        'Limited vocabulary practice',
        'Community forum access',
        'Mobile app access'
      ],
      buttonText: 'Start Free',
    },
    {
      name: 'Premium',
      price: '$12.99',
      description: 'Everything you need for serious language learning',
      features: [
        'Access to all languages',
        'Advanced lessons and exercises',
        'Unlimited vocabulary practice',
        'Interactive speaking exercises',
        'Progress tracking and insights',
        'Offline mode',
        'Priority support'
      ],
      buttonText: 'Go Premium',
      isPopular: true,
    },
    {
      name: 'Teams',
      price: '$9.99',
      description: 'Per user for organizations (minimum 5 users)',
      features: [
        'All Premium features',
        'Team progress dashboard',
        'Custom learning paths',
        'Collaborative exercises',
        'Advanced analytics',
        'Dedicated account manager',
        'Custom content options'
      ],
      buttonText: 'Contact Sales',
    }
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="section-heading">
          <h2>Simple, Transparent Pricing</h2>
          <p>
            Choose the plan that fits your language learning goals, with no hidden fees or commitments.
          </p>
        </div>
        
        <div className="pricing-grid">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`pricing-card ${tier.isPopular ? 'popular-card' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.isPopular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}
              
              <div className="pricing-header">
                <h3 className="pricing-name">{tier.name}</h3>
                <div className="pricing-cost">
                  <span className="pricing-amount">{tier.price}</span>
                  {tier.name !== 'Free' && (
                    <span className="pricing-period">/month</span>
                  )}
                </div>
                <p className="pricing-description">{tier.description}</p>
              </div>
              
              <ul className="features-list">
                {tier.features.map((feature) => (
                  <li key={feature} className="feature-item">
                    <svg className="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={tier.isPopular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%' }}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        <div className="enterprise-container">
          <h3 className="enterprise-title">Need a Custom Solution?</h3>
          <p className="enterprise-description">
            We offer tailored language learning programs for educational institutions, government agencies, and large enterprises.
          </p>
          <button className="btn-secondary">
            Contact Our Enterprise Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;