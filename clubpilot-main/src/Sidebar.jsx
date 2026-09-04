import React from 'react';

function Sidebar({ darkMode, goToEvents,goToLogin, goToProfile, role }) {
  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="logo-box">
        <div className="brand-name">Club<span>Pilot</span></div>
      </div>

      <a href="#" className="nav-link active">
        <i className="fa-solid fa-layer-group"></i> Overview
      </a>

      <a href="#" className="nav-link">
        <i className="fa-solid fa-users"></i> Members
      </a>

      <a href="#" className="nav-link" onClick={goToEvents}>
        <i className="fa-solid fa-calendar-check"></i> Events
      </a>

      <a href="#" className="nav-link">
        <i className="fa-solid fa-credit-card"></i> Features
      </a>

      <div className="divider"></div>
      <div className="section-label">Support</div>

      <a href="#about-section" className="nav-link">
        <i className="fa-regular fa-circle-question"></i> About Us
      </a>

      {/* <div className={`sidebar-bottom ${darkMode ? 'dark' : ''}`}>
        <div className="sidebar-bottom-title">100% Free</div>
        <div className="sidebar-bottom-subtext">For Club Leaders</div>
        <button className={`sidebar-bottom-button ${darkMode ? 'dark' : ''}`} onClick={(e) => {
          e.preventDefault();
          goToLogin();
        }}>
          Launch Dashboard →
        </button>
      </div>  */}
      <div className={`sidebar-bottom ${darkMode ? 'dark' : ''}`}>
    <div className="sidebar-bottom-title">100% Free</div>
    <div className="sidebar-bottom-subtext">For Club Leaders</div>
    <button 
      className={`sidebar-bottom-button ${darkMode ? 'dark' : ''}`}
      onClick={() => {
        if (role) {
          goToProfile();   // 🔥 Profile
        } else {
          goToLogin();     // 🔥 Login
        }
      }}
    >
      {role ? '👤 Profile' : 'Launch Dashboard →'}
    </button>
  </div>
      
    </aside>
  );
}

export default Sidebar;