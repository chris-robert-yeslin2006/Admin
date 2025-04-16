"use client"
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { redirect } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClick(){
    redirect("/Login")
  }

  return (
    <header>
      <nav className="container">
        <a href="#" className="logo">LinguaHub</a>
        
        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <div className="nav-links">
          <a href="#languages">Languages</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-secondary" onClick={()=>{handleClick()}}>Login as Individual</button>
          <button className="btn-primary" onClick={()=>{handleClick}}>Login as Organization</button>
          <ThemeToggle />
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <a 
              href="#languages" 
              onClick={() => setIsMenuOpen(false)}
            >
              Languages
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <button className="btn-secondary">Login as Individual</button>
            <button className="btn-primary">Login as Organization</button>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;