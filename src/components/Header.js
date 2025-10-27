import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="avatar">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.2"/>
              <path d="M20 4C11.16 4 4 11.16 4 20C4 28.84 11.16 36 20 36C28.84 36 36 28.84 36 20C36 11.16 28.84 4 20 4ZM20 10C23.32 10 26 12.68 26 16C26 19.32 23.32 22 20 22C16.68 22 14 19.32 14 16C14 12.68 16.68 10 20 10ZM20 32.4C16 32.4 12.44 30.42 10 27.42C10.04 24.36 16 22.7 20 22.7C23.98 22.7 29.96 24.36 30 27.42C27.56 30.42 24 32.4 20 32.4Z" fill="white"/>
            </svg>
          </div>
          <div className="logo-text">
            <h1>Comfort Calculator</h1>
            <p className="tagline">For Working Professionals</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
