import React from 'react';

function GuestSidebar({ darkMode }) { 
  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="logo-box">
        <div className="brand-name">
          Club<span className={darkMode ? 'pilot-dark' : ''}>Pilot</span>
        </div>
      </div>

      <a href="#" className="nav-link active disabled-link">
        <i className="fa-solid fa-layer-group"></i> Overview
      </a>

      <a 
        href="#about-section" 
        className="nav-link"
        onClick={(e) => {
          document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <i className="fa-regular fa-circle-question"></i> About Us
      </a>

    </aside>
  );
}

export default GuestSidebar;