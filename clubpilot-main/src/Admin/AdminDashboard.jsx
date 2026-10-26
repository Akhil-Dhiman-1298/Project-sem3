// // // // // // // // // import React, { useState } from "react";
// // // // // // // // // import AdminOverview from "./AdminOverview";
// // // // // // // // // import AdminEvents from "./AdminEvents";
// // // // // // // // // import AdminSubmissions from "./AdminSubmissions";
// // // // // // // // // import AdminDocuments from "./AdminDocuments";
// // // // // // // // // import AdminWorkflow from "./AdminWorkflow";
// // // // // // // // // import "./AdminDashboard.css";

// // // // // // // // // const navigation = [
// // // // // // // // //   { id: "overview", icon: "▦", label: "Overview" },
// // // // // // // // //   { id: "events", icon: "▣", label: "Events" },
// // // // // // // // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // // // // // // // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // // // // // // // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // // // // // // // ];

// // // // // // // // // const initialActivities = [
// // // // // // // // //   {
// // // // // // // // //     id: 1,
// // // // // // // // //     title: "Event proposal submitted",
// // // // // // // // //     description:
// // // // // // // // //       "The Annual Cultural Fest proposal is waiting for your review.",
// // // // // // // // //     category: "Event Proposal",
// // // // // // // // //     time: "Recently",
// // // // // // // // //     status: "Pending",
// // // // // // // // //     icon: "▣",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 2,
// // // // // // // // //     title: "Budget approval required",
// // // // // // // // //     description:
// // // // // // // // //       "The Leader has submitted an estimated budget for an upcoming event.",
// // // // // // // // //     category: "Budget",
// // // // // // // // //     time: "Recently",
// // // // // // // // //     status: "Pending",
// // // // // // // // //     icon: "₹",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 3,
// // // // // // // // //     title: "Post-event report requested",
// // // // // // // // //     description:
// // // // // // // // //       "A report and supporting documents are required from the Leader.",
// // // // // // // // //     category: "Report",
// // // // // // // // //     time: "Recently",
// // // // // // // // //     status: "Action Required",
// // // // // // // // //     icon: "▤",
// // // // // // // // //   },
// // // // // // // // // ];

// // // // // // // // // function AdminDashboard({ onLogout }) {
// // // // // // // // //   const [activePage, setActivePage] = useState("overview");

// // // // // // // // //   const pageTitles = {
// // // // // // // // //     overview: "Overview",
// // // // // // // // //     events: "Events",
// // // // // // // // //     approvals: "Submissions & Approvals",
// // // // // // // // //     documents: "Documents & Reports",
// // // // // // // // //     workflow: "Workflow",
// // // // // // // // //   };

// // // // // // // // //   function renderPage() {
// // // // // // // // //   switch (activePage) {
// // // // // // // // //     case "overview":
// // // // // // // // //       return <AdminOverview />;

// // // // // // // // //     case "events":
// // // // // // // // //       return <AdminEvents />;

// // // // // // // // //     case "approvals":
// // // // // // // // //       return <AdminSubmissions />;

// // // // // // // // //     case "documents":
// // // // // // // // //       return <AdminDocuments />;

// // // // // // // // //     case "workflow":
// // // // // // // // //       return <AdminWorkflow />;

// // // // // // // // //     default:
// // // // // // // // //       return <AdminOverview />;
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // //   return (
// // // // // // // // //     <div className="admin-layout">
// // // // // // // // //       <aside className="admin-sidebar">
// // // // // // // // //         <div className="admin-brand">
// // // // // // // // //           <div className="admin-brand-icon">C</div>
// // // // // // // // //           <div>
// // // // // // // // //             <h2>ClubPilot</h2>
// // // // // // // // //             <span>Club Operations</span>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // // // // // // // //         <nav className="admin-navigation">
// // // // // // // // //           {navigation.map((item) => (
// // // // // // // // //             <button
// // // // // // // // //               key={item.id}
// // // // // // // // //               className={`admin-nav-item ${
// // // // // // // // //                 activePage === item.id ? "active" : ""
// // // // // // // // //               }`}
// // // // // // // // //               onClick={() => setActivePage(item.id)}
// // // // // // // // //             >
// // // // // // // // //               <span className="admin-nav-icon">{item.icon}</span>
// // // // // // // // //               <span>{item.label}</span>

// // // // // // // // //               {item.id === "approvals" && (
// // // // // // // // //                 <span className="admin-nav-count">3</span>
// // // // // // // // //               )}
// // // // // // // // //             </button>
// // // // // // // // //           ))}
// // // // // // // // //         </nav>

// // // // // // // // //         <div className="admin-sidebar-bottom">
// // // // // // // // //           <div className="admin-help-card">
// // // // // // // // //             <div className="admin-help-icon">?</div>
// // // // // // // // //             <h4>Need assistance?</h4>
// // // // // // // // //             <p>Manage your club approvals and records in one place.</p>
// // // // // // // // //           </div>

// // // // // // // // //           <div className="admin-profile">
// // // // // // // // //             <div className="admin-avatar">A</div>
// // // // // // // // //             <div className="admin-profile-info">
// // // // // // // // //               <strong>Club Admin</strong>
// // // // // // // // //               <span>Administrator</span>
// // // // // // // // //             </div>

// // // // // // // // //             {onLogout && (
// // // // // // // // //               <button
// // // // // // // // //                 className="admin-logout-btn"
// // // // // // // // //                 onClick={onLogout}
// // // // // // // // //                 title="Log out"
// // // // // // // // //               >
// // // // // // // // //                 ↗
// // // // // // // // //               </button>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </aside>

// // // // // // // // //       <main className="admin-main">
// // // // // // // // //         <header className="admin-topbar">
// // // // // // // // //           <div className="admin-breadcrumb">
// // // // // // // // //             <span>ClubPilot</span>
// // // // // // // // //             <span>/</span>
// // // // // // // // //             <strong>{pageTitles[activePage]}</strong>
// // // // // // // // //           </div>

// // // // // // // // //           <div className="admin-topbar-actions">
// // // // // // // // //             <span className="admin-role-label">Admin Workspace</span>
// // // // // // // // //             <button
// // // // // // // // //               className="admin-notification-btn"
// // // // // // // // //               title="Notifications"
// // // // // // // // //               onClick={() => setActivePage("overview")}
// // // // // // // // //             >
// // // // // // // // //               ♧
// // // // // // // // //               <span className="admin-notification-dot" />
// // // // // // // // //             </button>
// // // // // // // // //             <div className="admin-avatar admin-avatar-small">A</div>
// // // // // // // // //           </div>
// // // // // // // // //         </header>

