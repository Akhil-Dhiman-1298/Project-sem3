import React, { useContext, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminDocuments() {
  // Agar tere paas documents ka data AdminContext me nahi hai, 
  // toh tu apne hisaab se state use kar lena. Yahan maine sample data rakha hai.
  const { submissions } = useContext(AdminContext); // Assuming documents data is related or just static for now
  
  // Fake data for UI representation (Agar context me documents hain toh unhe use kar)
  const documents = [
    { id: 1, name: "Tech Fest Proposal.pdf", club: "Technical Club", type: "Event Proposal", submittedBy: "Rahul Sharma", date: "2026-10-15", status: "Pending" },
    { id: 2, name: "Hackathon Budget.xlsx", club: "Coding Club", type: "Budget Report", submittedBy: "Priya Verma", date: "2026-10-16", status: "Pending" },
    { id: 3, name: "Cultural Night Report.pdf", club: "Cultural Club", type: "Event Report", submittedBy: "Aman Singh", date: "2026-10-12", status: "Approved" },
    { id: 4, name: "Sports Equipment Request.pdf", club: "Sports Club", type: "Budget Report", submittedBy: "Neha Gupta", date: "2026-10-14", status: "Rejected" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter logic
  const filteredDocuments = documents.filter((item) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(search) || item.club.toLowerCase().includes(search);
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = documents.filter((item) => item.status === "Pending").length;
  const approvedCount = documents.filter((item) => item.status === "Approved").length;
  const rejectedCount = documents.filter((item) => item.status === "Rejected").length;

  return (
    <div className="admin-overview">
      {/* Page heading */}
      <div className="admin-page-heading">
        <div>
          <h1>Document Management</h1>
          <p>View and track event proposals, budget reports, and club documents.</p>
        </div>
      </div>

      {/* Summary cards - Yahan Emojis hata kar Icons laga diye hain */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-purple">
            <i className="fa-regular fa-folder-open"></i>
          </div>
          <p>Total Documents</p>
          <h2>{documents.length}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-orange">
            <i className="fa-regular fa-clock"></i>
          </div>
          <p>Pending Review</p>
          <h2>{pendingCount}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-green">
            <i className="fa-regular fa-circle-check"></i>
          </div>
          <p>Approved</p>
          <h2>{approvedCount}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-red">
            <i className="fa-regular fa-circle-xmark"></i>
          </div>
          <p>Rejected</p>
          <h2>{rejectedCount}</h2>
        </div>
      </div>

      {/* Documents Table */}
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

          <select className="admin-filter-select">
            <option value="All">All Document Types</option>
            <option value="Event Proposal">Event Proposal</option>
            <option value="Budget Report">Budget Report</option>
          </select>
        </div>

        {/* Table */}
        {filteredDocuments.length === 0 ? (
          <div className="admin-empty-state">
            <p>No documents found.</p>
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
                {filteredDocuments.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>
                        {/* File Icon document name ke saath */}
                        <i className="fa-regular fa-file-pdf" style={{ marginRight: '8px', color: '#EF4444' }}></i>
                        {item.name}
                      </strong>
                    </td>
                    <td>{item.club}</td>
                    <td>{item.type}</td>
                    <td>{item.submittedBy}</td>
                    <td>{item.date}</td>
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

export default AdminDocuments;