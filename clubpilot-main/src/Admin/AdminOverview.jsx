import React, { useContext } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminOverview() {
  const { submissions } = useContext(AdminContext);

  // Calculate dashboard statistics
  const totalSubmissions = submissions.length;

  const pendingSubmissions = submissions.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedSubmissions = submissions.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedSubmissions = submissions.filter(
    (item) => item.status === "Rejected"
  ).length;

  const approvedBudget = submissions
    .filter((item) => item.status === "Approved")
    .reduce((total, item) => total + Number(item.budget || 0), 0);

  // Show recent submissions first
  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <h1>Admin Overview</h1>
          <p>
            Monitor club activities, review submissions, and manage approvals.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>
          <p>Total Submissions</p>
          <h2>{totalSubmissions}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏳</div>
          <p>Pending Approvals</p>
          <h2>{pendingSubmissions}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>
          <p>Approved</p>
          <h2>{approvedSubmissions}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">❌</div>
          <p>Rejected</p>
          <h2>{rejectedSubmissions}</h2>
        </div>
      </div>

      {/* Approved Budget */}
      <div className="admin-budget-card">
        <div>
          <p>Total Approved Budget</p>
          <h2>₹{approvedBudget.toLocaleString("en-IN")}</h2>
          <span>Based on approved submissions</span>
        </div>

        <div className="admin-budget-icon">₹</div>
      </div>

      {/* Recent Submissions */}
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
                      <small className="admin-table-subtext">
                        {item.submittedBy}
                      </small>
                    </td>

                    <td>{item.club}</td>
                    <td>{item.type}</td>

                    <td>
                      ₹{Number(item.budget || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${item.status.toLowerCase()}`}
                      >
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