// // // // // // // // //         <div className="admin-page-content">
// // // // // // // // //           {renderPage()}
// // // // // // // // //         </div>
// // // // // // // // //       </main>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // function AdminOverviewLegacy({ onNavigate }) {
// // // // // // // // //   const [activities] = useState(initialActivities);

// // // // // // // // //   const stats = [
// // // // // // // // //     {
// // // // // // // // //       label: "Total Clubs",
// // // // // // // // //       value: "1",
// // // // // // // // //       description: "Club under your supervision",
// // // // // // // // //       icon: "♧",
// // // // // // // // //       color: "purple",
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       label: "Pending Approvals",
// // // // // // // // //       value: "3",
// // // // // // // // //       description: "Items requiring your review",
// // // // // // // // //       icon: "☑",
// // // // // // // // //       color: "orange",
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       label: "Upcoming Events",
// // // // // // // // //       value: "4",
// // // // // // // // //       description: "Planned by your club",
// // // // // // // // //       icon: "▣",
// // // // // // // // //       color: "blue",
// // // // // // // // //     },
// // // // // // // // //   ];

// // // // // // // // //   return (
// // // // // // // // //     <div className="admin-overview">
// // // // // // // // //       <div className="admin-welcome">
// // // // // // // // //         <div>
// // // // // // // // //           <p className="admin-eyebrow">CLUB ADMINISTRATION</p>
// // // // // // // // //           <h1>Welcome back, Admin!</h1>
// // // // // // // // //           <p className="admin-welcome-description">
// // // // // // // // //             Keep track of club activities, event plans, and approvals.
// // // // // // // // //           </p>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="admin-date-chip">
// // // // // // // // //           <span>◷</span> Activity Centre
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       <section className="admin-stats-grid">
// // // // // // // // //         {stats.map((stat) => (
// // // // // // // // //           <article className="admin-stat-card" key={stat.label}>
// // // // // // // // //             <div className="admin-stat-top">
// // // // // // // // //               <span>{stat.label}</span>
// // // // // // // // //               <div className={`admin-stat-icon ${stat.color}`}>
// // // // // // // // //                 {stat.icon}
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             <h2>{stat.value}</h2>
// // // // // // // // //             <p>{stat.description}</p>
// // // // // // // // //           </article>
// // // // // // // // //         ))}
// // // // // // // // //       </section>

// // // // // // // // //       <section className="admin-activity-section">
// // // // // // // // //         <div className="admin-section-heading">
// // // // // // // // //           <div>
// // // // // // // // //             <h2>Activity & Attention</h2>
// // // // // // // // //             <p>
// // // // // // // // //               Important updates and actions that need your attention.
// // // // // // // // //             </p>
// // // // // // // // //           </div>

// // // // // // // // //           <span className="admin-pending-pill">
// // // // // // // // //             {activities.length} items
// // // // // // // // //           </span>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="admin-activity-list">
// // // // // // // // //           {activities.map((activity) => (
// // // // // // // // //             <article
// // // // // // // // //               className="admin-activity-item"
// // // // // // // // //               key={activity.id}
// // // // // // // // //             >
// // // // // // // // //               <div className="admin-activity-icon">
// // // // // // // // //                 {activity.icon}
// // // // // // // // //               </div>

// // // // // // // // //               <div className="admin-activity-details">
// // // // // // // // //                 <div className="admin-activity-title-row">
// // // // // // // // //                   <h3>{activity.title}</h3>
// // // // // // // // //                   <span
// // // // // // // // //                     className={`admin-status ${
// // // // // // // // //                       activity.status === "Pending"
// // // // // // // // //                         ? "pending"
// // // // // // // // //                         : "attention"
// // // // // // // // //                     }`}
// // // // // // // // //                   >
// // // // // // // // //                     {activity.status}
// // // // // // // // //                   </span>
// // // // // // // // //                 </div>

// // // // // // // // //                 <p>{activity.description}</p>

// // // // // // // // //                 <div className="admin-activity-meta">
// // // // // // // // //                   <span>{activity.category}</span>
// // // // // // // // //                   <span>•</span>
// // // // // // // // //                   <span>{activity.time}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <button
// // // // // // // // //                 className="admin-review-btn"
// // // // // // // // //                 onClick={() => onNavigate("approvals")}
// // // // // // // // //               >
// // // // // // // // //                 Review <span>→</span>
// // // // // // // // //               </button>
// // // // // // // // //             </article>
// // // // // // // // //           ))}
// // // // // // // // //         </div>

// // // // // // // // //         <button
// // // // // // // // //           className="admin-view-all"
// // // // // // // // //           onClick={() => onNavigate("approvals")}
// // // // // // // // //         >
// // // // // // // // //           View all submissions & approvals <span>→</span>
// // // // // // // // //         </button>
// // // // // // // // //       </section>

// // // // // // // // //       <section className="admin-info-banner">
// // // // // // // // //         <div className="admin-info-symbol">i</div>
// // // // // // // // //         <div>
// // // // // // // // //           <h3>Keep club records organised</h3>
// // // // // // // // //           <p>
// // // // // // // // //             Review event proposals, check budgets, and collect digital
// // // // // // // // //             copies of important documents from your club Leader.
// // // // // // // // //           </p>
// // // // // // // // //         </div>
// // // // // // // // //         <button onClick={() => onNavigate("workflow")}>
// // // // // // // // //           Request Documents <span>→</span>
// // // // // // // // //         </button>
// // // // // // // // //       </section>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default AdminDashboard;

// // // // // // // // import React, { useState } from "react";
// // // // // // // // import AdminOverview from "./AdminOverview";
// // // // // // // // import AdminEvents from "./AdminEvents";
// // // // // // // // import AdminSubmissions from "./AdminSubmissions";
// // // // // // // // import AdminDocuments from "./AdminDocuments";
// // // // // // // // import AdminWorkflow from "./AdminWorkflow";
// // // // // // // // import "./AdminDashboard.css";

// // // // // // // // const navigation = [
// // // // // // // //   { id: "overview", icon: "▦", label: "Overview" },
// // // // // // // //   { id: "events", icon: "▣", label: "Events" },
// // // // // // // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // // // // // // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // // // // // // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // // // // // // ];

// // // // // // // // function AdminDashboard({ onLogout }) {
// // // // // // // //   const [activePage, setActivePage] = useState("overview");

// // // // // // // //   const pageTitles = {
// // // // // // // //     overview: "Overview",
// // // // // // // //     events: "Events",
// // // // // // // //     approvals: "Submissions & Approvals",
// // // // // // // //     documents: "Documents & Reports",
// // // // // // // //     workflow: "Workflow",
// // // // // // // //   };

