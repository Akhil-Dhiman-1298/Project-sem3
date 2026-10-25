import React, { useState } from "react";
import AdminOverview from "./AdminOverview";
import AdminEvents from "./AdminEvents";
import AdminSubmissions from "./AdminSubmissions";
import AdminDocuments from "./AdminDocuments";
import AdminWorkflow from "./AdminWorkflow";
import "./AdminDashboard.css";

// Reusable icons using inline SVG — no library required
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
    logo: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
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
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
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
  const [activePage, setActivePage] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotifications, setReadNotifications] = useState(false);

  const currentPage = pageDetails[activePage] || pageDetails.overview;

  // Placeholder notifications for the interface.
  // Connect these to real submission/event data later.
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

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <AdminIcon name="logo" size={27} />
          </div>

          <div className="admin-brand-text">
            <h2>ClubPilot</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="admin-sidebar-label">WORKSPACE</div>

        <nav className="admin-navigation" aria-label="Admin navigation">
          {navigationItems.map((item) => {
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="admin-nav-icon">
                  <AdminIcon name={item.icon} size={20} />
                </span>

                <span className="admin-nav-label">{item.label}</span>

                {isActive && (
                  <span className="admin-nav-arrow">
                    <AdminIcon name="chevron" size={16} />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom profile */}
        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>

            <div className="admin-profile-info">
              <strong>Club Admin</strong>
              <span>Administrator</span>
            </div>

            {typeof onLogout === "function" && (
              <button
                type="button"
                className="admin-logout-btn"
                onClick={onLogout}
                title="Log out"
                aria-label="Log out"
              >
                <AdminIcon name="logout" size={19} />
              </button>
            )}
          </div>
        </div>
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
        onClick={() =>
          setShowNotifications((previous) => !previous)
        }
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
      <strong className="admin-topbar-admin-name">
        Club Admin
      </strong>
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
