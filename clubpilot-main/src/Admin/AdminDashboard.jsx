// // // // // import React, { useState } from "react";
// // // // // import AdminOverview from "./AdminOverview";
// // // // // import AdminEvents from "./AdminEvents";
// // // // // import AdminSubmissions from "./AdminSubmissions";
// // // // // import AdminDocuments from "./AdminDocuments";
// // // // // import AdminWorkflow from "./AdminWorkflow";
// // // // // import "./AdminDashboard.css";

// // // // // const navigation = [
// // // // //   { id: "overview", icon: "▦", label: "Overview" },
// // // // //   { id: "events", icon: "▣", label: "Events" },
// // // // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // // // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // // // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // // // ];

// // // // // const initialActivities = [
// // // // //   {
// // // // //     id: 1,
// // // // //     title: "Event proposal submitted",
// // // // //     description:
// // // // //       "The Annual Cultural Fest proposal is waiting for your review.",
// // // // //     category: "Event Proposal",
// // // // //     time: "Recently",
// // // // //     status: "Pending",
// // // // //     icon: "▣",
// // // // //   },
// // // // //   {
// // // // //     id: 2,
// // // // //     title: "Budget approval required",
// // // // //     description:
// // // // //       "The Leader has submitted an estimated budget for an upcoming event.",
// // // // //     category: "Budget",
// // // // //     time: "Recently",
// // // // //     status: "Pending",
// // // // //     icon: "₹",
// // // // //   },
// // // // //   {
// // // // //     id: 3,
// // // // //     title: "Post-event report requested",
// // // // //     description:
// // // // //       "A report and supporting documents are required from the Leader.",
// // // // //     category: "Report",
// // // // //     time: "Recently",
// // // // //     status: "Action Required",
// // // // //     icon: "▤",
// // // // //   },
// // // // // ];

// // // // // function AdminDashboard({ onLogout }) {
// // // // //   const [activePage, setActivePage] = useState("overview");

// // // // //   const pageTitles = {
// // // // //     overview: "Overview",
// // // // //     events: "Events",
// // // // //     approvals: "Submissions & Approvals",
// // // // //     documents: "Documents & Reports",
// // // // //     workflow: "Workflow",
// // // // //   };

// // // // //   function renderPage() {
// // // // //   switch (activePage) {
// // // // //     case "overview":
// // // // //       return <AdminOverview />;

// // // // //     case "events":
// // // // //       return <AdminEvents />;

// // // // //     case "approvals":
// // // // //       return <AdminSubmissions />;

// // // // //     case "documents":
// // // // //       return <AdminDocuments />;

// // // // //     case "workflow":
// // // // //       return <AdminWorkflow />;

// // // // //     default:
// // // // //       return <AdminOverview />;
// // // // //   }
// // // // // }

// // // // //   return (
// // // // //     <div className="admin-layout">
// // // // //       <aside className="admin-sidebar">
// // // // //         <div className="admin-brand">
// // // // //           <div className="admin-brand-icon">C</div>
// // // // //           <div>
// // // // //             <h2>ClubPilot</h2>
// // // // //             <span>Club Operations</span>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // // // //         <nav className="admin-navigation">
// // // // //           {navigation.map((item) => (
// // // // //             <button
// // // // //               key={item.id}
// // // // //               className={`admin-nav-item ${
// // // // //                 activePage === item.id ? "active" : ""
// // // // //               }`}
// // // // //               onClick={() => setActivePage(item.id)}
// // // // //             >
// // // // //               <span className="admin-nav-icon">{item.icon}</span>
// // // // //               <span>{item.label}</span>

// // // // //               {item.id === "approvals" && (
// // // // //                 <span className="admin-nav-count">3</span>
// // // // //               )}
// // // // //             </button>
// // // // //           ))}
// // // // //         </nav>

// // // // //         <div className="admin-sidebar-bottom">
// // // // //           <div className="admin-help-card">
// // // // //             <div className="admin-help-icon">?</div>
// // // // //             <h4>Need assistance?</h4>
// // // // //             <p>Manage your club approvals and records in one place.</p>
// // // // //           </div>

// // // // //           <div className="admin-profile">
// // // // //             <div className="admin-avatar">A</div>
// // // // //             <div className="admin-profile-info">
// // // // //               <strong>Club Admin</strong>
// // // // //               <span>Administrator</span>
// // // // //             </div>

// // // // //             {onLogout && (
// // // // //               <button
// // // // //                 className="admin-logout-btn"
// // // // //                 onClick={onLogout}
// // // // //                 title="Log out"
// // // // //               >
// // // // //                 ↗
// // // // //               </button>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </aside>

// // // // //       <main className="admin-main">
// // // // //         <header className="admin-topbar">
// // // // //           <div className="admin-breadcrumb">
// // // // //             <span>ClubPilot</span>
// // // // //             <span>/</span>
// // // // //             <strong>{pageTitles[activePage]}</strong>
// // // // //           </div>

// // // // //           <div className="admin-topbar-actions">
// // // // //             <span className="admin-role-label">Admin Workspace</span>
// // // // //             <button
// // // // //               className="admin-notification-btn"
// // // // //               title="Notifications"
// // // // //               onClick={() => setActivePage("overview")}
// // // // //             >
// // // // //               ♧
// // // // //               <span className="admin-notification-dot" />
// // // // //             </button>
// // // // //             <div className="admin-avatar admin-avatar-small">A</div>
// // // // //           </div>
// // // // //         </header>

// // // // //         <div className="admin-page-content">
// // // // //           {renderPage()}
// // // // //         </div>
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function AdminOverviewLegacy({ onNavigate }) {
// // // // //   const [activities] = useState(initialActivities);

// // // // //   const stats = [
// // // // //     {
// // // // //       label: "Total Clubs",
// // // // //       value: "1",
// // // // //       description: "Club under your supervision",
// // // // //       icon: "♧",
// // // // //       color: "purple",
// // // // //     },
// // // // //     {
// // // // //       label: "Pending Approvals",
// // // // //       value: "3",
// // // // //       description: "Items requiring your review",
// // // // //       icon: "☑",
// // // // //       color: "orange",
// // // // //     },
// // // // //     {
// // // // //       label: "Upcoming Events",
// // // // //       value: "4",
// // // // //       description: "Planned by your club",
// // // // //       icon: "▣",
// // // // //       color: "blue",
// // // // //     },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="admin-overview">
// // // // //       <div className="admin-welcome">
// // // // //         <div>
// // // // //           <p className="admin-eyebrow">CLUB ADMINISTRATION</p>
// // // // //           <h1>Welcome back, Admin!</h1>
// // // // //           <p className="admin-welcome-description">
// // // // //             Keep track of club activities, event plans, and approvals.
// // // // //           </p>
// // // // //         </div>

// // // // //         <div className="admin-date-chip">
// // // // //           <span>◷</span> Activity Centre
// // // // //         </div>
// // // // //       </div>

// // // // //       <section className="admin-stats-grid">
// // // // //         {stats.map((stat) => (
// // // // //           <article className="admin-stat-card" key={stat.label}>
// // // // //             <div className="admin-stat-top">
// // // // //               <span>{stat.label}</span>
// // // // //               <div className={`admin-stat-icon ${stat.color}`}>
// // // // //                 {stat.icon}
// // // // //               </div>
// // // // //             </div>

// // // // //             <h2>{stat.value}</h2>
// // // // //             <p>{stat.description}</p>
// // // // //           </article>
// // // // //         ))}
// // // // //       </section>

// // // // //       <section className="admin-activity-section">
// // // // //         <div className="admin-section-heading">
// // // // //           <div>
// // // // //             <h2>Activity & Attention</h2>
// // // // //             <p>
// // // // //               Important updates and actions that need your attention.
// // // // //             </p>
// // // // //           </div>

// // // // //           <span className="admin-pending-pill">
// // // // //             {activities.length} items
// // // // //           </span>
// // // // //         </div>

// // // // //         <div className="admin-activity-list">
// // // // //           {activities.map((activity) => (
// // // // //             <article
// // // // //               className="admin-activity-item"
// // // // //               key={activity.id}
// // // // //             >
// // // // //               <div className="admin-activity-icon">
// // // // //                 {activity.icon}
// // // // //               </div>

// // // // //               <div className="admin-activity-details">
// // // // //                 <div className="admin-activity-title-row">
// // // // //                   <h3>{activity.title}</h3>
// // // // //                   <span
// // // // //                     className={`admin-status ${
// // // // //                       activity.status === "Pending"
// // // // //                         ? "pending"
// // // // //                         : "attention"
// // // // //                     }`}
// // // // //                   >
// // // // //                     {activity.status}
// // // // //                   </span>
// // // // //                 </div>

// // // // //                 <p>{activity.description}</p>

// // // // //                 <div className="admin-activity-meta">
// // // // //                   <span>{activity.category}</span>
// // // // //                   <span>•</span>
// // // // //                   <span>{activity.time}</span>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <button
// // // // //                 className="admin-review-btn"
// // // // //                 onClick={() => onNavigate("approvals")}
// // // // //               >
// // // // //                 Review <span>→</span>
// // // // //               </button>
// // // // //             </article>
// // // // //           ))}
// // // // //         </div>

// // // // //         <button
// // // // //           className="admin-view-all"
// // // // //           onClick={() => onNavigate("approvals")}
// // // // //         >
// // // // //           View all submissions & approvals <span>→</span>
// // // // //         </button>
// // // // //       </section>

// // // // //       <section className="admin-info-banner">
// // // // //         <div className="admin-info-symbol">i</div>
// // // // //         <div>
// // // // //           <h3>Keep club records organised</h3>
// // // // //           <p>
// // // // //             Review event proposals, check budgets, and collect digital
// // // // //             copies of important documents from your club Leader.
// // // // //           </p>
// // // // //         </div>
// // // // //         <button onClick={() => onNavigate("workflow")}>
// // // // //           Request Documents <span>→</span>
// // // // //         </button>
// // // // //       </section>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default AdminDashboard;

// // // // import React, { useState } from "react";
// // // // import AdminOverview from "./AdminOverview";
// // // // import AdminEvents from "./AdminEvents";
// // // // import AdminSubmissions from "./AdminSubmissions";
// // // // import AdminDocuments from "./AdminDocuments";
// // // // import AdminWorkflow from "./AdminWorkflow";
// // // // import "./AdminDashboard.css";

// // // // const navigation = [
// // // //   { id: "overview", icon: "▦", label: "Overview" },
// // // //   { id: "events", icon: "▣", label: "Events" },
// // // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // // ];

// // // // function AdminDashboard({ onLogout }) {
// // // //   const [activePage, setActivePage] = useState("overview");

// // // //   const pageTitles = {
// // // //     overview: "Overview",
// // // //     events: "Events",
// // // //     approvals: "Submissions & Approvals",
// // // //     documents: "Documents & Reports",
// // // //     workflow: "Workflow",
// // // //   };

// // // //   function renderPage() {
// // // //     switch (activePage) {
// // // //       case "overview": return <AdminOverview />;
// // // //       case "events": return <AdminEvents />;
// // // //       case "approvals": return <AdminSubmissions />;
// // // //       case "documents": return <AdminDocuments />;
// // // //       case "workflow": return <AdminWorkflow />;
// // // //       default: return <AdminOverview />;
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="admin-layout">
// // // //       <aside className="admin-sidebar">
// // // //         {/* ✅ Brand Section (Matched with main sidebar) */}
// // // //         <div className="admin-brand">
// // // //           <h2>Club<span>Pilot</span></h2>
// // // //         </div>

// // // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // // //         <nav className="admin-navigation">
// // // //           {navigation.map((item) => (
// // // //             <button
// // // //               key={item.id}
// // // //               className={`admin-nav-item ${activePage === item.id ? "active" : ""}`}
// // // //               onClick={() => setActivePage(item.id)}
// // // //             >
// // // //               <span className="admin-nav-icon">{item.icon}</span>
// // // //               <span>{item.label}</span>
// // // //             </button>
// // // //           ))}
// // // //         </nav>

// // // //         <div className="admin-sidebar-bottom">
// // // //           <div className="admin-help-card">
// // // //             <div className="admin-help-icon">?</div>
// // // //             <h4>Need assistance?</h4>
// // // //             <p>Manage your club approvals and records in one place.</p>
// // // //           </div>

// // // //           <div className="admin-profile">
// // // //             <div className="admin-avatar">A</div>
// // // //             <div className="admin-profile-info">
// // // //               <strong>Club Admin</strong>
// // // //               <span>Administrator</span>
// // // //             </div>

// // // //             {onLogout && (
// // // //               <button className="admin-logout-btn" onClick={onLogout} title="Log out">
// // // //                 <i className="fa-solid fa-right-from-bracket"></i>
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </aside>

// // // //       <main className="admin-main">
// // // //         <header className="admin-topbar">
// // // //           <div className="admin-breadcrumb">
// // // //             <span>ClubPilot</span>
// // // //             <span>/</span>
// // // //             <strong>{pageTitles[activePage]}</strong>
// // // //           </div>

// // // //           <div className="admin-topbar-actions">
// // // //             <span className="admin-role-label">Admin Workspace</span>
// // // //             <button
// // // //               className="admin-notification-btn"
// // // //               title="Notifications"
// // // //               onClick={() => setActivePage("overview")}
// // // //             >
// // // //               <i className="fa-regular fa-bell"></i>
// // // //               <span className="admin-notification-dot" />
// // // //             </button>
// // // //             <div className="admin-avatar admin-avatar-small">A</div>
// // // //           </div>
// // // //         </header>

// // // //         <div className="admin-page-content">
// // // //           {renderPage()}
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AdminDashboard;

// // // import React, { useState } from "react";
// // // import AdminOverview from "./AdminOverview";
// // // import AdminEvents from "./AdminEvents";
// // // import AdminSubmissions from "./AdminSubmissions";
// // // import AdminDocuments from "./AdminDocuments";
// // // import AdminWorkflow from "./AdminWorkflow";
// // // import "./AdminDashboard.css";

// // // const navigation = [
// // //   { id: "overview", icon: "▦", label: "Overview" },
// // //   { id: "events", icon: "▣", label: "Events" },
// // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // ];

// // // function AdminDashboard({ onLogout }) {
// // //   const [activePage, setActivePage] = useState("overview");

// // //   const pageTitles = {
// // //     overview: "Overview",
// // //     events: "Events",
// // //     approvals: "Submissions & Approvals",
// // //     documents: "Documents & Reports",
// // //     workflow: "Workflow",
// // //   };

// // //   function renderPage() {
// // //     switch (activePage) {
// // //       case "overview": return <AdminOverview />;
// // //       case "events": return <AdminEvents />;
// // //       case "approvals": return <AdminSubmissions />;
// // //       case "documents": return <AdminDocuments />;
// // //       case "workflow": return <AdminWorkflow />;
// // //       default: return <AdminOverview />;
// // //     }
// // //   }

// // //   return (
// // //     <div className="admin-layout">
// // //       {/* ✅ Sidebar (Exact match with Screenshot) */}
// // //       <aside className="admin-sidebar">
// // //         <div className="admin-brand">
// // //           <h2>Club<span>Pilot</span></h2>
// // //         </div>

// // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // //         <nav className="admin-navigation">
// // //           {navigation.map((item) => (
// // //             <button
// // //               key={item.id}
// // //               className={`admin-nav-item ${activePage === item.id ? "active" : ""}`}
// // //               onClick={() => setActivePage(item.id)}
// // //             >
// // //               <span className="admin-nav-icon">{item.icon}</span>
// // //               <span>{item.label}</span>
// // //             </button>
// // //           ))}
// // //         </nav>
// // //       </aside>

// // //       {/* ✅ Main Content Area */}
// // //       <main className="admin-main">
// // //         <header className="admin-topbar">
// // //           <div className="admin-breadcrumb">
// // //             <span>ClubPilot</span>
// // //             <span>/</span>
// // //             <strong>{pageTitles[activePage]}</strong>
// // //           </div>

// // //           <div className="admin-topbar-actions">
// // //             <span className="admin-role-label">Admin Workspace</span>
// // //             <button
// // //               className="admin-notification-btn"
// // //               title="Notifications"
// // //               onClick={() => setActivePage("overview")}
// // //             >
// // //               ♧
// // //               <span className="admin-notification-dot" />
// // //             </button>
// // //             <div className="admin-avatar admin-avatar-small">A</div>
// // //           </div>
// // //         </header>

// // //         <div className="admin-page-content">
// // //           {renderPage()}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default AdminDashboard;

// // import React, { useState } from "react";
// // import AdminOverview from "./AdminOverview";
// // import AdminEvents from "./AdminEvents";
// // import AdminSubmissions from "./AdminSubmissions";
// // import AdminDocuments from "./AdminDocuments";
// // import AdminWorkflow from "./AdminWorkflow";
// // import "./AdminDashboard.css";

// // const navigation = [
// //   { id: "overview", icon: "▦", label: "Overview" },
// //   { id: "events", icon: "▣", label: "Events" },
// //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// //   { id: "workflow", icon: "↗", label: "Workflow" },
// // ];

// // function AdminDashboard({ onLogout }) {
// //   const [activePage, setActivePage] = useState("overview");

// //   const pageTitles = {
// //     overview: "Overview",
// //     events: "Events",
// //     approvals: "Submissions & Approvals",
// //     documents: "Documents & Reports",
// //     workflow: "Workflow",
// //   };

// //   function renderPage() {
// //     switch (activePage) {
// //       case "overview": return <AdminOverview />;
// //       case "events": return <AdminEvents />;
// //       case "approvals": return <AdminSubmissions />;
// //       case "documents": return <AdminDocuments />;
// //       case "workflow": return <AdminWorkflow />;
// //       default: return <AdminOverview />;
// //     }
// //   }

// //   return (
// //     <div className="admin-layout">
// //       {/* ✅ Sidebar (Exact match with your screenshot) */}
// //       <aside className="admin-sidebar">
// //         <div className="admin-brand">
// //           <h2>Club<span>Pilot</span></h2>
// //         </div>

// //         <div className="admin-sidebar-label">WORKSPACE</div>

// //         <nav className="admin-navigation">
// //           {navigation.map((item) => (
// //             <button
// //               key={item.id}
// //               className={`admin-nav-item ${activePage === item.id ? "active" : ""}`}
// //               onClick={() => setActivePage(item.id)}
// //             >
// //               <span className="admin-nav-icon">{item.icon}</span>
// //               <span>{item.label}</span>
// //             </button>
// //           ))}
// //         </nav>
// //       </aside>

// //       {/* ✅ Main Content Area */}
// //       <main className="admin-main">
// //         <header className="admin-topbar">
// //           <div className="admin-breadcrumb">
// //             <span>ClubPilot</span>
// //             <span>/</span>
// //             <strong>{pageTitles[activePage]}</strong>
// //           </div>

// //           <div className="admin-topbar-actions">
// //             <span className="admin-role-label">Admin Workspace</span>
// //             <button
// //               className="admin-notification-btn"
// //               title="Notifications"
// //               onClick={() => setActivePage("overview")}
// //             >
// //               ♧
// //               <span className="admin-notification-dot" />
// //             </button>
// //             <div className="admin-avatar admin-avatar-small">A</div>
// //           </div>
// //         </header>

// //         <div className="admin-page-content">
// //           {renderPage()}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default AdminDashboard;

// import React, { useState } from "react";
// import AdminOverview from "./AdminOverview";
// import AdminEvents from "./AdminEvents";
// import AdminSubmissions from "./AdminSubmissions";
// import AdminDocuments from "./AdminDocuments";
// import AdminWorkflow from "./AdminWorkflow";
// import "./AdminDashboard.css";

// const navigation = [
//   { id: "overview", icon: "fa-solid fa-table-cells-large", label: "Overview" },
//   { id: "events", icon: "fa-solid fa-calendar-check", label: "Events" },
//   { id: "approvals", icon: "fa-solid fa-list-check", label: "Submissions & Approvals" },
//   { id: "documents", icon: "fa-solid fa-file-lines", label: "Documents & Reports" },
//   { id: "workflow", icon: "fa-solid fa-arrow-trend-up", label: "Workflow" },
// ];

// function AdminDashboard({ onLogout }) {
//   const [activePage, setActivePage] = useState("overview");

//   const pageTitles = {
//     overview: "Overview",
//     events: "Events",
//     approvals: "Submissions & Approvals",
//     documents: "Documents & Reports",
//     workflow: "Workflow",
//   };

//   function renderPage() {
//     switch (activePage) {
//       case "overview": return <AdminOverview />;
//       case "events": return <AdminEvents />;
//       case "approvals": return <AdminSubmissions />;
//       case "documents": return <AdminDocuments />;
//       case "workflow": return <AdminWorkflow />;
//       default: return <AdminOverview />;
//     }
//   }

//   return (
//     <div className="admin-layout">
//       {/* ✅ Sidebar (Exact same classes as EventSidebar) */}
//       <aside className="sidebar">
//         <div className="logo-box">
//           <div className="brand-name">Club<span>Pilot</span></div>
//         </div>

//         {navigation.map((item) => (
//           <a
//             key={item.id}
//             href="#"
//             className={`nav-link ${activePage === item.id ? "active" : ""}`}
//             onClick={(e) => {
//               e.preventDefault();
//               setActivePage(item.id);
//             }}
//           >
//             <i className={item.icon}></i> {item.label}
//           </a>
//         ))}

//         <div className="divider"></div>

//         <a href="#" className="nav-link" onClick={onLogout}>
//           <i className="fa-solid fa-right-from-bracket"></i> Logout
//         </a>
//       </aside>

//       {/* ✅ Main Content */}
//       <main className="admin-main">
//         <header className="admin-topbar">
//           <div className="admin-breadcrumb">
//             <span>ClubPilot</span>
//             <span>/</span>
//             <strong>{pageTitles[activePage]}</strong>
//           </div>

//           <div className="admin-topbar-actions">
//             <span className="admin-role-label">Admin Workspace</span>
//             <button
//               className="admin-notification-btn"
//               title="Notifications"
//               onClick={() => setActivePage("overview")}
//             >
//               <i className="fa-regular fa-bell"></i>
//               <span className="admin-notification-dot" />
//             </button>
//             <div className="admin-avatar admin-avatar-small">A</div>
//           </div>
//         </header>

//         <div className="admin-page-content">
//           {renderPage()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState } from "react";
import AdminOverview from "./AdminOverview";
import AdminEvents from "./AdminEvents";
import AdminSubmissions from "./AdminSubmissions";
import AdminDocuments from "./AdminDocuments";
import AdminWorkflow from "./AdminWorkflow";
import "./AdminDashboard.css";

const navigation = [
  { id: "overview", icon: "fa-solid fa-table-cells-large", label: "Overview" },
  { id: "events", icon: "fa-solid fa-calendar-check", label: "Events" },
  { id: "approvals", icon: "fa-solid fa-list-check", label: "Submissions & Approvals" },
  { id: "documents", icon: "fa-solid fa-file-lines", label: "Documents & Reports" },
  { id: "workflow", icon: "fa-solid fa-arrow-trend-up", label: "Workflow" },
];

function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("overview");

  const pageTitles = {
    overview: "Overview",
    events: "Events",
    approvals: "Submissions & Approvals",
    documents: "Documents & Reports",
    workflow: "Workflow",
  };

  function renderPage() {
    switch (activePage) {
      case "overview": return <AdminOverview />;
      case "events": return <AdminEvents />;
      case "approvals": return <AdminSubmissions />;
      case "documents": return <AdminDocuments />;
      case "workflow": return <AdminWorkflow />;
      default: return <AdminOverview />;
    }
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="logo-box">
          <div className="brand-name">Club<span>Pilot</span></div>
        </div>

        {navigation.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-link ${activePage === item.id ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.id);
            }}

            style={item.label === "Submissions & Approvals" ? { fontSize: "13px" } : {}}
          >
            <i className={item.icon}></i> {item.label}
          </a>
        ))}

        <div className="divider"></div>


        <a 
          href="/events" 
          className="nav-link" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.location.href = '/events'; 
          }}
        >
          <i className="fa-solid fa-house"></i> Go Back
        </a>
      </aside>


      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">
            <span>ClubPilot</span>
            <span>/</span>
            <strong>{pageTitles[activePage]}</strong>
          </div>

          <div className="admin-topbar-actions">
            <span className="admin-role-label">Admin Workspace</span>
            <button
              className="admin-notification-btn"
              title="Notifications"
              onClick={() => setActivePage("overview")}
            >
              <i className="fa-regular fa-bell"></i>
              <span className="admin-notification-dot" />
            </button>
            <div className="admin-avatar admin-avatar-small">A</div>
          </div>
        </header>

        <div className="admin-page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;