// // // // // // // //   function renderPage() {
// // // // // // // //     switch (activePage) {
// // // // // // // //       case "overview": return <AdminOverview />;
// // // // // // // //       case "events": return <AdminEvents />;
// // // // // // // //       case "approvals": return <AdminSubmissions />;
// // // // // // // //       case "documents": return <AdminDocuments />;
// // // // // // // //       case "workflow": return <AdminWorkflow />;
// // // // // // // //       default: return <AdminOverview />;
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="admin-layout">
// // // // // // // //       <aside className="admin-sidebar">
// // // // // // // //         {/* ✅ Brand Section (Matched with main sidebar) */}
// // // // // // // //         <div className="admin-brand">
// // // // // // // //           <h2>Club<span>Pilot</span></h2>
// // // // // // // //         </div>

// // // // // // // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // // // // // // //         <nav className="admin-navigation">
// // // // // // // //           {navigation.map((item) => (
// // // // // // // //             <button
// // // // // // // //               key={item.id}
// // // // // // // //               className={`admin-nav-item ${activePage === item.id ? "active" : ""}`}
// // // // // // // //               onClick={() => setActivePage(item.id)}
// // // // // // // //             >
// // // // // // // //               <span className="admin-nav-icon">{item.icon}</span>
// // // // // // // //               <span>{item.label}</span>
// // // // // // // //             </button>
// // // // // // // //           ))}
// // // // // // // //         </nav>

// // // // // // // //         <div className="admin-sidebar-bottom">
// // // // // // // //           <div className="admin-help-card">
// // // // // // // //             <div className="admin-help-icon">?</div>
// // // // // // // //             <h4>Need assistance?</h4>
// // // // // // // //             <p>Manage your club approvals and records in one place.</p>
// // // // // // // //           </div>

// // // // // // // //           <div className="admin-profile">
// // // // // // // //             <div className="admin-avatar">A</div>
// // // // // // // //             <div className="admin-profile-info">
// // // // // // // //               <strong>Club Admin</strong>
// // // // // // // //               <span>Administrator</span>
// // // // // // // //             </div>

// // // // // // // //             {onLogout && (
// // // // // // // //               <button className="admin-logout-btn" onClick={onLogout} title="Log out">
// // // // // // // //                 <i className="fa-solid fa-right-from-bracket"></i>
// // // // // // // //               </button>
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </aside>

// // // // // // // //       <main className="admin-main">
// // // // // // // //         <header className="admin-topbar">
// // // // // // // //           <div className="admin-breadcrumb">
// // // // // // // //             <span>ClubPilot</span>
// // // // // // // //             <span>/</span>
// // // // // // // //             <strong>{pageTitles[activePage]}</strong>
// // // // // // // //           </div>

// // // // // // // //           <div className="admin-topbar-actions">
// // // // // // // //             <span className="admin-role-label">Admin Workspace</span>
// // // // // // // //             <button
// // // // // // // //               className="admin-notification-btn"
// // // // // // // //               title="Notifications"
// // // // // // // //               onClick={() => setActivePage("overview")}
// // // // // // // //             >
// // // // // // // //               <i className="fa-regular fa-bell"></i>
// // // // // // // //               <span className="admin-notification-dot" />
// // // // // // // //             </button>
// // // // // // // //             <div className="admin-avatar admin-avatar-small">A</div>
// // // // // // // //           </div>
// // // // // // // //         </header>

// // // // // // // //         <div className="admin-page-content">
// // // // // // // //           {renderPage()}
// // // // // // // //         </div>
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default AdminDashboard;

// // // // // // // import React, { useState } from "react";
// // // // // // // import AdminOverview from "./AdminOverview";
// // // // // // // import AdminEvents from "./AdminEvents";
// // // // // // // import AdminSubmissions from "./AdminSubmissions";
// // // // // // // import AdminDocuments from "./AdminDocuments";
// // // // // // // import AdminWorkflow from "./AdminWorkflow";
// // // // // // // import "./AdminDashboard.css";

// // // // // // // const navigation = [
// // // // // // //   { id: "overview", icon: "▦", label: "Overview" },
// // // // // // //   { id: "events", icon: "▣", label: "Events" },
// // // // // // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // // // // // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // // // // // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // // // // // ];

// // // // // // // function AdminDashboard({ onLogout }) {
// // // // // // //   const [activePage, setActivePage] = useState("overview");

// // // // // // //   const pageTitles = {
// // // // // // //     overview: "Overview",
// // // // // // //     events: "Events",
// // // // // // //     approvals: "Submissions & Approvals",
// // // // // // //     documents: "Documents & Reports",
// // // // // // //     workflow: "Workflow",
// // // // // // //   };

// // // // // // //   function renderPage() {
// // // // // // //     switch (activePage) {
// // // // // // //       case "overview": return <AdminOverview />;
// // // // // // //       case "events": return <AdminEvents />;
// // // // // // //       case "approvals": return <AdminSubmissions />;
// // // // // // //       case "documents": return <AdminDocuments />;
// // // // // // //       case "workflow": return <AdminWorkflow />;
// // // // // // //       default: return <AdminOverview />;
// // // // // // //     }
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="admin-layout">
// // // // // // //       {/* ✅ Sidebar (Exact match with Screenshot) */}
// // // // // // //       <aside className="admin-sidebar">
// // // // // // //         <div className="admin-brand">
// // // // // // //           <h2>Club<span>Pilot</span></h2>
// // // // // // //         </div>

// // // // // // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // // // // // //         <nav className="admin-navigation">
// // // // // // //           {navigation.map((item) => (
// // // // // // //             <button
// // // // // // //               key={item.id}
// // // // // // //               className={`admin-nav-item ${activePage === item.id ? "active" : ""}`}
// // // // // // //               onClick={() => setActivePage(item.id)}
// // // // // // //             >
// // // // // // //               <span className="admin-nav-icon">{item.icon}</span>
// // // // // // //               <span>{item.label}</span>
// // // // // // //             </button>
// // // // // // //           ))}
// // // // // // //         </nav>
// // // // // // //       </aside>

// // // // // // //       {/* ✅ Main Content Area */}
// // // // // // //       <main className="admin-main">
// // // // // // //         <header className="admin-topbar">
// // // // // // //           <div className="admin-breadcrumb">
// // // // // // //             <span>ClubPilot</span>
// // // // // // //             <span>/</span>
// // // // // // //             <strong>{pageTitles[activePage]}</strong>
// // // // // // //           </div>

