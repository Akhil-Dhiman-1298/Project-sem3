
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
    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
  });

  // Get event proposals and their scheduled dates.
  const events = useMemo(() => {
    return submissions
      .filter((item) => item.type === "Event Proposal")
      .map((event) => {
        const dateValue =
          event.eventDate || event.event_date || event.date;

        return {
          ...event,
          calendarDate: dateValue
            ? String(dateValue).slice(0, 10)
            : "",
        };
      })
      .filter((event) =>
        /^\d{4}-\d{2}-\d{2}$/.test(event.calendarDate)
      )
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

  // Group event proposals by date.
  const eventsByDate = useMemo(() => {
    return events.reduce((groups, event) => {
      const date = event.calendarDate;
      groups[date] = [...(groups[date] || []), event];
      return groups;
    }, {});
  }, [events]);

  const selectedEvents = eventsByDate[selectedDate] || [];

  function changeMonth(amount) {
    setCurrentMonth(new Date(year, month + amount, 1));
  }

  function formatDate(dateString) {
    if (!dateString) return "Not available";

    const [y, m, d] = String(dateString)
      .slice(0, 10)
      .split("-")
      .map(Number);

    const date = new Date(y, m - 1, d);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-IN", {
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

  function getStatusClass(status) {
    return String(status || "Pending")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  function getStatusStyle(status) {
    const normalized = getStatusClass(status);

    if (normalized === "approved") {
      return {
        color: "#166534",
        backgroundColor: "#dcfce7",
        border: "1px solid #86efac",
      };
    }

    if (normalized === "rejected") {
      return {
        color: "#991b1b",
        backgroundColor: "#fee2e2",
        border: "1px solid #fca5a5",
      };
    }

    return {
      color: "#92400e",
      backgroundColor: "#fef3c7",
      border: "1px solid #fcd34d",
    };
  }

  // Inline styles keep this page readable without adding more CSS overrides.
  const styles = {
    page: {
      fontSize: 16,
      color: "#201744",
    },

    heading: {
      margin: "0 0 8px",
      fontSize: 30,
      lineHeight: 1.3,
      fontWeight: 800,
      letterSpacing: "-0.5px",
      color: "#5b3df6",
    },

    introText: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.7,
      color: "#64748b",
    },

    totalCard: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      minHeight: 78,
      padding: "14px 20px",
      flexShrink: 0,
      border: "1px solid #e5dcff",
      borderRadius: 14,
      backgroundColor: "#fff",
    },

    totalIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      minWidth: 48,
      flex: "0 0 48px",
      borderRadius: 12,
      backgroundColor: "#f0eaff",
      color: "#6844ff",
    },

    totalNumber: {
      display: "block",
      fontSize: 25,
      lineHeight: 1.2,
      fontWeight: 800,
      color: "#201744",
    },

    totalLabel: {
      display: "block",
      marginTop: 5,
      fontSize: 14,
      lineHeight: 1.5,
      color: "#64748b",
    },

    panelTitle: {
      margin: 0,
      fontSize: 23,
      lineHeight: 1.4,
      fontWeight: 800,
      color: "#201744",
    },

    panelSubtitle: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.6,
      color: "#64748b",
    },

    weekday: {
      fontSize: 14,
      fontWeight: 800,
      color: "#65558a",
    },

    calendarDay: {
      minHeight: 76,
      fontSize: 19,
      lineHeight: 1.3,
      borderRadius: 11,
    },

    detailTitle: {
      display: "block",
      margin: "0 0 26px",
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 850,
      color: "#201744",
      overflowWrap: "anywhere",
    },

    metaList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: 20,
      width: "100%",
    },

    metaItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 7,
      width: "100%",
      minWidth: 0,
      fontSize: 16,
      lineHeight: 1.6,
      fontWeight: 500,
      color: "#334155",
      overflowWrap: "anywhere",
    },

    metaLabel: {
      display: "block",
      fontSize: 14,
      lineHeight: 1.4,
      fontWeight: 800,
      color: "#201744",
    },

    description: {
      margin: "26px 0 0",
      paddingTop: 22,
      borderTop: "1px solid #eee9fa",
      fontSize: 16,
      lineHeight: 1.8,
      color: "#475569",
      overflowWrap: "anywhere",
    },

    status: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "fit-content",
      padding: "9px 16px",
      borderRadius: 999,
      fontSize: 14,
      lineHeight: 1.4,
      fontWeight: 800,
    },
  };

  return (
    <div
      className="admin-events-page"
      style={styles.page}
    >
      {/* Page heading */}
      <div
        className="admin-events-intro"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 24,
        }}
      >
        <div>
          <h2 style={styles.heading}>
            Event Calendar
          </h2>

          <p style={styles.introText}>
            Explore club event proposals and view their details
            by selecting a date.
          </p>
        </div>

        {/* Total proposals summary */}
        <div
          className="admin-events-total"
          style={styles.totalCard}
        >
          <span
            className="admin-events-total-icon"
            style={styles.totalIcon}
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect
                x="3.5"
                y="5"
                width="17"
                height="15"
                rx="2.5"
              />
              <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17" />
              <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" />
            </svg>
          </span>

          <div>
            <strong style={styles.totalNumber}>
              {events.length}
            </strong>

            <span style={styles.totalLabel}>
              Total Event Proposals
            </span>
          </div>
        </div>
      </div>

      <div className="admin-events-layout">
        {/* Calendar */}
        <section className="admin-calendar-panel">
          <div className="admin-calendar-header">
            <div>
              <h3
                style={{
                  ...styles.panelTitle,
                  marginBottom: 8,
                }}
              >
                {monthName}
              </h3>

              <p style={styles.panelSubtitle}>
                Select a date to view its proposals
              </p>
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
                <div
                  className="admin-calendar-weekday"
                  key={day}
                  style={styles.weekday}
                >
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
                  style={{
                    ...styles.calendarDay,
                    fontWeight:
                      hasEvents || isToday || isSelected
                        ? 850
                        : 700,
                  }}
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

          <div
            className="admin-calendar-legend"
            style={{ fontSize: 13 }}
          >
            <span className="admin-calendar-dot" />
            Dates with event proposals
          </div>
        </section>

        {/* Selected date event details */}
        <section className="admin-upcoming-panel admin-selected-events">
          <div
            className="admin-upcoming-header"
            style={{ padding: "26px 28px" }}
          >
            <div>
              <h3
                style={{
                  ...styles.panelTitle,
                  marginBottom: 8,
                }}
              >
                Event Details
              </h3>

              <p style={styles.panelSubtitle}>
                {formatDate(selectedDate)}
              </p>
            </div>

            <span
              className="admin-upcoming-count"
              style={{
                fontSize: 15,
                fontWeight: 800,
                minWidth: 34,
                minHeight: 34,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedEvents.length}
            </span>
          </div>

          {selectedEvents.length > 0 ? (
            <div
              className="admin-upcoming-list"
              style={{ padding: "0 28px" }}
            >
              {selectedEvents.map((event) => (
                <article
                  className="admin-upcoming-event admin-event-detail-card"
                  key={
                    event.id ||
                    `${event.title}-${event.calendarDate}`
                  }
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 18,
                    padding: "28px 0",
                  }}
                >
                  {/* Event date block */}
                  <div
                    className="admin-upcoming-date-icon"
                    style={{
                      width: 58,
                      height: 66,
                      flex: "0 0 58px",
                      borderRadius: 14,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 23,
                        fontWeight: 850,
                      }}
                    >
                      {event.calendarDate.slice(8, 10)}
                    </span>

                    <small
                      style={{
                        fontSize: 12,
                        fontWeight: 750,
                      }}
                    >
                      {new Date(
                        Number(event.calendarDate.slice(0, 4)),
                        Number(event.calendarDate.slice(5, 7)) - 1,
                        1
                      ).toLocaleDateString("en-IN", {
                        month: "short",
                      })}
                    </small>
                  </div>

                  <div
                    className="admin-upcoming-event-details"
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <strong
                      className="admin-event-detail-title"
                      style={styles.detailTitle}
                    >
                      {event.title || "Untitled Event"}
                    </strong>

                    {/* Each detail is on a separate line */}
                    <div
                      className="admin-event-detail-meta"
                      style={styles.metaList}
                    >
                      <span style={styles.metaItem}>
                        <b style={styles.metaLabel}>Club</b>
                        <span>
                          {event.club || "Not specified"}
                        </span>
                      </span>

                      <span style={styles.metaItem}>
                        <b style={styles.metaLabel}>Proposed by</b>
                        <span>
                          {event.submittedBy || "Not specified"}
                        </span>
                      </span>

                      <span style={styles.metaItem}>
                        <b style={styles.metaLabel}>Scheduled date</b>
                        <span>
                          {formatDate(event.calendarDate)}
                        </span>
                      </span>

                      <span style={styles.metaItem}>
                        <b style={styles.metaLabel}>Submitted on</b>
                        <span>
                          {event.date
                            ? formatDate(event.date)
                            : "Not available"}
                        </span>
                      </span>

                      <span style={styles.metaItem}>
                        <b style={styles.metaLabel}>Proposed budget</b>
                        <span>
                          ₹
                          {Number(event.budget || 0).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </span>
                    </div>

                    {event.description && (
                      <p
                        className="admin-event-detail-description"
                        style={styles.description}
                      >
                        {event.description}
                      </p>
                    )}

                    <div
                      className="admin-event-detail-footer"
                      style={{ marginTop: 22 }}
                    >
                      <span
                        className={`admin-status-badge ${getStatusClass(
                          event.status
                        )}`}
                        style={{
                          ...styles.status,
                          ...getStatusStyle(event.status),
                        }}
                      >
                        {event.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              className="admin-events-empty"
              style={{
                padding: 36,
                textAlign: "center",
              }}
            >
              <div
                className="admin-events-empty-icon"
                style={{
                  marginBottom: 16,
                  color: "#6844ff",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="42"
                  height="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                  />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#201744",
                }}
              >
                No proposals on this date
              </strong>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#64748b",
                }}
              >
                Select a highlighted date to view its event details.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminEvents;
