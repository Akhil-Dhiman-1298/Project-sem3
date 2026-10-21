import React from 'react';

function Sidebar({ goToEvents, goToLogin, goToLanding, goToProfile, role, goToTasks, goToMembers, currentPage, goToAdmin }) {
  return (
    <aside className={`sidebar`}>
      <div className="logo-box">
        <div className="brand-name">Club<span>Pilot</span></div>
      </div>
      
      <a href="#top" className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`} onClick={goToLanding}>
        <i className="fa-solid fa-layer-group"></i> Overview
      </a>

      {/* ✅ Admin Panel Button */}
      {role?.toLowerCase() === 'admin' && (
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); goToAdmin(); }}>
          <i className="fa-solid fa-gauge-high"></i> Admin Panel
        </a>
      )}

      {(role === 'admin' || role === 'leader') && (
        <a href="#" className={`nav-link ${currentPage === 'members' ? 'active' : ''}`} onClick={goToMembers}>
          <i className="fa-solid fa-users"></i> Members
        </a>
      )}

      <a href="#" className={`nav-link ${currentPage === 'events' ? 'active' : ''}`} onClick={goToEvents}>
        <i className="fa-solid fa-calendar-check"></i> Events
      </a>

      {(role === 'admin' || role === 'leader') && (
        <a href="#" className={`nav-link ${currentPage === 'tasks' ? 'active' : ''}`} onClick={goToTasks}>
          <i className="fa-solid fa-list-check"></i> Tasks
        </a>
      )}

      <div className="divider"></div>

      {currentPage !== 'members' && (
        <a href="#about-section" className="nav-link">
          <i className="fa-regular fa-circle-question"></i> About Us
        </a>
      )}

      <a href="#" className="nav-link" onClick={goToProfile}>
        <i className="fa-regular fa-user"></i> Profile
      </a>
    </aside>
  );
}

export default Sidebar;