// // // // // // //           <div className="admin-topbar-actions">
// // // // // // //             <span className="admin-role-label">Admin Workspace</span>
// // // // // // //             <button
// // // // // // //               className="admin-notification-btn"
// // // // // // //               title="Notifications"
// // // // // // //               onClick={() => setActivePage("overview")}
// // // // // // //             >
// // // // // // //               ♧
// // // // // // //               <span className="admin-notification-dot" />
// // // // // // //             </button>
// // // // // // //             <div className="admin-avatar admin-avatar-small">A</div>
// // // // // // //           </div>
// // // // // // //         </header>

// // // // // // //         <div className="admin-page-content">
// // // // // // //           {renderPage()}
// // // // // // //         </div>
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default AdminDashboard;

// // // // // // import React, { useState } from "react";
// // // // // // import AdminOverview from "./AdminOverview";
// // // // // // import AdminEvents from "./AdminEvents";
// // // // // // import AdminSubmissions from "./AdminSubmissions";
// // // // // // import AdminDocuments from "./AdminDocuments";
// // // // // // import AdminWorkflow from "./AdminWorkflow";
// // // // // // import "./AdminDashboard.css";

// // // // // // const navigation = [
// // // // // //   { id: "overview", icon: "▦", label: "Overview" },
// // // // // //   { id: "events", icon: "▣", label: "Events" },
// // // // // //   { id: "approvals", icon: "☑", label: "Submissions & Approvals" },
// // // // // //   { id: "documents", icon: "▤", label: "Documents & Reports" },
// // // // // //   { id: "workflow", icon: "↗", label: "Workflow" },
// // // // // // ];

// // // // // // function AdminDashboard({ onLogout }) {
// // // // // //   const [activePage, setActivePage] = useState("overview");

// // // // // //   const pageTitles = {
// // // // // //     overview: "Overview",
// // // // // //     events: "Events",
// // // // // //     approvals: "Submissions & Approvals",
// // // // // //     documents: "Documents & Reports",
// // // // // //     workflow: "Workflow",
// // // // // //   };

// // // // // //   function renderPage() {
// // // // // //     switch (activePage) {
// // // // // //       case "overview": return <AdminOverview />;
// // // // // //       case "events": return <AdminEvents />;
// // // // // //       case "approvals": return <AdminSubmissions />;
// // // // // //       case "documents": return <AdminDocuments />;
// // // // // //       case "workflow": return <AdminWorkflow />;
// // // // // //       default: return <AdminOverview />;
// // // // // //     }
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="admin-layout">
// // // // // //       {/* ✅ Sidebar (Exact match with your screenshot) */}
// // // // // //       <aside className="admin-sidebar">
// // // // // //         <div className="admin-brand">
// // // // // //           <h2>Club<span>Pilot</span></h2>
// // // // // //         </div>

// // // // // //         <div className="admin-sidebar-label">WORKSPACE</div>

// // // // // //         <nav className="admin-navigation">
// // // // // //           {navigation.map((item) => (
// // // // // //             <button
// // // // // //               key={item.id}
// // // // // //               className={`admin-nav-item ${activePage === item.id ? "active" : ""}`}
// // // // // //               onClick={() => setActivePage(item.id)}
// // // // // //             >
// // // // // //               <span className="admin-nav-icon">{item.icon}</span>
// // // // // //               <span>{item.label}</span>
// // // // // //             </button>
// // // // // //           ))}
// // // // // //         </nav>
// // // // // //       </aside>

// // // // // //       {/* ✅ Main Content Area */}
// // // // // //       <main className="admin-main">
// // // // // //         <header className="admin-topbar">
// // // // // //           <div className="admin-breadcrumb">
// // // // // //             <span>ClubPilot</span>
// // // // // //             <span>/</span>
// // // // // //             <strong>{pageTitles[activePage]}</strong>
// // // // // //           </div>

// // // // // //           <div className="admin-topbar-actions">
// // // // // //             <span className="admin-role-label">Admin Workspace</span>
// // // // // //             <button
// // // // // //               className="admin-notification-btn"
// // // // // //               title="Notifications"
// // // // // //               onClick={() => setActivePage("overview")}
// // // // // //             >
// // // // // //               ♧
// // // // // //               <span className="admin-notification-dot" />
// // // // // //             </button>
// // // // // //             <div className="admin-avatar admin-avatar-small">A</div>
// // // // // //           </div>
// // // // // //         </header>

// // // // // //         <div className="admin-page-content">
// // // // // //           {renderPage()}
// // // // // //         </div>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default AdminDashboard;

// // // // // import React, { useState } from "react";
// // // // // import AdminOverview from "./AdminOverview";
// // // // // import AdminEvents from "./AdminEvents";
// // // // // import AdminSubmissions from "./AdminSubmissions";
// // // // // import AdminDocuments from "./AdminDocuments";
// // // // // import AdminWorkflow from "./AdminWorkflow";
// // // // // import "./AdminDashboard.css";

// // // // // const navigation = [
// // // // //   { id: "overview", icon: "fa-solid fa-table-cells-large", label: "Overview" },
// // // // //   { id: "events", icon: "fa-solid fa-calendar-check", label: "Events" },
// // // // //   { id: "approvals", icon: "fa-solid fa-list-check", label: "Submissions & Approvals" },
// // // // //   { id: "documents", icon: "fa-solid fa-file-lines", label: "Documents & Reports" },
// // // // //   { id: "workflow", icon: "fa-solid fa-arrow-trend-up", label: "Workflow" },
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
// // // // //     switch (activePage) {
// // // // //       case "overview": return <AdminOverview />;
// // // // //       case "events": return <AdminEvents />;
// // // // //       case "approvals": return <AdminSubmissions />;
// // // // //       case "documents": return <AdminDocuments />;
// // // // //       case "workflow": return <AdminWorkflow />;
// // // // //       default: return <AdminOverview />;
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div className="admin-layout">
// // // // //       {/* ✅ Sidebar (Exact same classes as EventSidebar) */}
// // // // //       <aside className="sidebar">
// // // // //         <div className="logo-box">
// // // // //           <div className="brand-name">Club<span>Pilot</span></div>
// // // // //         </div>

// // // // //         {navigation.map((item) => (
// // // // //           <a
// // // // //             key={item.id}
// // // // //             href="#"
// // // // //             className={`nav-link ${activePage === item.id ? "active" : ""}`}
// // // // //             onClick={(e) => {
// // // // //               e.preventDefault();
// // // // //               setActivePage(item.id);
// // // // //             }}
// // // // //           >
// // // // //             <i className={item.icon}></i> {item.label}
// // // // //           </a>
// // // // //         ))}

// // // // //         <div className="divider"></div>

// // // // //         <a href="#" className="nav-link" onClick={onLogout}>
// // // // //           <i className="fa-solid fa-right-from-bracket"></i> Logout
// // // // //         </a>
// // // // //       </aside>

