
import React, { useContext, useMemo, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminWorkflow() {
  const context = useContext(AdminContext) || {};
  const submissions = context.submissions || [];

  const [requestType, setRequestType] = useState("Event Proposal");
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [recentRequests, setRecentRequests] = useState([]);
  const [feedback, setFeedback] = useState("");

  const requestTypes = [
    "Event Proposal",
    "Budget Submission",
    "Permission Letter",
    "Post Event Report",
    "Expense Claim",
    "Other",
  ];

  const requestTitles = {
    "Event Proposal": "Request for Event Proposal",
    "Budget Submission": "Request for Budget Submission",
    "Permission Letter": "Request for Permission Letter",
    "Post Event Report": "Request for Post Event Report",
    "Expense Claim": "Request for Expense Claim",
    Other: "Request for Other Submission",
  };

  const allRequests = useMemo(() => {
    const existing = submissions.map((item, index) => ({
      id: item.id ?? `submission-${index}`,
      title: item.title || item.name || item.type || "Submission",
      type: item.type || "Other",
      date: item.submittedOn || item.submittedAt || item.date || "",
      status: item.status || "Pending",
      message: item.description || item.message || "",
      deadline: item.deadline || "",
    }));

    return [...recentRequests, ...existing].sort((a, b) => {
      const dateA = a.sentAt || a.date || "";
      const dateB = b.sentAt || b.date || "";
      return String(dateB).localeCompare(String(dateA));
    });
  }, [submissions, recentRequests]);

  const formatDate = (value) => {
    if (!value) return "Date not set";

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value);

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getRequestStatus = (request) => {
    const status = String(request.status || "Pending").toLowerCase();

    if (status.includes("approv")) return "Approved";
    if (status.includes("reject")) return "Rejected";
    if (status.includes("track") || status.includes("progress")) {
      return "On Track";
    }

    if (request.deadline) {
      const due = new Date(`${request.deadline}T23:59:59`);
      if (!Number.isNaN(due.getTime()) && due < new Date()) {
        return "Overdue";
      }
    }

    return "Pending";
  };

  const getStatusColors = (status) => {
    switch (status) {
      case "Approved":
      case "On Track":
        return { color: "#16703b", background: "#e1f8e9" };
      case "Rejected":
      case "Overdue":
        return { color: "#b42318", background: "#feeceb" };
      default:
        return { color: "#a15c00", background: "#fff3d6" };
    }
  };

  const handleSendRequest = (event) => {
    event.preventDefault();

    if (!message.trim()) {
      setFeedback("Please enter a message for the leader.");
      return;
    }

    if (!deadline) {
      setFeedback("Please select a deadline.");
      return;
    }

    const newRequest = {
      id: `request-${Date.now()}`,
      title: requestTitles[requestType],
      type: requestType,
      message: message.trim(),
      deadline,
      sentAt: new Date().toISOString(),
      date: new Date().toISOString(),
      status: "Pending",
    };

    setRecentRequests((previous) => [newRequest, ...previous]);
    setMessage("");
    setFeedback("Request added to Recent Requests.");
  };

  const styles = {
    page: {
      width: "100%",
      minWidth: 0,
      color: "#201744",
      fontSize: 14,
    },
    heading: {
      margin: "0 0 6px",
      color: "#5b3df6",
      fontSize: 30,
      fontWeight: 800,
      lineHeight: 1.3,
      letterSpacing: "-0.5px",
    },
    subtitle: {
      margin: 0,
      color: "#748096",
      fontSize: 15,
      lineHeight: 1.6,
    },
    panel: {
      background: "#fff",
      border: "1px solid #e8e2f7",
      borderRadius: 14,
      boxShadow: "0 3px 12px rgba(43,25,94,.035)",
      overflow: "hidden",
    },
    fieldLabel: {
      display: "block",
      marginBottom: 8,
      color: "#51476d",
      fontSize: 13,
      fontWeight: 700,
    },
    field: {
      boxSizing: "border-box",
      width: "100%",
      padding: "12px 13px",
      border: "1px solid #e2deed",
      borderRadius: 9,
      background: "#fff",
      color: "#30264c",
      fontFamily: "inherit",
      fontSize: 14,
      outlineColor: "#8b72ff",
    },
  };

  return (
    <div className="admin-workflow-page" style={styles.page}>
      <header style={{ textAlign: "left", marginBottom: 24 }}>
        <h1 style={styles.heading}>Request Submission</h1>
        <p style={styles.subtitle}>
          Send requests to the leader and set deadlines for required submissions.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(170px, .72fr) minmax(300px, 1.65fr) minmax(270px, 1.15fr)",
          gap: 18,
          alignItems: "start",
        }}
        className="admin-workflow-layout"
      >
        {/* Request type selector */}
        <section style={{ ...styles.panel, padding: 10 }}>
          <div
            style={{
              padding: "10px 10px 14px",
              fontSize: 15,
              fontWeight: 800,
              color: "#30264c",
            }}
          >
            Request Type
          </div>

          {requestTypes.map((type) => {
            const active = requestType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setRequestType(type);
                  setFeedback("");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  marginBottom: 5,
                  padding: "12px 10px",
                  border: active
                    ? "1px solid #d6caff"
                    : "1px solid transparent",
                  borderRadius: 9,
                  color: active ? "#5b3df6" : "#626078",
                  background: active ? "#f0eaff" : "#fff",
                  textAlign: "left",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: active ? 750 : 550,
                  cursor: "pointer",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20z" />
                  <path d="M14 3.5V8h4M9 13h6M9 16.5h6" />
                </svg>
                {type}
              </button>
            );
          })}
        </section>

        {/* Request form */}
        <section style={{ ...styles.panel, padding: 22 }}>
          <h2
            style={{
              margin: "0 0 20px",
              color: "#201744",
              fontSize: 19,
              fontWeight: 800,
            }}
          >
            {requestTitles[requestType]}
          </h2>

          <form onSubmit={handleSendRequest}>
            <div style={{ marginBottom: 20 }}>
              <label style={styles.fieldLabel} htmlFor="workflow-message">
                Message to Leader
              </label>
              <textarea
                id="workflow-message"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={`Please submit the required ${requestType.toLowerCase()}...`}
                style={{
                  ...styles.field,
                  resize: "vertical",
                  lineHeight: 1.6,
                  minHeight: 110,
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={styles.fieldLabel} htmlFor="workflow-deadline">
                Deadline
              </label>
              <input
                id="workflow-deadline"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                style={styles.field}
              />
            </div>

            {feedback && (
              <p
                role="status"
                style={{
                  margin: "0 0 15px",
                  color: feedback.startsWith("Request added")
                    ? "#16703b"
                    : "#b42318",
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                padding: "12px 18px",
                border: "none",
                borderRadius: 9,
                background: "#6844f5",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 750,
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(104,68,245,.15)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              Send Request
            </button>
          </form>
        </section>

        {/* Recent requests */}
        <section style={styles.panel}>
          <div
            style={{
              padding: "20px 20px 15px",
              borderBottom: "1px solid #f0edf6",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#201744",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              Recent Requests
            </h2>
            <p style={{ ...styles.subtitle, marginTop: 5, fontSize: 13 }}>
              Track your latest requests and deadlines.
            </p>
          </div>

          <div style={{ padding: "0 18px" }}>
            {allRequests.length === 0 ? (
              <div style={{ padding: "28px 5px", textAlign: "center" }}>
                <div style={{ marginBottom: 10, color: "#8b72ff" }}>
                  <svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20z" />
                    <path d="M14 3.5V8h4M9 13h6M9 16.5h6" />
                  </svg>
                </div>
                <p style={{ margin: 0, color: "#51476d", fontSize: 14, fontWeight: 700 }}>
                  No requests yet
                </p>
                <p style={{ margin: "6px 0 0", color: "#8b849e", fontSize: 12 }}>
                  Requests will appear here after submission.
                </p>
              </div>
            ) : (
              allRequests.slice(0, 8).map((request) => {
                const status = getRequestStatus(request);
                const statusColors = getStatusColors(status);

                return (
                  <div
                    key={request.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 11,
                      padding: "17px 0",
                      borderBottom: "1px solid #f0edf6",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        flex: "0 0 34px",
                        width: 34,
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 9,
                        background: "#f0eaff",
                        color: "#6844f5",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20z" />
                        <path d="M14 3.5V8h4M9 13h6M9 16.5h6" />
                      </svg>
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: "1px 0 5px",
                          color: "#30264c",
                          fontSize: 13,
                          fontWeight: 750,
                          lineHeight: 1.5,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {request.title}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: "#8b849e",
                          fontSize: 12,
                          lineHeight: 1.6,
                        }}
                      >
                        Sent on {formatDate(request.sentAt || request.date)}
                      </p>
                      {request.deadline && (
                        <p
                          style={{
                            margin: "4px 0 0",
                            color: "#77718c",
                            fontSize: 12,
                          }}
                        >
                          Due {formatDate(request.deadline)}
                        </p>
                      )}
                    </div>

                    <span
                      style={{
                        flexShrink: 0,
                        marginTop: 2,
                        padding: "5px 8px",
                        borderRadius: 7,
                        color: statusColors.color,
                        background: statusColors.background,
                        fontSize: 11,
                        fontWeight: 750,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .admin-workflow-layout {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) !important;
          }
          .admin-workflow-layout > section:last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 680px) {
          .admin-workflow-layout {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .admin-workflow-layout > section:last-child {
            grid-column: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminWorkflow;
