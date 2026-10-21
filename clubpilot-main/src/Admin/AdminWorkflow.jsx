
import React, { useContext, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminWorkflow() {
  const { submissions } = useContext(AdminContext);

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate workflow statistics
  const pendingCount = submissions.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = submissions.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedCount = submissions.filter(
    (item) => item.status === "Rejected"
  ).length;

  // Search and filter submissions
  const filteredSubmissions = submissions.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.club.toLowerCase().includes(search) ||
      item.submittedBy.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function getStatusDescription(status) {
    if (status === "Pending") {
      return "Waiting for admin review";
    }

    if (status === "Approved") {
      return "Submission approved";
    }

    if (status === "Rejected") {
      return "Submission rejected";
    }

    return "Unknown status";
  }

  return (
    <div className="admin-overview">
      {/* Page heading */}
      <div className="admin-page-heading">
        <div>
          <h1>Approval Workflow</h1>
          <p>
            Track the progress of event proposals and budget requests.
          </p>
        </div>
      </div>

      {/* Workflow statistics */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>
          <p>Total Requests</p>
          <h2>{submissions.length}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏳</div>
          <p>Awaiting Review</p>
          <h2>{pendingCount}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>
          <p>Approved</p>
          <h2>{approvedCount}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">❌</div>
          <p>Rejected</p>
          <h2>{rejectedCount}</h2>
        </div>
      </div>

      {/* Workflow progress */}
      <div className="admin-section-card">
        <div className="admin-section-heading">
          <div>
            <h2>Workflow Progress</h2>
            <p>Overview of the current approval stages.</p>
          </div>
        </div>

        <div className="admin-workflow-progress">
          <div className="admin-progress-item">
            <div className="admin-progress-label">
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>

            <div className="admin-progress-track">
              <div
                className="admin-progress-fill pending-fill"
                style={{
                  width: `${
                    submissions.length
                      ? (pendingCount / submissions.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="admin-progress-item">
            <div className="admin-progress-label">
              <span>Approved</span>
              <strong>{approvedCount}</strong>
            </div>

            <div className="admin-progress-track">
              <div
                className="admin-progress-fill approved-fill"
                style={{
                  width: `${
                    submissions.length
                      ? (approvedCount / submissions.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="admin-progress-item">
            <div className="admin-progress-label">
              <span>Rejected</span>
              <strong>{rejectedCount}</strong>
            </div>

            <div className="admin-progress-track">
              <div
                className="admin-progress-fill rejected-fill"
                style={{
                  width: `${
                    submissions.length
                      ? (rejectedCount / submissions.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submission workflow table */}
      <div className="admin-section-card">
        <div className="admin-section-heading">
          <div>
            <h2>Submission Tracking</h2>
            <p>View the current stage of each request.</p>
          </div>
        </div>

        <div className="admin-event-controls">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="admin-empty-state">
            <p>No submissions match your search.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submission</th>
                  <th>Club</th>
                  <th>Type</th>
                  <th>Submitted By</th>
                  <th>Current Stage</th>
                  <th>Workflow Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <small className="admin-table-subtext">
                        {item.date}
                      </small>
                    </td>

                    <td>{item.club}</td>
                    <td>{item.type}</td>
                    <td>{item.submittedBy}</td>

                    <td>
                      {item.status === "Pending"
                        ? "Admin Review"
                        : "Review Completed"}
                    </td>

                    <td>
                      <div className="admin-workflow-status">
                        <span
                          className={`admin-status-badge ${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>

                        <small className="admin-table-subtext">
                          {getStatusDescription(item.status)}
                        </small>
                      </div>
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

export default AdminWorkflow;