// // // // //       {/* ✅ Main Content */}
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
// // // // //               <i className="fa-regular fa-bell"></i>
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

// // // // // export default AdminDashboard;

// // // // import React, { useState } from "react";
// // // // import AdminOverview from "./AdminOverview";
// // // // import AdminEvents from "./AdminEvents";
// // // // import AdminSubmissions from "./AdminSubmissions";
// // // // import AdminDocuments from "./AdminDocuments";
// // // // import AdminWorkflow from "./AdminWorkflow";
// // // // import "./AdminDashboard.css";

// // // // const navigation = [
// // // //   { id: "overview", icon: "fa-solid fa-table-cells-large", label: "Overview" },
// // // //   { id: "events", icon: "fa-solid fa-calendar-check", label: "Events" },
// // // //   { id: "approvals", icon: "fa-solid fa-list-check", label: "Submissions & Approvals" },
// // // //   { id: "documents", icon: "fa-solid fa-file-lines", label: "Documents & Reports" },
// // // //   { id: "workflow", icon: "fa-solid fa-arrow-trend-up", label: "Workflow" },
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
// // // //       <aside className="sidebar">
// // // //         <div className="logo-box">
// // // //           <div className="brand-name">Club<span>Pilot</span></div>
// // // //         </div>

// // // //         {navigation.map((item) => (
// // // //           <a
// // // //             key={item.id}
// // // //             href="#"
// // // //             className={`nav-link ${activePage === item.id ? "active" : ""}`}
// // // //             onClick={(e) => {
// // // //               e.preventDefault();
// // // //               setActivePage(item.id);
// // // //             }}

// // // //             style={item.label === "Submissions & Approvals" ? { fontSize: "13px" } : {}}
// // // //           >
// // // //             <i className={item.icon}></i> {item.label}
// // // //           </a>
// // // //         ))}

// // // //         <div className="divider"></div>


// // // //         <a 
// // // //           href="/events" 
// // // //           className="nav-link" 
// // // //           onClick={(e) => { 
// // // //             e.preventDefault(); 
// // // //             window.location.href = '/'; 
// // // //           }}
// // // //         >
// // // //           <i className="fa-solid fa-house"></i> Go Back
// // // //         </a>
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
// // // import { useTheme } from "../ThemeContext";  // 👈 ADDED
// // // import "./AdminDashboard.css";

// // // const navigation = [
// // //   { id: "overview", icon: "fa-solid fa-table-cells-large", label: "Overview" },
// // //   { id: "events", icon: "fa-solid fa-calendar-check", label: "Events" },
// // //   { id: "approvals", icon: "fa-solid fa-list-check", label: "Submissions & Approvals" },
// // //   { id: "documents", icon: "fa-solid fa-file-lines", label: "Documents & Reports" },
// // //   { id: "workflow", icon: "fa-solid fa-arrow-trend-up", label: "Workflow" },
// // // ];

// // // function AdminDashboard({ onLogout }) {
// // //   const { darkMode } = useTheme();  // 👈 ADDED
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
// // //     <div className={`admin-layout ${darkMode ? "dark" : ""}`}>  {/* 👈 CHANGED */}
// // //       <aside className="sidebar">
// // //         <div className="logo-box">
// // //           <div className="brand-name">Club<span>Pilot</span></div>
// // //         </div>

// // //         {navigation.map((item) => (
// // //           <a
// // //             key={item.id}
// // //             href="#"
// // //             className={`nav-link ${activePage === item.id ? "active" : ""}`}
// // //             onClick={(e) => {
// // //               e.preventDefault();
// // //               setActivePage(item.id);
// // //             }}

// // //             style={item.label === "Submissions & Approvals" ? { fontSize: "13px" } : {}}
// // //           >
// // //             <i className={item.icon}></i> {item.label}
// // //           </a>
// // //         ))}

// // //         <div className="divider"></div>


// // //         <a 
// // //           href="/events" 
// // //           className="nav-link" 
// // //           onClick={(e) => { 
// // //             e.preventDefault(); 
// // //             window.location.href = '/'; 
// // //           }}
// // //         >
// // //           <i className="fa-solid fa-house"></i> Go Back
// // //         </a>
// // //       </aside>


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
// // //               <i className="fa-regular fa-bell"></i>
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

// // // Reusable icons using inline SVG — no library required
// // function AdminIcon({ name, size = 20 }) {
// //   const common = {
// //     width: size,
// //     height: size,
// //     viewBox: "0 0 24 24",
// //     fill: "none",
// //     stroke: "currentColor",
// //     strokeWidth: 1.8,
// //     strokeLinecap: "round",
// //     strokeLinejoin: "round",
// //     "aria-hidden": true,
// //   };

// //   const icons = {
// //     logo: (
// //       <>
// //         <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
// //         <path d="m9 12 2 2 4-4" />
// //       </>
// //     ),
// //     overview: (
// //       <>
// //         <rect x="3" y="3" width="8" height="8" rx="2" />
// //         <rect x="13" y="3" width="8" height="5" rx="2" />
// //         <rect x="13" y="10" width="8" height="11" rx="2" />
// //         <rect x="3" y="13" width="8" height="8" rx="2" />
// //       </>
// //     ),
// //     events: (
// //       <>
// //         <rect x="3" y="5" width="18" height="16" rx="2" />
// //         <path d="M16 3v4M8 3v4M3 10h18" />
// //         <path d="m9 15 2 2 4-4" />
// //       </>
// //     ),
// //     submissions: (
// //       <>
// //         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
// //         <path d="M14 2v6h6M8 13h8M8 17h5" />
// //         <path d="m8 9 1 1 2-2" />
// //       </>
// //     ),
// //     documents: (
// //       <>
// //         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
// //         <path d="M14 2v6h6M8 13h8M8 17h8" />
// //       </>
// //     ),
// //     workflow: (
// //       <>
// //         <rect x="3" y="3" width="7" height="5" rx="1" />
// //         <rect x="14" y="16" width="7" height="5" rx="1" />
// //         <rect x="14" y="3" width="7" height="5" rx="1" />
// //         <path d="M6.5 8v4h11V8M17.5 12v4" />
// //       </>
// //     ),
// //     bell: (
// //       <>
// //         <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
// //         <path d="M10 21h4" />
// //       </>
// //     ),
// //     user: (
// //       <>
// //         <circle cx="12" cy="8" r="4" />
// //         <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
// //       </>
// //     ),
// //     logout: (
// //       <>
// //         <path d="M10 17l5-5-5-5M15 12H3" />
// //         <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
// //       </>
// //     ),
// //     chevron: <path d="m9 18 6-6-6-6" />,
// //     check: <path d="m5 12 4 4L19 6" />,
// //     close: <path d="m18 6-12 12M6 6l12 12" />,
// //   };

