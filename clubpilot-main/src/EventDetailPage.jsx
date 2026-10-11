import React from "react";
import "./EventDetailPage.css";

function EventDetailPage({ event, onBack, darkMode, role, setEvents, currentMemberId }) {
  if (!event) {
    return (
      <div className="edp-wrap">
        <button className="edp-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back to Events
        </button>
        <div className="edp-notfound">
          <h1>Event Not Found</h1>
          <p>The event you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const capacity = event.capacity || 50;
  const participants = event.participants || 0;
  const percentage = Math.round((participants / capacity) * 100);
  const seatsLeft = capacity - participants;

  // ✅ SAME userId logic as EventPage.jsx — isse dono jagah sync rahega
  const userId = (() => {
    const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
    if (mid && role) return `${role}_${mid}`;
    if (role) {
      let sid = sessionStorage.getItem('__uid');
      if (!sid) {
        sid = String(Date.now());
        sessionStorage.setItem('__uid', sid);
      }
      return `${role}_${sid}`;
    }
    return null;
  })();

  const attendedBy = event.attendedBy || [];
  const pendingAttendance = event.pendingAttendance || [];
  const rejectedBy = event.rejectedBy || [];
  const participantNames = event.participantNames || [];

  const isRegistered = userId ? participantNames.includes(userId) : false;
  const isUserAttended = userId ? attendedBy.includes(userId) : false;
  const isUserPending = userId ? pendingAttendance.includes(userId) : false;
  const isUserRejected = userId ? rejectedBy.includes(userId) : false;

  const nonPendingParticipants = participantNames.filter(
    (name) => !pendingAttendance.includes(name)
  );

  const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

  const formatName = (name) => {
    // user_1 → User 1
    if (name.startsWith("user_")) {
      const rest = name.slice(5);
      return `User ${rest}`;
    }
    // core-member_1 → Core Member 1
    if (name.startsWith("core-member_")) {
      const rest = name.slice(12);
      return `Core Member ${rest}`;
    }
    // admin_xxx / leader_xxx → Admin / Leader
    if (name.startsWith("admin")) return "Admin";
    if (name.startsWith("leader")) return "Leader";
    // legacy: user1, member1
    if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
    if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
    return name;
  };

  const handleRequestAttendance = () => {
    if (!setEvents || !userId) return;
    if (event.status !== "ongoing") return;
    if (!isRegistered) return;
    if (isUserAttended || isUserPending) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              pendingAttendance: [...(e.pendingAttendance || []), userId],
              rejectedBy: (e.rejectedBy || []).filter((n) => n !== userId)
            }
          : e
      )
    );
  };

  const handleApprove = (name) => {
    if (!setEvents) return;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== event.id) return e;
        return {
          ...e,
          pendingAttendance: (e.pendingAttendance || []).filter((n) => n !== name),
          attendedBy: [...(e.attendedBy || []), name],
          rejectedBy: (e.rejectedBy || []).filter((n) => n !== name)
        };
      })
    );
  };

  const handleReject = (name) => {
    if (!setEvents) return;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== event.id) return e;
        return {
          ...e,
          pendingAttendance: (e.pendingAttendance || []).filter((n) => n !== name),
          rejectedBy: [...(e.rejectedBy || []), name]
        };
      })
    );
  };

  const handleToggleAttendance = (name) => {
    if (!setEvents) return;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== event.id) return e;
        const current = e.attendedBy || [];
        const updated = current.includes(name)
          ? current.filter((n) => n !== name)
          : [...current, name];
        return { ...e, attendedBy: updated };
      })
    );
  };

  const handleRegister = () => {
    if (!setEvents || !userId) return;
    if (event.status !== "upcoming") return;
    if (participants >= capacity) return;
    if (isRegistered) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              participants: (e.participants || 0) + 1,
              participantNames: [...(e.participantNames || []), userId]
            }
          : e
      )
    );
  };

  return (
    <div className="edp-wrap">
      <div className="edp-hero">
        <div className="edp-hero-bg"></div>
        <button className="edp-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <div className="edp-hero-inner">
          <div className="edp-hero-info">
            <div className="edp-badges">
              <span className="edp-badge-category">{event.category}</span>
              <span className={`edp-badge-status ${getStatusClass(event.status)}`}>
                <span className="dot"></span>
                {event.status}
              </span>
            </div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
          </div>
        </div>
      </div>

      <div className="edp-stats">
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
          <div><span>Date</span><strong>{event.date}</strong></div>
        </div>
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
          <div><span>Time</span><strong>{event.time}</strong></div>
        </div>
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
          <div><span>Venue</span><strong>{event.venue}</strong></div>
        </div>
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
          <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
        </div>
      </div>

      <div className="edp-grid">
        <div className="edp-main">
          <div className="edp-card">
            <div className="edp-card-head">
              <div className="edp-accent"></div>
              <h2>About This Event</h2>
            </div>
            <p className="edp-body-text">{event.description}</p>
          </div>

          <div className="edp-card">
            <div className="edp-card-head">
              <div className="edp-accent"></div>
              <h2>Registration Progress</h2>
            </div>
            <div className="edp-capacity-top">
              <div>
                <span className="edp-cap-label">Filled</span>
                <strong className="edp-cap-percent">{percentage}%</strong>
              </div>
              <div className="edp-cap-right">
                <span className="edp-cap-label">Seats Left</span>
                <strong className="edp-cap-seats">{seatsLeft}</strong>
              </div>
            </div>
            <div className="edp-bar">
              <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="edp-capacity-bottom">
              <span>{participants} registered</span>
              <span>{capacity} total capacity</span>
            </div>
          </div>

          {event.status === "ongoing" && (
            <div className="edp-card">
              <div className="edp-card-head">
                <div className="edp-accent"></div>
                <h2>Attendance</h2>
                <span className="edp-attend-count">
                  {attendedBy.length} / {participantNames.length} verified
                </span>
              </div>

              {role === "user" && isRegistered && (
                <div className="edp-user-attendance">
                  {isUserAttended ? (
                    <div className="edp-attendance-marked">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>Your attendance is verified</span>
                    </div>
                  ) : isUserPending ? (
                    <div className="edp-attendance-pending">
                      <i className="fa-solid fa-hourglass-half"></i>
                      <span>Pending verification by admin/leader</span>
                    </div>
                  ) : isUserRejected ? (
                    <div className="edp-attendance-rejected">
                      <i className="fa-solid fa-circle-xmark"></i>
                      <div>
                        <span>Your request was rejected</span>
                        <small>You can request again</small>
                      </div>
                      <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
                        <i className="fa-solid fa-rotate-right"></i> Request Again
                      </button>
                    </div>
                  ) : (
                    <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
                      <i className="fa-solid fa-hand"></i> Request Attendance
                    </button>
                  )}
                </div>
              )}

              {(role === "admin" || role === "leader") && (
                <>
                  <div className="edp-verified-section">
                    <div className="edp-verified-head">
                      <h3><i className="fa-solid fa-users"></i> All Participants</h3>
                      <span className="edp-verified-count">{nonPendingParticipants.length}</span>
                    </div>
                    <div className="edp-attendance-list">
                      {nonPendingParticipants.length > 0 ? (
                        nonPendingParticipants.map((name) => {
                          const present = attendedBy.includes(name);
                          return (
                            <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
                              <div className="edp-attend-user">
                                <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
                                <span>{formatName(name)}</span>
                              </div>
                              <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
                                {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p className="edp-attend-empty">No participants yet.</p>
                      )}
                    </div>
                  </div>

                  {pendingAttendance.length > 0 && (
                    <div className="edp-pending-section">
                      <div className="edp-pending-head">
                        <h3><i className="fa-solid fa-bell"></i> Pending Attendance Requests</h3>
                        <span className="edp-pending-badge">{pendingAttendance.length}</span>
                      </div>
                      <div className="edp-attendance-list">
                        {pendingAttendance.map((name) => (
                          <div key={name} className="edp-attend-row pending">
                            <div className="edp-attend-user">
                              <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
                              <span>{formatName(name)}</span>
                            </div>
                            <div className="edp-approval-actions">
                              <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
                                <i className="fa-solid fa-check"></i> Approve
                              </button>
                              <button className="edp-reject-btn" onClick={() => handleReject(name)}>
                                <i className="fa-solid fa-xmark"></i> Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {role === "core-member" && (
                <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
              )}
            </div>
          )}
        </div>

        <div className="edp-side">
          {role === "user" && (
            <div className="edp-side-card">
              <h3>Quick Actions</h3>
              {isRegistered ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-circle-check"></i> Already Participated
                </button>
              ) : event.status === "upcoming" && participants < capacity ? (
                <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
                  <i className="fa-solid fa-user-plus"></i> Participate Now
                </button>
              ) : event.status === "ongoing" ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-spinner"></i> Event In Progress
                </button>
              ) : event.status === "completed" ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-circle-check"></i> Event Completed
                </button>
              ) : event.status === "cancelled" ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
                </button>
              ) : (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-ban"></i> Event Full
                </button>
              )}
              <button className="edp-btn edp-btn-ghost" onClick={onBack}>
                <i className="fa-solid fa-arrow-left"></i> Back to Events
              </button>
            </div>
          )}

          <div className="edp-side-card">
            <h3>Event Details</h3>
            <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
            <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(event.status)}`}>{event.status}</strong></div>
            <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;