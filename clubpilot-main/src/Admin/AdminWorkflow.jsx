import React, { useContext, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminWorkflow() {
  const { submissions } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Stats calculate kar rahe hain
  const total = submissions.length;
  const pending = submissions.filter((item) => item.status === "Pending").length;
  const approved = submissions.filter((item) => item.status === "Approved").length;
  const rejected = submissions.filter((item) => item.status === "Rejected").length;

  // Table filter logic
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-overview">
      {/* Page Heading */}
      <div className="admin-page-heading">
        <div>
          <h1>Approval Workflow</h1>
          <p>Track the progress of event proposals and budget requests.</p>
        </div>
      </div>

      {/* Summary Cards (Fixed with Icons) */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-purple">
            <i className="fa-regular fa-file-lines"></i>
          </div>
          <p>Total Requests</p>
          <h2>{total}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-orange">
            <i className="fa-regular fa-clock"></i>
          </div>
          <p>Awaiting Review</p>
          <h2>{pending}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-green">
            <i className="fa-regular fa-circle-check"></i>
          </div>
          <p>Approved</p>
          <h2>{approved}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-red">
            <i className="fa-regular fa-circle-xmark"></i>
          </div>
          <p>Rejected</p>
          <h2>{rejected}</h2>
        </div>
      </div>

      {/* Workflow Progress (Redesigned) */}
      <div className="admin-section-card workflow-progress-card">
        <div className="admin-section-heading">
          <div>
            <h2>Workflow Progress</h2>
            <p>Overview of the current approval stages.</p>
          </div>
        </div>
        
        <div className="workflow-stats-container">
          <div className="workflow-stat-item">
            <div className="ws-label">
              <span className="ws-dot dot-orange"></span> Pending
            </div>
            <div className="ws-value">{pending}</div>
          </div>
          
          <div className="workflow-stat-item">
            <div className="ws-label">
              <span className="ws-dot dot-green"></span> Approved
            </div>
            <div className="ws-value">{approved}</div>
          </div>

          <div className="workflow-stat-item">
            <div className="ws-label">
              <span className="ws-dot dot-red"></span> Rejected
            </div>
            <div className="ws-value">{rejected}</div>
          </div>
        </div>
      </div>

      {/* Submission Tracking Table */}
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
                  </td>
                  <td>{item.club}</td>
                  <td>{item.type}</td>
                  <td>{item.submittedBy}</td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>
                      {item.status === 'Pending' ? 'Admin Review' : 'Completed'}
                    </span>
                  </td>
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
      </div>
    </div>
  );
}

export default AdminWorkflow;