// //   return (
// //     <svg {...common}>
// //       {icons[name] || icons.overview}
// //     </svg>
// //   );
// // }

// // const navigationItems = [
// //   { id: "overview", label: "Overview", icon: "overview" },
// //   { id: "events", label: "Events", icon: "events" },
// //   {
// //     id: "approvals",
// //     label: "Submissions & Approvals",
// //     icon: "submissions",
// //   },
// //   {
// //     id: "documents",
// //     label: "Documents & Reports",
// //     icon: "documents",
// //   },
// //   { id: "workflow", label: "Workflow", icon: "workflow" },
// // ];

// // const pageDetails = {
// //   overview: {
// //     title: "Overview",
// //     description: "Here's what's happening across your clubs today.",
// //   },
// //   events: {
// //     title: "Events",
// //     description: "View and manage your upcoming club events.",
// //   },
// //   approvals: {
// //     title: "Submissions & Approvals",
// //     description: "Review submissions and manage approval requests.",
// //   },
// //   documents: {
// //     title: "Documents & Reports",
// //     description: "Access and manage club documents and reports.",
// //   },
// //   workflow: {
// //     title: "Workflow",
// //     description: "Manage submission requests, tasks, and deadlines.",
// //   },
// // };

// // function AdminDashboard({ onLogout }) {
// //   const [activePage, setActivePage] = useState("overview");
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [readNotifications, setReadNotifications] = useState(false);

// //   const currentPage = pageDetails[activePage] || pageDetails.overview;

// //   // Placeholder notifications for the interface.
// //   // Connect these to real submission/event data later.
// //   const notifications = [
// //     {
// //       id: 1,
// //       title: "Review pending submissions",
// //       message: "Check event proposals and budget requests.",
// //     },
// //     {
// //       id: 2,
// //       title: "Upcoming club events",
// //       message: "Review your event schedule.",
// //     },
// //     {
// //       id: 3,
// //       title: "Documents and reports",
// //       message: "Check uploaded club documents.",
// //     },
// //   ];

// //   function renderPage() {
// //     switch (activePage) {
// //       case "overview":
// //         return <AdminOverview />;
// //       case "events":
// //         return <AdminEvents />;
// //       case "approvals":
// //         return <AdminSubmissions />;
// //       case "documents":
// //         return <AdminDocuments />;
// //       case "workflow":
// //         return <AdminWorkflow />;
// //       default:
// //         return <AdminOverview />;
// //     }
// //   }

// //   function handleNavigation(page) {
// //     setActivePage(page);
// //     setShowNotifications(false);
// //   }

// //   return (
// //     <div className="admin-layout">
// //       {/* Sidebar */}
// //       <aside className="admin-sidebar">
// //         <div className="admin-brand">
// //           <div className="admin-brand-icon">
// //             <AdminIcon name="logo" size={27} />
// //           </div>

// //           <div className="admin-brand-text">
// //             <h2>ClubPilot</h2>
// //             <span>Admin Panel</span>
// //           </div>
// //         </div>

// //         <div className="admin-sidebar-label">WORKSPACE</div>

// //         <nav className="admin-navigation" aria-label="Admin navigation">
// //           {navigationItems.map((item) => {
// //             const isActive = activePage === item.id;

// //             return (
// //               <button
// //                 key={item.id}
// //                 type="button"
// //                 className={`admin-nav-item ${
// //                   isActive ? "active" : ""
// //                 }`}
// //                 onClick={() => handleNavigation(item.id)}
// //                 aria-current={isActive ? "page" : undefined}
// //               >
// //                 <span className="admin-nav-icon">
// //                   <AdminIcon name={item.icon} size={20} />
// //                 </span>

// //                 <span className="admin-nav-label">{item.label}</span>

// //                 {isActive && (
// //                   <span className="admin-nav-arrow">
// //                     <AdminIcon name="chevron" size={16} />
// //                   </span>
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </nav>

// //         {/* Bottom profile */}
// //         <div className="admin-sidebar-bottom">
// //           <div className="admin-profile">
// //             <div className="admin-avatar">A</div>

// //             <div className="admin-profile-info">
// //               <strong>Club Admin</strong>
// //               <span>Administrator</span>
// //             </div>

// //             {typeof onLogout === "function" && (
// //               <button
// //                 type="button"
// //                 className="admin-logout-btn"
// //                 onClick={onLogout}
// //                 title="Log out"
// //                 aria-label="Log out"
// //               >
// //                 <AdminIcon name="logout" size={19} />
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main area */}
// //       <main className="admin-main">
// //         {/* Header */}
// // <header className="admin-topbar">
// //   <div className="admin-header-welcome">
// //     <h2>
// //       Welcome, Admin! You're viewing {currentPage.title}.
// //     </h2>

// //     <p>Here's what's happening in your club today.</p>
// //   </div>

// //   <div className="admin-topbar-actions">
// //     <div className="admin-notification-wrapper">
// //       <button
// //         type="button"
// //         className={`admin-notification-btn ${
// //           showNotifications ? "open" : ""
// //         }`}
// //         onClick={() =>
// //           setShowNotifications((previous) => !previous)
// //         }
// //         aria-label="Notifications"
// //         aria-expanded={showNotifications}
// //       >
// //         <AdminIcon name="bell" size={21} />

// //         {!readNotifications && (
// //           <span className="admin-notification-dot" />
// //         )}
// //       </button>

// //       {showNotifications && (
// //         <div className="admin-notification-dropdown">
// //           <div className="admin-notification-header">
// //             <div>
// //               <h3>Notifications</h3>
// //               <p>Your workspace updates</p>
// //             </div>

// //             <button
// //               type="button"
// //               className="admin-notification-close"
// //               onClick={() => setShowNotifications(false)}
// //               aria-label="Close notifications"
// //             >
// //               <AdminIcon name="close" size={18} />
// //             </button>
// //           </div>

// //           <div className="admin-notification-list">
// //             {notifications.map((notification) => (
// //               <div
// //                 className="admin-notification-item"
// //                 key={notification.id}
// //               >
// //                 <div className="admin-notification-item-icon">
// //                   <AdminIcon name="bell" size={17} />
// //                 </div>

// //                 <div>
// //                   <strong>{notification.title}</strong>
// //                   <p>{notification.message}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <button
// //             type="button"
// //             className="admin-mark-read-btn"
// //             onClick={() => setReadNotifications(true)}
// //           >
// //             <AdminIcon name="check" size={16} />
// //             Mark all as read
// //           </button>
// //         </div>
// //       )}
// //     </div>

