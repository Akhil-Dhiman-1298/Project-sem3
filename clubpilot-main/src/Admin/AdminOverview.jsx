import React, { useContext } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

// Professional SVG Icons
const Icons = {
  document: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  check: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  cross: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  )
};

function AdminOverview() {
  const { submissions } = useContext(AdminContext);

  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter((item) => item.status === "Pending").length;
  const approvedSubmissions = submissions.filter((item) => item.status === "Approved").length;
  const rejectedSubmissions = submissions.filter((item) => item.status === "Rejected").length;

  const approvedBudget = submissions
    .filter((item) => item.status === "Approved")
    .reduce((total, item) => total + Number(item.budget || 0), 0);

  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <h1>Admin Overview</h1>
          <p>Monitor club activities, review submissions, and manage approvals.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-purple">{Icons.document}</div>
          <p>Total Submissions</p>
          <h2>{totalSubmissions}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-orange">{Icons.clock}</div>
          <p>Pending Approvals</p>
          <h2>{pendingSubmissions}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-green">{Icons.check}</div>
          <p>Approved</p>
          <h2>{approvedSubmissions}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-red">{Icons.cross}</div>
          <p>Rejected</p>
          <h2>{rejectedSubmissions}</h2>
        </div>
      </div>

      <div className="admin-budget-card">
        <div>
          <p>Total Approved Budget</p>
          <h2>₹{approvedBudget.toLocaleString("en-IN")}</h2>
          <span>Based on approved submissions</span>
        </div>
        <div className="admin-budget-icon">₹</div>
      </div>

      <div className="admin-section-card">
        <div className="admin-section-heading">
          <div>
            <h2>Recent Submissions</h2>
            <p>Latest event proposals and budget requests</p>
          </div>
        </div>

        {recentSubmissions.length === 0 ? (
          <div className="admin-empty-state">
            <p>No submissions available yet.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submission</th>
                  <th>Club</th>
                  <th>Type</th>
                  <th>Budget</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <small className="admin-table-subtext">{item.submittedBy}</small>
                    </td>
                    <td>{item.club}</td>
                    <td>{item.type}</td>
                    <td>₹{Number(item.budget || 0).toLocaleString("en-IN")}</td>
                    <td>
                      <span className={`admin-status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOverview;