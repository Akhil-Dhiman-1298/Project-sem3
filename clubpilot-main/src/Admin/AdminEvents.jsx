
import React, { useContext, useMemo, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminEvents() {
  const { submissions, updateStatus } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Only display event proposals, not budget requests
  const events = submissions.filter(
    (item) => item.type === "Event Proposal"
  );

  // Search and filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, statusFilter]);

  function handleStatusChange(id, status) {
    if (typeof updateStatus === "function") {
      updateStatus(id, status);
    } else {
      alert(
        "updateStatus is missing from AdminContext.jsx. Add the function before using these buttons."
      );
    }
  }

  return (
    <div className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <h1>Event Management</h1>
          <p>
            Review event proposals submitted by club leaders.
          </p>
        </div>
      </div>

      {/* Event summary */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📅</div>
          <p>Total Events</p>
          <h2>{events.length}</h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏳</div>
          <p>Pending Events</p>
          <h2>
            {events.filter((event) => event.status === "Pending").length}
          </h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>
          <p>Approved Events</p>
          <h2>
            {events.filter((event) => event.status === "Approved").length}
          </h2>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">❌</div>
          <p>Rejected Events</p>
          <h2>
            {events.filter((event) => event.status === "Rejected").length}
          </h2>
        </div>
      </div>

      {/* Search and status filter */}
      <div className="admin-section-card">
        <div className="admin-section-heading">
          <div>
            <h2>Event Proposals</h2>
            <p>Search, review and manage event requests.</p>
          </div>
        </div>

        <div className="admin-event-controls">
          <input
            type="text"
            placeholder="Search by event, club or leader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Events table */}
        {filteredEvents.length === 0 ? (
          <div className="admin-empty-state">
            <p>No event proposals match your search.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Club</th>
                  <th>Submitted By</th>
                  <th>Submission Date</th>
                  <th>Proposed Budget</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <strong>{event.title}</strong>
                      <small className="admin-table-subtext">
                        {event.description}
                      </small>
                    </td>

                    <td>{event.club}</td>
                    <td>{event.submittedBy}</td>
                    <td>{event.date}</td>

                    <td>
                      ₹{Number(event.budget || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${event.status.toLowerCase()}`}
                      >
                        {event.status}
                      </span>
                    </td>

                    <td>
                      {event.status === "Pending" ? (
                        <div className="admin-action-buttons">
                          <button
                            type="button"
                            className="admin-approve-btn"
                            onClick={() =>
                              handleStatusChange(event.id, "Approved")
                            }
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            className="admin-reject-btn"
                            onClick={() =>
                              handleStatusChange(event.id, "Rejected")
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

export default AdminEvents;
