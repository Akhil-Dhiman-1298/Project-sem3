import React, { useContext, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminSubmissions() {
  const { submissions, updateStatus } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Search and filter submissions
  const filteredSubmissions = submissions.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.club.toLowerCase().includes(search) ||
      item.submittedBy.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchesType =
      typeFilter === "All" || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Approve or reject a submission
  function handleStatusChange(id, newStatus) {
    if (typeof updateStatus !== "function") {
      alert("Please check updateStatus in AdminContext.jsx.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus.toLowerCase()} this submission?`
    );

    if (confirmed) {
      updateStatus(id, newStatus);
    }
  }

  const pendingCount = submissions.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = submissions.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedCount = submissions.filter(
    (item) => item.status === "Rejected"
  ).length;

  return (
    <div className="admin-overview">
      {/* Page heading */}
      <div className="admin-page-heading">
        <div>
          <h1>Submissions & Approvals</h1>
          <p>
            Review event proposals and budget requests submitted by club leaders.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>
          <p>Total Submissions</p>
          <h2>{submissions.length}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏳</div>
          <p>Pending</p>
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

      {/* Submission table */}
      <div className="admin-section-card">
        <div className="admin-section-heading">
          <div>
            <h2>All Submissions</h2>
            <p>Manage requests and track their approval status.</p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="admin-event-controls">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by title, club or leader..."
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

          <select
            className="admin-filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Event Proposal">Event Proposal</option>
            <option value="Budget Request">Budget Request</option>
          </select>
        </div>

        {/* Results */}
        {filteredSubmissions.length === 0 ? (
          <div className="admin-empty-state">
            <p>No submissions found.</p>
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
                  <th>Date</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <small className="admin-table-subtext">
                        {item.description}
                      </small>
                    </td>

                    <td>{item.club}</td>
                    <td>{item.type}</td>
                    <td>{item.submittedBy}</td>
                    <td>{item.date}</td>

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

                    <td>
                      {item.status === "Pending" ? (
                        <div className="admin-action-buttons">
                          <button
                            type="button"
                            className="admin-approve-btn"
                            onClick={() =>
                              handleStatusChange(item.id, "Approved")
                            }
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            className="admin-reject-btn"
                            onClick={() =>
                              handleStatusChange(item.id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="admin-action-complete">
                          Reviewed
                        </span>
                      )}
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

export default AdminSubmissions;