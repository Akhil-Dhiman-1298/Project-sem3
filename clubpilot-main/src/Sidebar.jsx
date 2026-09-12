import React from 'react';

function Sidebar({ darkMode, goToEvents,goToLogin,goToProfile,role,goToTasks}) {
  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="logo-box">
        <div className="brand-name">
          Club<span className={darkMode ? 'pilot-dark' : ''}>Pilot</span>
        </div>
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

      {(role === 'admin' || role === 'leader') && (
        <a href="#" className="nav-link" onClick={goToTasks}>
          <i className="fa-solid fa-credit-card"></i> Task
        </a>
      )}

      <div className="divider"></div>
      <a href="#about-section" className="nav-link">
        <i className="fa-regular fa-circle-question"></i> About Us
      </a>

      <a href="#" className="nav-link" onClick={goToProfile}>
        <i className="fa-regular fa-user"></i> Profile
      </a>


    </aside>
  );
}

export default Sidebar;

