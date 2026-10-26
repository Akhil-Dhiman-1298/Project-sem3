// // import React from 'react';
// // import { useTheme } from './ThemeContext';

// // function TaskSidebar({ goToLanding, goToProfile, role, goToLogin, goToEvents, goToMembers }) {
// //   const { darkMode } = useTheme();
// //   return (
// //     <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
// //       <div className="logo-box">
// //         <div className="brand-name">
// //           Club<span className={darkMode ? 'pilot-dark' : ''}>Pilot</span>
// //         </div>
// //       </div>

// //       <a href="#" className="nav-link" onClick={goToLanding}>
// //         <i className="fa-solid fa-layer-group"></i> Overview
// //       </a>

// //       <a href="#" className="nav-link" onClick={goToMembers}>
// //         <i className="fa-solid fa-users"></i> Members
// //       </a>

// //       <a href="#" className="nav-link" onClick={goToEvents}>
// //         <i className="fa-solid fa-calendar-check"></i> Events
// //       </a>

// //       <a href="#" className="nav-link active">
// //         <i className="fa-solid fa-list-check"></i>Tasks
// //       </a>

// //       <div className="divider"></div>

// //       <a href="#" className="nav-link" onClick={goToProfile}>
// //         <i className="fa-regular fa-user"></i> Profile
// //       </a>

// //     </aside>
// //   );
// // }

// // export default TaskSidebar;

// import React from 'react';
// import { useTheme } from './ThemeContext'; 

// function TaskSidebar({ goToLanding, goToProfile, role, goToLogin, goToEvents, goToMembers, goToAdmin }) {
//   const { darkMode } = useTheme();

//   return (
//     <aside className={`sidebar`}>
//       <div className="logo-box">
//         <div className="brand-name">Club<span>Pilot</span></div>
//       </div>

//       <a href="#" className="nav-link" onClick={goToLanding}>
//         <i className="fa-solid fa-layer-group"></i> Overview
//       </a>

//       {/* ✅ Admin Panel Button */}


//       {(role === 'admin' || role === 'leader') && (
//         <a href="#" className="nav-link" onClick={goToMembers}>
//           <i className="fa-solid fa-users"></i> Members
//         </a>
//       )}

//       {(role === 'admin' || role === 'leader') && (
//         <a href="#" className="nav-link" onClick={goToEvents}>
//           <i className="fa-solid fa-calendar-check"></i> Events
//         </a>
//       )}

//       <a href="#" className="nav-link active">
//         <i className="fa-solid fa-list-check"></i> Task
//       </a>

//       <div className="divider"></div>

//       {role?.toLowerCase() === 'admin' && (
//         <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); goToAdmin(); }}>
//           <i className="fa-solid fa-gauge-high"></i> Admin Panel
//         </a>
//       )}

//       <a href="#" className="nav-link" onClick={goToProfile}>
//         <i className="fa-regular fa-user"></i> Profile
//       </a>
//     </aside>
//   );
// }

// export default TaskSidebar;

import React from 'react';
import SidebarProfileCard from './SidebarProfileCard';

function TaskSidebar({ goToLanding, goToProfile, role, goToLogin, goToEvents, goToMembers, goToAdmin, currentPage }) {
  return (
    <aside className={`sidebar`}>
      
      {/* ✅ Scroll Area */}
      <div className="sidebar-scroll-area">
        <div className="logo-box">
          <div className="brand-name">Club<span>Pilot</span></div>
        </div>

        <a href="#" className={`nav-link ${currentPage === 'tasks' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); goToLanding(); }}>
          <i className="fa-solid fa-layer-group"></i> Overview
        </a>



        {(role === 'admin' || role === 'leader') && (
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); goToMembers(); }}>
            <i className="fa-solid fa-users"></i> Members
          </a>
        )}

        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); goToEvents(); }}>
          <i className="fa-solid fa-calendar-check"></i> Events
        </a>

        {(role === 'admin' || role === 'leader') && (
          <a href="#" className="nav-link active" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-list-check"></i> Tasks
          </a>
        )}

        <div className="divider"></div>

        {role?.toLowerCase() === 'admin' && (
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); goToAdmin(); }}>
            <i className="fa-solid fa-gauge-high"></i> Admin Panel
          </a>
        )}


      </div>

      {/* ✅ Profile Card */}
      <SidebarProfileCard 
        goToProfile={goToProfile} 
        role={role} 
        username={sessionStorage.getItem('username')} 
      />

    </aside>
  );
}

export default TaskSidebar;