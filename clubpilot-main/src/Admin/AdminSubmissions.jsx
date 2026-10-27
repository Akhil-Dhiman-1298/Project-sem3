
import React, { useContext, useMemo, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminSubmissions() {
  const { submissions = [], updateStatus } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const getText = (value) => String(value ?? "");

  const getStatusStyle = (status) => {
    const value = getText(status).toLowerCase();

    if (value.includes("approv")) {
      return { color: "#16703b", background: "#e1f8e9" };
    }

    if (value.includes("reject")) {
      return { color: "#b42318", background: "#feeceb" };
    }

    if (value.includes("update")) {
      return { color: "#b42336", background: "#fff0f0" };
    }

    if (value.includes("review")) {
      return { color: "#6941c6", background: "#f0eaff" };
    }

    return { color: "#a15c00", background: "#fff3d6" };
  };

  const getTypeCategory = (type) => {
    const value = getText(type).toLowerCase();

    if (value.includes("event")) return "Event Proposals";
    if (value.includes("budget") || value.includes("expense")) return "Budgets";
    if (value.includes("report")) return "Reports";

    return "Others";
  };

  const getDateValue = (item) => {
    const rawDate = item.date || item.submittedOn || item.createdAt;

    if (!rawDate) return 0;

    const parsed = new Date(rawDate).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const formatDate = (item) => {
    const rawDate = item.date || item.submittedOn || item.createdAt;

    if (!rawDate) return "—";

    const parsed = new Date(rawDate);

    if (Number.isNaN(parsed.getTime())) {
      return getText(rawDate);
    }

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categories = [
    { label: "All", value: "All" },
    { label: "Event Proposals", value: "Event Proposals" },
    { label: "Budgets", value: "Budgets" },
    { label: "Reports", value: "Reports" },
    { label: "Others", value: "Others" },
  ];

  const tabCounts = useMemo(() => {
    const counts = { All: submissions.length };

    categories.slice(1).forEach((category) => {
      counts[category.value] = submissions.filter(
        (item) => getTypeCategory(item.type) === category.value
      ).length;
    });

    return counts;
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return submissions
      .filter((item) => {
        const matchesSearch = [
          item.title,
          item.club,
          item.submittedBy,
          item.type,
          item.description,
        ].some((value) => getText(value).toLowerCase().includes(search));

        const matchesStatus =
          statusFilter === "All" ||
          getText(item.status).toLowerCase() === statusFilter.toLowerCase();

        const matchesCategory =
          activeTab === "All" ||
          getTypeCategory(item.type) === activeTab;

        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        const difference = getDateValue(a) - getDateValue(b);
        return sortOrder === "newest" ? -difference : difference;
      });
  }, [submissions, searchTerm, statusFilter, activeTab, sortOrder]);

  function handleStatusChange(item, newStatus) {
    if (typeof updateStatus !== "function") {
      window.alert("Please check updateStatus in AdminContext.jsx.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus.toLowerCase()} this submission?`
    );

    if (confirmed) {
      updateStatus(item.id, newStatus);
      setSelectedSubmission(null);
    }
  }

  const styles = {
    page: {
      color: "#201744",
      fontSize: 14,
      width: "100%",
      minWidth: 0,
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
  marginTop: 24,
  width: "100%",
  minHeight: 480,
  boxSizing: "border-box",
  background: "#fff",
  border: "1px solid #e8e2f7",
  borderRadius: 14,
  overflow: "hidden",
  boxShadow: "0 3px 12px rgba(43, 25, 94, 0.035)",
},

    tabs: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      padding: "18px 20px",
      borderBottom: "1px solid #eeeaf6",
    },

    tab: {
      border: "1px solid transparent",
      borderRadius: 9,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 650,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all 0.15s ease",
    },

    controls: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      padding: "16px 20px",
      borderBottom: "1px solid #eeeaf6",
    },

    input: {
      boxSizing: "border-box",
      minWidth: 180,
      flex: "1 1 220px",
      height: 40,
      padding: "0 13px",
      border: "1px solid #e2deed",
      borderRadius: 9,
      outlineColor: "#8b72ff",
      color: "#30264c",
      background: "#fff",
      fontSize: 13,
    },

    select: {
      boxSizing: "border-box",
      minWidth: 135,
      height: 40,
      padding: "0 12px",
      border: "1px solid #e2deed",
      borderRadius: 9,
      outlineColor: "#8b72ff",
      color: "#4c4563",
      background: "#fff",
      fontSize: 13,
      cursor: "pointer",
    },

    tableWrap: {
      width: "100%",
      overflowX: "auto",
    },

    table: {
      width: "100%",
      minWidth: 850,
      borderCollapse: "collapse",
      textAlign: "left",
    },

    th: {
      padding: "14px 15px",
      background: "#fbfaff",
      color: "#77718c",
      fontSize: 12,
      fontWeight: 750,
      whiteSpace: "nowrap",
      borderBottom: "1px solid #eeeaf6",
    },

    td: {
      padding: "15px",
      color: "#514b65",
      fontSize: 13,
      lineHeight: 1.5,
      verticalAlign: "middle",
      borderBottom: "1px solid #f0edf6",
    },

    badge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6px 10px",
      borderRadius: 7,
      fontSize: 11,
      fontWeight: 750,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    },

    viewButton: {
      padding: "7px 12px",
      border: "1px solid #e8e0ff",
      borderRadius: 7,
      color: "#5b3df6",
      background: "#f8f5ff",
      fontSize: 12,
      fontWeight: 750,
      cursor: "pointer",
    },
  };

  return (
    <div className="admin-submissions-page" style={styles.page}>
      {/* Page heading */}
<header
  style={{
    marginBottom: 0,
    textAlign: "left",
    width: "100%",
  }}
>        <h1 style={styles.heading}>Submissions &amp; Approvals</h1>
        <p style={styles.subtitle}>
          Review and manage all submissions from the club.
        </p>
      </header>

      {/* Main submissions panel */}
      <section style={styles.panel}>
        {/* Compact category tabs */}
        <div style={styles.tabs}>
          {categories.map((category) => {
            const active = activeTab === category.value;

            return (
              <button
                type="button"
                key={category.value}
                onClick={() => setActiveTab(category.value)}
                style={{
                  ...styles.tab,
                  color: active ? "#fff" : "#6e6684",
                  background: active ? "#6844f5" : "#f8f6fc",
                  borderColor: active ? "#6844f5" : "#f0edf7",
                }}
              >
                {category.label}{" "}
                <span style={{ opacity: active ? 0.9 : 0.7 }}>
                  ({tabCounts[category.value] ?? 0})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and filters */}
        <div style={styles.controls}>
          <div
            style={{
              position: "relative",
              flex: "1 1 220px",
              minWidth: 180,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                position: "absolute",
                left: 12,
                top: 12,
                color: "#8b849e",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              style={{
                ...styles.input,
                width: "100%",
                paddingLeft: 36,
              }}
              aria-label="Search submissions"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            style={styles.select}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Under Review">Under Review</option>
            <option value="Needs Update">Needs Update</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            style={styles.select}
            aria-label="Sort submissions"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Compact submission list */}
        {filteredSubmissions.length === 0 ? (
          <div
            style={{
              padding: "52px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 750,
                color: "#30264c",
                marginBottom: 8,
              }}
            >
              No submissions found
            </div>

            <p style={{ ...styles.subtitle, fontSize: 13 }}>
              Try changing the category, search term, or status filter.
            </p>
          </div>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Submitted By</th>
                  <th style={styles.th}>Submitted On</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((item) => {
                  const status = item.status || "Pending";
                  const statusStyle = getStatusStyle(status);

                  return (
                    <tr key={item.id}>
                      <td style={styles.td}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: "#f1ebff",
                            color: "#6844f5",
                          }}
                          title={getText(item.type)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
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
                      </td>

                      <td style={{ ...styles.td, minWidth: 155 }}>
                        <div
                          style={{
                            fontWeight: 750,
                            fontSize: 13,
                            color: "#30264c",
                          }}
                        >
                          {item.title || "Untitled submission"}
                        </div>
                      </td>

                      <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                        {item.submittedBy || "—"}
                      </td>

                      <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                        {formatDate(item)}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            color: statusStyle.color,
                            background: statusStyle.background,
                          }}
                        >
                          {status}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <button
                          type="button"
                          style={styles.viewButton}
                          onClick={() => setSelectedSubmission(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Small result count */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #eeeaf6",
            fontSize: 12,
            color: "#827b96",
          }}
        >
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </div>
      </section>

      {/* View submission dialog */}
      {selectedSubmission && (
        <div
          onClick={() => setSelectedSubmission(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            background: "rgba(24, 17, 47, 0.42)",
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-dialog-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 540,
              maxHeight: "85vh",
              overflowY: "auto",
              padding: 26,
              borderRadius: 16,
              border: "1px solid #e8e0fa",
              background: "#fff",
              boxShadow: "0 20px 60px rgba(24, 17, 47, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
                marginBottom: 22,
              }}
            >
              <div>
                <h2
                  id="submission-dialog-title"
                  style={{
                    margin: "0 0 7px",
                    fontSize: 23,
                    lineHeight: 1.4,
                    fontWeight: 800,
                    color: "#201744",
                  }}
                >
                  {selectedSubmission.title || "Submission details"}
                </h2>

                <p style={{ ...styles.subtitle, fontSize: 13 }}>
                  {selectedSubmission.type || "Submission"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                aria-label="Close submission details"
                style={{
                  width: 32,
                  height: 32,
                  border: "none",
                  borderRadius: 8,
                  background: "#f4f1fb",
                  color: "#5b5470",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {[
              ["Club", selectedSubmission.club || "—"],
              ["Submitted by", selectedSubmission.submittedBy || "—"],
              ["Submitted on", formatDate(selectedSubmission)],
              [
                "Proposed budget",
                selectedSubmission.budget != null
                  ? `₹${Number(
                      selectedSubmission.budget || 0
                    ).toLocaleString("en-IN")}`
                  : "—",
              ],
              ["Status", selectedSubmission.status || "Pending"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "13px 0",
                  borderBottom: "1px solid #f0edf6",
                }}
              >
                <strong
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#51476d",
                  }}
                >
                  {label}
                </strong>

                <span
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#475569",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}

            {selectedSubmission.description && (
              <div style={{ paddingTop: 16 }}>
                <strong
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#51476d",
                  }}
                >
                  Description
                </strong>

                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: "#475569",
                    overflowWrap: "anywhere",
                  }}
                >
                  {selectedSubmission.description}
                </p>
              </div>
            )}

            {["Pending", "Pending Approval"].includes(
              selectedSubmission.status || "Pending"
            ) && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(selectedSubmission, "Approved")
                  }
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: 9,
                    color: "#fff",
                    background: "#218653",
                    fontSize: 13,
                    fontWeight: 750,
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(selectedSubmission, "Rejected")
                  }
                  style={{
                    padding: "10px 16px",
                    border: "1px solid #fecaca",
                    borderRadius: 9,
                    color: "#b42318",
                    background: "#fff1f0",
                    fontSize: 13,
                    fontWeight: 750,
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminSubmissions;
