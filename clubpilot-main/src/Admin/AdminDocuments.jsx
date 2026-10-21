
import React, { useContext, useState } from "react";
import { AdminContext } from "./AdminContext";
import { initialDocuments } from "./adminData";
import "./AdminDashboard.css";

function AdminDocuments() {
  const { submissions } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Match document records with their related submission status.
  // If a document has no matching submission, use its original status.
  const documents = initialDocuments.map((document) => {
    const relatedSubmission = submissions.find(
      (item) =>
        item.club === document.club &&
        item.submittedBy === document.submittedBy &&
        item.type ===
          (document.type === "Event Report"
            ? "Event Proposal"
            : document.type === "Budget Report"
              ? "Budget Request"
              : document.type)
    );

    return relatedSubmission
      ? { ...document, status: relatedSubmission.status }
      : document;
  });

  // Search and filter document records.
  const filteredDocuments = documents.filter((document) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      document.name.toLowerCase().includes(search) ||
      document.club.toLowerCase().includes(search) ||
      document.submittedBy.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || document.status === statusFilter;

    const matchesType =
      typeFilter === "All" || document.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = documents.filter(
    (document) => document.status === "Pending"
  ).length;

  const approvedCount = documents.filter(
    (document) => document.status === "Approved"
  ).length;

  const rejectedCount = documents.filter(
    (document) => document.status === "Rejected"
  ).length;

  return (
    <div className="admin-overview">
      {/* Page heading */}
      <div className="admin-page-heading">
        <div>
          <h1>Document Management</h1>
          <p>
            View and track event proposals, budget reports, and club documents.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📁</div>
          <p>Total Documents</p>
          <h2>{documents.length}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏳</div>
          <p>Pending Review</p>
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

      {/* Document table */}
      <div className="admin-section-card">
        <div className="admin-section-heading">
          <div>
            <h2>Submitted Documents</h2>
            <p>Search and filter document records by type or status.</p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="admin-event-controls">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search document, club or leader..."
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
            <option value="All">All Document Types</option>
            <option value="Event Proposal">Event Proposal</option>
            <option value="Budget Report">Budget Report</option>
            <option value="Event Report">Event Report</option>
          </select>
        </div>

        {/* Results */}
        {filteredDocuments.length === 0 ? (
          <div className="admin-empty-state">
            <p>No documents match your search.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Club</th>
                  <th>Document Type</th>
                  <th>Submitted By</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>
                      <strong>📄 {document.name}</strong>
                    </td>

                    <td>{document.club}</td>
                    <td>{document.type}</td>
                    <td>{document.submittedBy}</td>
                    <td>{document.date}</td>

                    <td>
                      <span
                        className={`admin-status-badge ${document.status.toLowerCase()}`}
                      >
                        {document.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="admin-table-subtext" style={{ marginTop: "12px" }}>
        These are sample document records. Actual file uploads and downloads
        can be connected when the backend is implemented.
      </p>
    </div>
  );
}

export default AdminDocuments;