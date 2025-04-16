import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LanguagesSection from '../components/LanguagesSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LanguagesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;