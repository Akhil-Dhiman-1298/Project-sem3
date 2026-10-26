
// import React, { useContext, useMemo, useState } from "react";
// import { AdminContext } from "./AdminContext";
// import "./AdminDashboard.css";

// function AdminEvents() {
//   const { submissions, updateStatus } = useContext(AdminContext);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   // Only display event proposals, not budget requests
//   const events = submissions.filter(
//     (item) => item.type === "Event Proposal"
//   );

//   // Search and filter events
//   const filteredEvents = useMemo(() => {
//     return events.filter((event) => {
//       const matchesSearch =
//         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         event.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus =
//         statusFilter === "All" || event.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [events, searchTerm, statusFilter]);

//   function handleStatusChange(id, status) {
//     if (typeof updateStatus === "function") {
//       updateStatus(id, status);
//     } else {
//       alert(
//         "updateStatus is missing from AdminContext.jsx. Add the function before using these buttons."
//       );
//     }
//   }

//   return (
//     <div className="admin-overview">
//       <div className="admin-page-heading">
//         <div>
//           <h1>Event Management</h1>
//           <p>
//             Review event proposals submitted by club leaders.
//           </p>
//         </div>
//       </div>

//       {/* Event summary */}
//       <div className="admin-stats-grid">
//         <div className="admin-stat-card">
//           <div className="admin-stat-icon">📅</div>
//           <p>Total Events</p>
//           <h2>{events.length}</h2>
//         </div>

//         <div className="admin-stat-card">
//           <div className="admin-stat-icon">⏳</div>
//           <p>Pending Events</p>
//           <h2>
//             {events.filter((event) => event.status === "Pending").length}
//           </h2>
//         </div>

//         <div className="admin-stat-card">
//           <div className="admin-stat-icon">✅</div>
//           <p>Approved Events</p>
//           <h2>
//             {events.filter((event) => event.status === "Approved").length}
//           </h2>
//         </div>

//         <div className="admin-stat-card">
//           <div className="admin-stat-icon">❌</div>
//           <p>Rejected Events</p>
//           <h2>
//             {events.filter((event) => event.status === "Rejected").length}
//           </h2>
//         </div>
//       </div>

//       {/* Search and status filter */}
//       <div className="admin-section-card">
//         <div className="admin-section-heading">
//           <div>
//             <h2>Event Proposals</h2>
//             <p>Search, review and manage event requests.</p>
//           </div>
//         </div>

//         <div className="admin-event-controls">
//           <input
//             type="text"
//             placeholder="Search by event, club or leader..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="admin-search-input"
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="admin-filter-select"
//           >
//             <option value="All">All Statuses</option>
//             <option value="Pending">Pending</option>
//             <option value="Approved">Approved</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//         </div>

//         {/* Events table */}
//         {filteredEvents.length === 0 ? (
//           <div className="admin-empty-state">
//             <p>No event proposals match your search.</p>
//           </div>
//         ) : (
//           <div className="admin-table-wrapper">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>Event</th>
//                   <th>Club</th>
//                   <th>Submitted By</th>
//                   <th>Submission Date</th>
//                   <th>Proposed Budget</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredEvents.map((event) => (
//                   <tr key={event.id}>
//                     <td>
//                       <strong>{event.title}</strong>
//                       <small className="admin-table-subtext">
//                         {event.description}
//                       </small>
//                     </td>

//                     <td>{event.club}</td>
//                     <td>{event.submittedBy}</td>
//                     <td>{event.date}</td>

//                     <td>
//                       ₹{Number(event.budget || 0).toLocaleString("en-IN")}
//                     </td>

//                     <td>
//                       <span
//                         className={`admin-status-badge ${event.status.toLowerCase()}`}
//                       >
//                         {event.status}
//                       </span>
//                     </td>

//                     <td>
//                       {event.status === "Pending" ? (
//                         <div className="admin-action-buttons">
//                           <button
//                             type="button"
//                             className="admin-approve-btn"
//                             onClick={() =>
//                               handleStatusChange(event.id, "Approved")
//                             }
//                           >
//                             Approve
//                           </button>

