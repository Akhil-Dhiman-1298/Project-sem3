// import React from 'react';
// import { useTheme } from './ThemeContext';
// function MemberSidebar({ goToHome, goToCoreMember, goToCoreClub, goToTasks, goToEvents, goToProfile, currentPage }) {
//   const { darkMode } = useTheme();
//   const isActive = (page) => currentPage === page;

//   return (
//     <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
//       <div className="logo-box">
//         <div className="brand-name">
//           Club<span className={darkMode ? 'pilot-dark' : ''}>Pilot</span>
//         </div>
//       </div>

//       <a href="#" className={`nav-link ${isActive('landing') ? 'active' : ''}`} onClick={goToHome}>
//         <i className="fa-solid fa-layer-group"></i> Overview
//       </a>

//       <a href="#" className={`nav-link ${isActive('core-member') ? 'active' : ''}`} onClick={goToCoreMember}>
//         <i className="fa-solid fa-house"></i> Dashboard
//       </a>

//       <a href="#" className={`nav-link ${isActive('member-tasks') ? 'active' : ''}`} onClick={goToTasks}>
//         <i className="fa-solid fa-list-check"></i> Tasks
//       </a>

//       <a href="#" className={`nav-link ${isActive('core-club') ? 'active' : ''}`} onClick={goToCoreClub}>
//         <i className="fa-solid fa-users"></i> Club
//       </a>

//       <a href="#" className={`nav-link ${isActive('member-events') ? 'active' : ''}`} onClick={goToEvents}>
//         <i className="fa-solid fa-calendar-check"></i> Events
//       </a>

//       <div className="divider"></div>

//       <a href="#" className={`nav-link ${isActive('profile') ? 'active' : ''}`} onClick={goToProfile}>
//         <i className="fa-regular fa-user"></i> Profile
//       </a>

//     </aside>
//   );
// }

// export default MemberSidebar;

import React from 'react';
import SidebarProfileCard from './SidebarProfileCard';

function MemberSidebar({ goToHome, goToCoreMember, goToCoreClub, goToTasks, goToEvents, goToProfile, currentPage }) {
  return (
    <aside className={`sidebar`}>
      
      {/* ✅ Scroll Area */}
      <div className="sidebar-scroll-area">
        <div className="logo-box">
          <div className="brand-name">Club<span>Pilot</span></div>
        </div>

        <a href="#" className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); goToHome(); }}>
          <i className="fa-solid fa-layer-group"></i> Overview
        </a>

        <a href="#" className={`nav-link ${currentPage === 'hub' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); goToCoreMember(); }}>
          <i className="fa-solid fa-gauge"></i> Dashboard
        </a>

        <a href="#" className={`nav-link ${currentPage === 'club' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); goToCoreClub(); }}>
          <i className="fa-solid fa-users-rectangle"></i> Club
        </a>

        <a href="#" className={`nav-link ${currentPage === 'tasks' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); goToTasks(); }}>
          <i className="fa-solid fa-list-check"></i> Tasks
        </a>

        <a href="#" className={`nav-link ${currentPage === 'events' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); goToEvents(); }}>
          <i className="fa-solid fa-calendar-check"></i> Events
        </a>


      </div>

      {/* ✅ Profile Card (Isme role 'core-member' hardcoded hai) */}
      <SidebarProfileCard 
        goToProfile={goToProfile} 
        role="core-member" 
        username={sessionStorage.getItem('username')} 
      />

    </aside>
  );
}

export default MemberSidebar;