// //     <div className="admin-topbar-divider" />

// //     <div className="admin-topbar-profile">
// //       <div className="admin-avatar admin-avatar-small">A</div>
// //       <strong className="admin-topbar-admin-name">
// //         Club Admin
// //       </strong>
// //     </div>
// //   </div>
// // </header>

// // {/* Page content */}
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

// // Reusable icons using inline SVG
// function AdminIcon({ name, size = 20 }) {
//   const common = {
//     width: size,
//     height: size,
//     viewBox: "0 0 24 24",
//     fill: "none",
//     stroke: "currentColor",
//     strokeWidth: 1.8,
//     strokeLinecap: "round",
//     strokeLinejoin: "round",
//     "aria-hidden": true,
//   };

//   const icons = {
//     overview: (
//       <>
//         <rect x="3" y="3" width="8" height="8" rx="2" />
//         <rect x="13" y="3" width="8" height="5" rx="2" />
//         <rect x="13" y="10" width="8" height="11" rx="2" />
//         <rect x="3" y="13" width="8" height="8" rx="2" />
//       </>
//     ),
//     events: (
//       <>
//         <rect x="3" y="5" width="18" height="16" rx="2" />
//         <path d="M16 3v4M8 3v4M3 10h18" />
//         <path d="m9 15 2 2 4-4" />
//       </>
//     ),
//     submissions: (
//       <>
//         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
//         <path d="M14 2v6h6M8 13h8M8 17h5" />
//         <path d="m8 9 1 1 2-2" />
//       </>
//     ),
//     documents: (
//       <>
//         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
//         <path d="M14 2v6h6M8 13h8M8 17h8" />
//       </>
//     ),
//     workflow: (
//       <>
//         <rect x="3" y="3" width="7" height="5" rx="1" />
//         <rect x="14" y="16" width="7" height="5" rx="1" />
//         <rect x="14" y="3" width="7" height="5" rx="1" />
//         <path d="M6.5 8v4h11V8M17.5 12v4" />
//       </>
//     ),
//     bell: (
//       <>
//         <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
//         <path d="M10 21h4" />
//       </>
//     ),
//     // ✅ Naya Home Icon add kiya
//     home: (
//       <>
//         <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//         <polyline points="9 22 9 12 15 12 15 22" />
//       </>
//     ),
//     chevron: <path d="m9 18 6-6-6-6" />,
//     check: <path d="m5 12 4 4L19 6" />,
//     close: <path d="m18 6-12 12M6 6l12 12" />,
//   };

//   return (
//     <svg {...common}>
//       {icons[name] || icons.overview}
//     </svg>
//   );
// }

// const navigationItems = [
//   { id: "overview", label: "Overview", icon: "overview" },
//   { id: "events", label: "Events", icon: "events" },
//   {
//     id: "approvals",
//     label: "Submissions & Approvals",
//     icon: "submissions",
//   },
//   {
//     id: "documents",
//     label: "Documents & Reports",
//     icon: "documents",
//   },
//   { id: "workflow", label: "Workflow", icon: "workflow" },
// ];

// const pageDetails = {
//   overview: {
//     title: "Overview",
//     description: "Here's what's happening across your clubs today.",
//   },
//   events: {
//     title: "Events",
//     description: "View and manage your upcoming club events.",
//   },
//   approvals: {
//     title: "Submissions & Approvals",
//     description: "Review submissions and manage approval requests.",
//   },
//   documents: {
//     title: "Documents & Reports",
//     description: "Access and manage club documents and reports.",
//   },
//   workflow: {
//     title: "Workflow",
//     description: "Manage submission requests, tasks, and deadlines.",
//   },
// };

// function AdminDashboard({ onLogout }) {
//   const [activePage, setActivePage] = useState("overview");
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [readNotifications, setReadNotifications] = useState(false);

//   const currentPage = pageDetails[activePage] || pageDetails.overview;

//   const notifications = [
//     {
//       id: 1,
//       title: "Review pending submissions",
//       message: "Check event proposals and budget requests.",
//     },
//     {
//       id: 2,
//       title: "Upcoming club events",
//       message: "Review your event schedule.",
//     },
//     {
//       id: 3,
//       title: "Documents and reports",
//       message: "Check uploaded club documents.",
//     },
//   ];

//   function renderPage() {
//     switch (activePage) {
//       case "overview":
//         return <AdminOverview />;
//       case "events":
//         return <AdminEvents />;
//       case "approvals":
//         return <AdminSubmissions />;
//       case "documents":
//         return <AdminDocuments />;
//       case "workflow":
//         return <AdminWorkflow />;
//       default:
//         return <AdminOverview />;
//     }
//   }

//   function handleNavigation(page) {
//     setActivePage(page);
//     setShowNotifications(false);
//   }

//   // ✅ Home page pe bhejne ke liye function
//   const goToHome = () => {
//     window.location.href = '/';
//   };

//   return (
//     <div className="admin-layout">
      
//       {/* ✅ PURANA SIDEBAR (EventSidebar style) */}
//       <aside className="sidebar">
//         <div className="logo-box">
//           <div className="brand-name">Club<span>Pilot</span></div>
//         </div>

//         {navigationItems.map((item) => (
//           <a
//             key={item.id}
//             href="#"
//             className={`nav-link ${activePage === item.id ? "active" : ""}`}
//             onClick={(e) => {
//               e.preventDefault();
//               handleNavigation(item.id);
//             }}
//             style={item.label === "Submissions & Approvals" ? { fontSize: "13px" } : {}}
//           >
//             <AdminIcon name={item.icon} size={18} /> {item.label}
//           </a>
//         ))}

//         <div className="divider"></div>

//         {/* ✅ Go Back to Home Button (Logout ki jagah) */}
//         <a
//           href="/"
//           className="nav-link"
//           onClick={(e) => {
//             e.preventDefault();
//             goToHome();
//           }}
//         >
//           <AdminIcon name="home" size={18} /> Go Back to Home
//         </a>
//       </aside>

//       {/* Main area */}
//       <main className="admin-main">
//         {/* Header */}
//         <header className="admin-topbar">
//           <div className="admin-header-welcome">
//             <h2>
//               Welcome, Admin! You're viewing {currentPage.title}.
//             </h2>
//             <p>Here's what's happening in your club today.</p>
//           </div>

//           <div className="admin-topbar-actions">
//             <div className="admin-notification-wrapper">
//               <button
//                 type="button"
//                 className={`admin-notification-btn ${
//                   showNotifications ? "open" : ""
//                 }`}
//                 onClick={() => setShowNotifications((previous) => !previous)}
//                 aria-label="Notifications"
//                 aria-expanded={showNotifications}
//               >
//                 <AdminIcon name="bell" size={21} />
//                 {!readNotifications && (
//                   <span className="admin-notification-dot" />
//                 )}
//               </button>