//                           <button
//                             type="button"
//                             className="admin-reject-btn"
//                             onClick={() =>
//                               handleStatusChange(event.id, "Rejected")
//                             }
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       ) : (
//                         <span className="admin-action-complete">
//                           Reviewed
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminEvents;


import React, { useContext, useMemo, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminEvents() {
  const { submissions = [] } = useContext(AdminContext);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Display event proposals only.
  const events = useMemo(() => {
    return submissions
      .filter((item) => item.type === "Event Proposal")
      .map((event) => {
        // Prefer an actual scheduled event date when available.
        // Fall back to the existing date field.
        const dateValue =
          event.eventDate || event.event_date || event.date;

        const date = dateValue
          ? String(dateValue).slice(0, 10)
          : "";

        return { ...event, calendarDate: date };
      })
      .filter((event) => /^\d{4}-\d{2}-\d{2}$/.test(event.calendarDate))
      .sort((a, b) =>
        a.calendarDate.localeCompare(b.calendarDate)
      );
  }, [submissions]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const monthName = currentMonth.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const eventsByDate = useMemo(() => {
    return events.reduce((groups, event) => {
      const date = event.calendarDate;
      groups[date] = [...(groups[date] || []), event];
      return groups;
    }, {});
  }, [events]);

  const selectedEvents = eventsByDate[selectedDate] || [];

  const visibleEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase();

    return (
      event.title?.toLowerCase().includes(search) ||
      event.club?.toLowerCase().includes(search) ||
      event.submittedBy?.toLowerCase().includes(search)
    );
  });

  function changeMonth(amount) {
    setCurrentMonth(
      new Date(year, month + amount, 1)
    );
  }

  function formatDate(dateString) {
    const [y, m, d] = dateString.split("-").map(Number);

    return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function selectDay(day) {
    if (!day) return;

    const dateString = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");

    setSelectedDate(dateString);
  }

  return (
    <div className="admin-events-page">
      <div className="admin-events-intro">
        <div>
          <h2>Event Calendar</h2>
          <p>
            Explore club event proposals and view dates on the calendar.
          </p>
        </div>

        <div className="admin-events-total">
          <span className="admin-events-total-icon">▦</span>
          <div>
            <strong>{events.length}</strong>
            <span>Event Proposals</span>
          </div>
        </div>
      </div>

      <div className="admin-events-layout">
        {/* Calendar */}
        <section className="admin-calendar-panel">
          <div className="admin-calendar-header">
            <div>
              <h3>{monthName}</h3>
              <p>Select a date to view its proposals</p>
            </div>

            <div className="admin-calendar-navigation">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                &#8249;
              </button>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                &#8250;
              </button>
            </div>
          </div>

          <div className="admin-calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div className="admin-calendar-weekday" key={day}>
                  {day}
                </div>
              )
            )}

            {calendarDays.map((day, index) => {
              const dateString = day
                ? [
                    year,
                    String(month + 1).padStart(2, "0"),
                    String(day).padStart(2, "0"),
                  ].join("-")
                : "";

              const hasEvents = Boolean(eventsByDate[dateString]);
              const isSelected = dateString === selectedDate;
              const isToday = dateString === todayString;

              return (
                <button
                  key={`${year}-${month}-${index}`}
                  type="button"
                  disabled={!day}
                  className={[
                    "admin-calendar-day",
                    !day ? "empty" : "",
                    hasEvents ? "has-events" : "",
                    isSelected ? "selected" : "",
                    isToday ? "today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => selectDay(day)}
                  aria-label={
                    day
                      ? `${formatDate(dateString)}${
                          hasEvents ? ", has event proposals" : ""
                        }`
                      : undefined
                  }
                  aria-pressed={day ? isSelected : undefined}
                >
                  {day && (
                    <>
                      <span>{day}</span>
                      {hasEvents && (
                        <span className="admin-calendar-dot" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className="admin-calendar-legend">
            <span className="admin-calendar-dot" />
            Dates with event proposals
          </div>
        </section>

        {/* Events list */}
        <section className="admin-upcoming-panel">
          <div className="admin-upcoming-header">
            <div>
              <h3>Event Proposals</h3>
              <p>{formatDate(selectedDate)}</p>
            </div>

            <span className="admin-upcoming-count">
              {selectedEvents.length}
            </span>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="admin-upcoming-list">
              {selectedEvents.map((event) => (
                <article
                  className="admin-upcoming-event"
                  key={event.id}
                >
                  <div className="admin-upcoming-date-icon">
                    <span>{event.calendarDate.slice(8, 10)}</span>
                    <small>
                      {new Date(
                        Number(event.calendarDate.slice(0, 4)),
                        Number(event.calendarDate.slice(5, 7)) - 1,
                        1
                      ).toLocaleDateString("en-IN", {
                        month: "short",
                      })}
                    </small>
                  </div>

                  <div className="admin-upcoming-event-details">
                    <strong>{event.title}</strong>
                    <span>{event.club}</span>
                    <span>Submitted by {event.submittedBy}</span>

                    <span
                      className={`admin-status-badge ${
                        (event.status || "Pending").toLowerCase()
                      }`}
                    >
                      {event.status || "Pending"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-events-empty">
              <div className="admin-events-empty-icon">▦</div>
              <strong>No proposals on this date</strong>
              <p>Select a highlighted date to view its proposals.</p>
            </div>
          )}
        </section>
      </div>

      {/* Searchable list of all proposals */}
      <section className="admin-all-events-panel">
        <div className="admin-all-events-header">
          <div>
            <h3>All Event Proposals</h3>
            <p>Browse proposals submitted by club leaders.</p>
          </div>

          <input
            type="search"
            className="admin-search-input"
            placeholder="Search events or clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {visibleEvents.length === 0 ? (
          <div className="admin-events-empty">
            <p>No matching event proposals found.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Club</th>
                  <th>Date</th>
                  <th>Budget</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {visibleEvents.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <strong>{event.title}</strong>
                    </td>
                    <td>{event.club}</td>
                    <td>{formatDate(event.calendarDate)}</td>
                    <td>
                      ₹{Number(event.budget || 0).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        className={`admin-status-badge ${
                          (event.status || "Pending").toLowerCase()
                        }`}
                      >
                        {event.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminEvents;
