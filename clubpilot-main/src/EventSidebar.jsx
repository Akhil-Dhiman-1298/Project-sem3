import React from 'react';

function EventSidebar({ darkMode, goToLanding, role, goToLogin, goToProfile,goToTasks,goToMembers }) {
  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="logo-box">
        <div className="brand-name">
          Club<span className={darkMode ? 'pilot-dark' : ''}>Pilot</span>
        </div>
      </div>
      <a href="#" className="nav-link" onClick={goToLanding}>
        <i className="fa-solid fa-layer-group"></i> Overview
      </a>

    {(role === 'admin' || role === 'leader')&&( <a href="#" className="nav-link" onClick={goToMembers}>
        <i className="fa-solid fa-users"></i> Members
      </a>)}

      <a href="#" className="nav-link active">
        <i className="fa-solid fa-calendar-check"></i> Events
      </a>

      {(role === 'admin' || role === 'leader') && (
        <a href="#" className="nav-link" onClick={goToTasks}>
          <i className="fa-solid fa-credit-card"></i> Task
        </a>
      )}

      <div className="divider"></div>

      <a href="#" className="nav-link" onClick={goToProfile}>
        <i className="fa-regular fa-user"></i> Profile
      </a>

      




    </aside>
  );
}

export default EventSidebar;