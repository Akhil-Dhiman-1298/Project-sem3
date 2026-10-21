import React from 'react';

function TaskSidebar({ goToLanding, goToProfile, role, goToLogin, goToEvents, goToMembers, goToAdmin }) {
  return (
    <aside className={`sidebar`}>
      <div className="logo-box">
        <div className="brand-name">Club<span>Pilot</span></div>
      </div>

      <a href="#" className="nav-link" onClick={goToLanding}>
        <i className="fa-solid fa-layer-group"></i> Overview
      </a>

      {/* ✅ Admin Panel Button */}
      {role?.toLowerCase() === 'admin' && (
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); goToAdmin(); }}>
          <i className="fa-solid fa-gauge-high"></i> Admin Panel
        </a>
      )}

      <a href="#" className="nav-link" onClick={goToMembers}>
        <i className="fa-solid fa-users"></i> Members
      </a>

      <a href="#" className="nav-link" onClick={goToEvents}>
        <i className="fa-solid fa-calendar-check"></i> Events
      </a>

      <a href="#" className="nav-link active">
        <i className="fa-solid fa-list-check"></i> Tasks
      </a>

      <div className="divider"></div>

      <a href="#" className="nav-link" onClick={goToProfile}>
        <i className="fa-regular fa-user"></i> Profile
      </a>
    </aside>
  );
}

export default TaskSidebar;