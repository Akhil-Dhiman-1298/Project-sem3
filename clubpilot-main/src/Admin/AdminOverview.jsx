
import React, { useContext, useMemo } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminOverview() {
  const { submissions = [] } = useContext(AdminContext);

  const totalClubs = new Set(
    submissions.map((item) => item.club).filter(Boolean)
  ).size;

  const pendingCount = submissions.filter(
    (item) => item.status === "Pending"
  ).length;

  const upcomingEvents = submissions.filter((item) => {
    if (item.type !== "Event Proposal") return false;

    const date = String(
      item.eventDate || item.event_date || item.date || ""
    ).slice(0, 10);

    return /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      date >= new Date().toLocaleDateString("en-CA");
  }).length;

  const recentActivity = useMemo(() => {
    return [...submissions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [submissions]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsed = new Date(date + "T00:00:00");

    return Number.isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <div className="admin-overview redesigned-overview">
      <div className="admin-page-heading">
        <div>
          <h1>Hello Admin,</h1>
          <p>Here's what's happening with your club today.</p>
        </div>
      </div>

      <div className="admin-stats-grid overview-summary-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-purple">
            
<svg
  viewBox="0 0 24 24"
  width="23"
  height="23"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="10" cy="7" r="4" />
  <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
</svg>

          </div>
          <div>
            <p>Total Clubs</p>
            <h2>{totalClubs}</h2>
            <span className="overview-stat-note">
              Represented in submissions
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-orange">

<svg
  viewBox="0 0 24 24"
  width="23"
  height="23"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="12" r="9" />
  <path d="M12 7v5l3 2" />
  <path d="m16 3 2 2" />
</svg>
          </div>
          <div>
            <p>Pending Approvals</p>
            <h2>{pendingCount}</h2>
            <span className="overview-stat-note">
              Awaiting admin review
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-blue">

<svg
  viewBox="0 0 24 24"
  width="23"
  height="23"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <rect x="3" y="5" width="18" height="16" rx="2" />
  <path d="M16 3v4M8 3v4M3 10h18" />
  <path d="m9 15 2 2 4-4" />
</svg>
          </div>
          <div>
            <p>Upcoming Events</p>
            <h2>{upcomingEvents}</h2>
            <span className="overview-stat-note">
              Based on available event dates
            </span>
          </div>
        </div>
      </div>

      <section className="admin-section-card overview-activity">
        <div className="admin-section-heading">
          <div>
            <h2>Recent Activity / Notifications</h2>
            <p>Latest submissions and their current review status.</p>
          </div>
          <span className="overview-total">
            {submissions.length} submissions
          </span>
        </div>

        {recentActivity.length === 0 ? (
          <div className="admin-empty-state">
            <p>No activity available yet.</p>
          </div>
        ) : (
          <div className="overview-activity-list">
            {recentActivity.map((item) => (
              <div className="overview-activity-row" key={item.id}>
                <div className="overview-activity-icon">
                  <i
                    className={
                      item.type === "Event Proposal"
                        ? "fa-regular fa-calendar"
                        : "fa-regular fa-file-lines"
                    }
                  />
                </div>

                <div className="overview-activity-details">
                  <strong>{item.title}</strong>
                  <p>
                    {item.type} · {item.club}
                  </p>
                  <span>
                    Submitted by {item.submittedBy || "Unknown"} ·{" "}
                    {formatDate(item.date)}
                  </span>
                </div>

                <span
                  className={`admin-status-badge ${
                    (item.status || "Pending").toLowerCase()
                  }`}
                >
                  {item.status || "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminOverview;