//               {showNotifications && (
//                 <div className="admin-notification-dropdown">
//                   <div className="admin-notification-header">
//                     <div>
//                       <h3>Notifications</h3>
//                       <p>Your workspace updates</p>
//                     </div>
//                     <button
//                       type="button"
//                       className="admin-notification-close"
//                       onClick={() => setShowNotifications(false)}
//                       aria-label="Close notifications"
//                     >
//                       <AdminIcon name="close" size={18} />
//                     </button>
//                   </div>

//                   <div className="admin-notification-list">
//                     {notifications.map((notification) => (
//                       <div
//                         className="admin-notification-item"
//                         key={notification.id}
//                       >
//                         <div className="admin-notification-item-icon">
//                           <AdminIcon name="bell" size={17} />
//                         </div>
//                         <div>
//                           <strong>{notification.title}</strong>
//                           <p>{notification.message}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     type="button"
//                     className="admin-mark-read-btn"
//                     onClick={() => setReadNotifications(true)}
//                   >
//                     <AdminIcon name="check" size={16} />
//                     Mark all as read
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="admin-topbar-divider" />

//             <div className="admin-topbar-profile">
//               <div className="admin-avatar admin-avatar-small">A</div>
//               <strong className="admin-topbar-admin-name">Club Admin</strong>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
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
import { useTheme } from "../ThemeContext"; // 👈 Dark Mode ke liye import
import "./AdminDashboard.css";

// Reusable icons using inline SVG
function AdminIcon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    overview: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="10" width="8" height="11" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
      </>
    ),
    events: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
    submissions: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
        <path d="m8 9 1 1 2-2" />
      </>
    ),
    documents: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </>
    ),
    workflow: (
      <>
        <rect x="3" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="16" width="7" height="5" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <path d="M6.5 8v4h11V8M17.5 12v4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    home: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return (
    <svg {...common}>
      {icons[name] || icons.overview}
    </svg>
  );
}

const navigationItems = [
  { id: "overview", label: "Overview", icon: "overview" },
  { id: "events", label: "Events", icon: "events" },
  {
    id: "approvals",
    label: "Submissions & Approvals",
    icon: "submissions",
  },
  {
    id: "documents",
    label: "Documents & Reports",
    icon: "documents",
  },
  { id: "workflow", label: "Workflow", icon: "workflow" },
];

const pageDetails = {
  overview: {
    title: "Overview",
    description: "Here's what's happening across your clubs today.",
  },
  events: {
    title: "Events",
    description: "View and manage your upcoming club events.",
  },
  approvals: {
    title: "Submissions & Approvals",
    description: "Review submissions and manage approval requests.",
  },
  documents: {
    title: "Documents & Reports",
    description: "Access and manage club documents and reports.",
  },
  workflow: {
    title: "Workflow",
    description: "Manage submission requests, tasks, and deadlines.",
  },
};

function AdminDashboard({ onLogout }) {
  const { darkMode } = useTheme(); // 👈 Context se darkMode nikal liya
  const [activePage, setActivePage] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotifications, setReadNotifications] = useState(false);

  const currentPage = pageDetails[activePage] || pageDetails.overview;

  const notifications = [
    {
      id: 1,
      title: "Review pending submissions",
      message: "Check event proposals and budget requests.",
    },
    {
      id: 2,
      title: "Upcoming club events",
      message: "Review your event schedule.",
    },
    {
      id: 3,
      title: "Documents and reports",
      message: "Check uploaded club documents.",
    },
  ];

  function renderPage() {
    switch (activePage) {
      case "overview":
        return <AdminOverview />;
      case "events":
        return <AdminEvents />;
      case "approvals":
        return <AdminSubmissions />;
      case "documents":
        return <AdminDocuments />;
      case "workflow":
        return <AdminWorkflow />;
      default:
        return <AdminOverview />;
    }
  }

  function handleNavigation(page) {
    setActivePage(page);
    setShowNotifications(false);
  }

  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    // 👈 Yahan dynamic dark class laga di hai
    <div className={`admin-layout ${darkMode ? "dark" : ""}`}>
      
      {/* PURANA SIDEBAR (EventSidebar style) */}
      <aside className="sidebar">
        <div className="logo-box">
          <div className="brand-name">Club<span>Pilot</span></div>
        </div>

        {navigationItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-link ${activePage === item.id ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.id);
            }}
            style={item.label === "Submissions & Approvals" ? { fontSize: "13px" } : {}}
          >
            <AdminIcon name={item.icon} size={18} /> {item.label}
          </a>
        ))}

        <div className="divider"></div>

        {/* Go Back to Home Button */}
        <a
          href="/"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            goToHome();
          }}
        >
          <AdminIcon name="home" size={18} /> Go Back to Home
        </a>
      </aside>

      {/* Main area */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-topbar">
          <div className="admin-header-welcome">
            <h2>
              Welcome, Admin! You're viewing {currentPage.title}.
            </h2>
            <p>Here's what's happening in your club today.</p>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-notification-wrapper">
              <button
                type="button"
                className={`admin-notification-btn ${
                  showNotifications ? "open" : ""
                }`}
                onClick={() => setShowNotifications((previous) => !previous)}
                aria-label="Notifications"
                aria-expanded={showNotifications}
              >
                <AdminIcon name="bell" size={21} />
                {!readNotifications && (
                  <span className="admin-notification-dot" />
                )}
              </button>

              {showNotifications && (
                <div className="admin-notification-dropdown">
                  <div className="admin-notification-header">
                    <div>
                      <h3>Notifications</h3>
                      <p>Your workspace updates</p>
                    </div>
                    <button
                      type="button"
                      className="admin-notification-close"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                    >
                      <AdminIcon name="close" size={18} />
                    </button>
                  </div>

                  <div className="admin-notification-list">
                    {notifications.map((notification) => (
                      <div
                        className="admin-notification-item"
                        key={notification.id}
                      >
                        <div className="admin-notification-item-icon">
                          <AdminIcon name="bell" size={17} />
                        </div>
                        <div>
                          <strong>{notification.title}</strong>
                          <p>{notification.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="admin-mark-read-btn"
                    onClick={() => setReadNotifications(true)}
                  >
                    <AdminIcon name="check" size={16} />
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            <div className="admin-topbar-divider" />

            <div className="admin-topbar-profile">
              <div className="admin-avatar admin-avatar-small">A</div>
              <strong className="admin-topbar-admin-name">Club Admin</strong>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="admin-page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;