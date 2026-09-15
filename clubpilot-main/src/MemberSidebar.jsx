import React from 'react';

function MemberSidebar({ darkMode, goToHome, goToCoreMember, goToTasks, goToCoreClub, goToEvents, goToProfile, currentPage }) {
  const isActive = (page) => currentPage === page;

  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="logo-box">
        <div className="brand-name">
          Club<span className={darkMode ? 'pilot-dark' : ''}>Pilot</span>
        </div>
      </div>

      <a href="#" className={`nav-link ${isActive('landing') ? 'active' : ''}`} onClick={goToHome}>
        <i className="fa-solid fa-layer-group"></i> Overview
      </a>

      <a href="#" className={`nav-link ${isActive('core-member') ? 'active' : ''}`} onClick={goToCoreMember}>
        <i className="fa-solid fa-house"></i> My Dashboard
      </a>

      <a href="#" className={`nav-link ${isActive('member-tasks') ? 'active' : ''}`} onClick={goToTasks}>
        <i className="fa-solid fa-list-check"></i> My Tasks
      </a>

      <a href="#" className={`nav-link ${isActive('core-club') ? 'active' : ''}`} onClick={goToCoreClub}>
        <i className="fa-solid fa-users"></i> My Club
      </a>

      <a href="#" className={`nav-link ${isActive('member-events') ? 'active' : ''}`} onClick={goToEvents}>
        <i className="fa-solid fa-calendar-check"></i> Events
      </a>

      <div className="divider"></div>

      <a href="#" className={`nav-link ${isActive('profile') ? 'active' : ''}`} onClick={goToProfile}>
        <i className="fa-regular fa-user"></i> Profile
      </a>

    </aside>
  );
}

export default MemberSidebar;