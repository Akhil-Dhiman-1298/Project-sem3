
import React, { useContext, useMemo, useRef, useState } from "react";
import { AdminContext } from "./AdminContext";
import "./AdminDashboard.css";

function AdminDocuments() {
  const { submissions = [] } = useContext(AdminContext);
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Event Proposal - Annual Sports Day",
      club: "Technical Club",
      type: "Event Proposal",
      submittedBy: "Rahul Sharma",
      date: "2026-10-15",
      status: "Pending",
      description: "Proposal document for the upcoming club event.",
      fileName: "Tech Fest Proposal.pdf",
    },
    {
      id: 2,
      name: "Budget Estimate - Sports Day",
      club: "Coding Club",
      type: "Budget",
      submittedBy: "Priya Verma",
      date: "2026-10-16",
      status: "Pending",
      description: "Estimated budget and event expenses.",
      fileName: "Hackathon Budget.xlsx",
    },
    {
      id: 3,
      name: "Permission Letter - Guest Speaker",
      club: "Cultural Club",
      type: "Permission",
      submittedBy: "Aman Singh",
      date: "2026-10-12",
      status: "Approved",
      description: "Permission request for the invited guest speaker.",
      fileName: "Permission Letter.pdf",
    },
    {
      id: 4,
      name: "Post Event Report - Tech Talk",
      club: "Technical Club",
      type: "Report",
      submittedBy: "Neha Gupta",
      date: "2026-10-14",
      status: "Rejected",
      description: "Report documenting the completed technical event.",
      fileName: "Tech Talk Report.pdf",
    },
    {
      id: 5,
      name: "Invoice - Equipment",
      club: "Sports Club",
      type: "Invoice",
      submittedBy: "Karan Mehta",
      date: "2026-10-07",
      status: "Approved",
      description: "Invoice for purchased club equipment.",
      fileName: "Equipment Invoice.pdf",
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [menuDocumentId, setMenuDocumentId] = useState(null);

  const categories = [
    "All",
    "Event Proposals",
    "Budgets",
    "Reports",
    "Permissions",
    "Others",
  ];

  const getCategory = (type = "") => {
    const value = String(type).toLowerCase();

    if (value.includes("event")) return "Event Proposals";
    if (value.includes("budget") || value.includes("expense")) return "Budgets";
    if (value.includes("report")) return "Reports";
    if (value.includes("permission")) return "Permissions";

    return "Others";
  };

  const getStatusStyle = (status = "") => {
    const value = String(status).toLowerCase();

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

  const getFileColor = (document) => {
    const name = `${document.fileName || ""} ${document.name || ""}`.toLowerCase();

    if (name.endsWith(".pdf") || name.includes("pdf")) return "#6844f5";
    if (name.endsWith(".xlsx") || name.endsWith(".xls")) return "#16804a";
    if (name.endsWith(".doc") || name.endsWith(".docx")) return "#2870c7";

    return "#8a5bc4";
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const counts = useMemo(() => {
    const result = { All: documents.length };

    categories.slice(1).forEach((category) => {
      result[category] = documents.filter(
        (item) => getCategory(item.type) === category
      ).length;
    });

    return result;
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return documents
      .filter((item) => {
        const matchesSearch = [
          item.name,
          item.club,
          item.type,
          item.submittedBy,
          item.fileName,
        ].some((value) => String(value || "").toLowerCase().includes(search));

        const matchesCategory =
          activeTab === "All" || getCategory(item.type) === activeTab;

        const matchesStatus =
          statusFilter === "All" ||
          String(item.status).toLowerCase() === statusFilter.toLowerCase();

        const matchesType =
          typeFilter === "All" ||
          String(item.type).toLowerCase() === typeFilter.toLowerCase();

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus &&
          matchesType
        );
      })
      .sort((a, b) => {
        const difference = new Date(a.date) - new Date(b.date);
        return sortOrder === "newest" ? -difference : difference;
      });
  }, [
    documents,
    searchTerm,
    activeTab,
    statusFilter,
    typeFilter,
    sortOrder,
  ]);

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
      marginTop: 24,
      width: "100%",
      minHeight: 480,
      boxSizing: "border-box",
      background: "#fff",
      border: "1px solid #e8e2f7",
      borderRadius: 14,
      overflow: "visible",
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
      padding: "9px 14px",
      border: "1px solid transparent",
      borderRadius: 9,
      fontSize: 13,
      fontWeight: 650,
      cursor: "pointer",
      whiteSpace: "nowrap",
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
      width: "100%",
      height: 40,
      padding: "0 13px 0 36px",
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
      minWidth: 800,
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
      padding: "13px 15px",
      color: "#514b65",
      fontSize: 13,
      lineHeight: 1.5,
      verticalAlign: "middle",
      borderBottom: "1px solid #f0edf6",
    },
    button: {
      padding: "8px 13px",
      border: "1px solid #e8e0ff",
      borderRadius: 7,
      color: "#5b3df6",
      background: "#f8f5ff",
      fontSize: 12,
      fontWeight: 750,
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDocument = {
      id: `local-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      fileName: file.name,
      file,
      club: "Admin Upload",
      type: file.name.toLowerCase().includes("budget")
        ? "Budget"
        : file.name.toLowerCase().includes("report")
          ? "Report"
          : file.name.toLowerCase().includes("permission")
            ? "Permission"
            : "Other",
      submittedBy: "Admin",
      date: new Date().toISOString().slice(0, 10),
      status: "Approved",
      description: "Document uploaded by the administrator.",
    };

    setDocuments((previous) => [newDocument, ...previous]);
    setActiveTab("All");
    setSearchTerm("");
    event.target.value = "";
  };

  const downloadDocument = (document) => {
    if (!document.file) {
      window.alert(
        "This sample document does not have a file attached. Only files uploaded during this session can be downloaded."
      );
      return;
    }

    const url = URL.createObjectURL(document.file);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = document.fileName || document.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-documents-page" style={styles.page}>
      <header style={{ textAlign: "left" }}>
        <h1 style={styles.heading}>Documents &amp; Reports</h1>
        <p style={styles.subtitle}>
          View and manage all club documents and reports.
        </p>
      </header>

      <section style={styles.panel}>
        <div style={styles.tabs}>
          {categories.map((category) => {
            const active = activeTab === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveTab(category)}
                style={{
                  ...styles.tab,
                  color: active ? "#fff" : "#6e6684",
                  background: active ? "#6844f5" : "#f8f6fc",
                  borderColor: active ? "#6844f5" : "#f0edf7",
                }}
              >
                {category} ({counts[category] || 0})
              </button>
            );
          })}
        </div>

        <div style={styles.controls}>
          <div style={{ position: "relative", flex: "1 1 250px", minWidth: 180 }}>
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
              style={styles.input}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search documents..."
              aria-label="Search documents"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            style={styles.select}
            aria-label="Filter document type"
          >
            <option value="All">All Types</option>
            <option value="Event Proposal">Event Proposal</option>
            <option value="Budget">Budget</option>
            <option value="Budget Report">Budget Report</option>
            <option value="Report">Report</option>
            <option value="Permission">Permission</option>
            <option value="Invoice">Invoice</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              ...styles.button,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 40,
              padding: "0 16px",
              color: "#fff",
              background: "#6844f5",
              borderColor: "#6844f5",
              fontSize: 13,
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
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 16V4m-4 4 4-4 4 4" />
              <path d="M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" />
            </svg>
            Upload Document
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </div>

        <div style={styles.tableWrap}>
          {filteredDocuments.length === 0 ? (
            <div style={{ padding: "50px 20px", textAlign: "center" }}>
              <p style={{ color: "#30264c", fontWeight: 750, fontSize: 16 }}>
                No documents found
              </p>
              <p style={styles.subtitle}>
                Try another category or search term.
              </p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Uploaded By</th>
                  <th style={styles.th}>Uploaded On</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((item) => (
                  <tr key={item.id}>
                    <td style={{ ...styles.td, minWidth: 230 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: "0 0 30px",
                            width: 30,
                            height: 32,
                            borderRadius: 8,
                            color: getFileColor(item),
                            background: "#f2edff",
                          }}
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
                        <div style={{ minWidth: 0 }}>
                          <strong
                            style={{
                              display: "block",
                              color: "#30264c",
                              fontSize: 13,
                              fontWeight: 750,
                              overflowWrap: "anywhere",
                            }}
                          >
                            {item.name}
                          </strong>
                          {item.fileName && (
                            <span style={{ display: "block", marginTop: 3, color: "#8b849e", fontSize: 11 }}>
                              {item.fileName}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>{item.type}</td>
                    <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                      {item.submittedBy || "—"}
                    </td>
                    <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                      {formatDate(item.date)}
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button
                          type="button"
                          style={styles.button}
                          onClick={() => setSelectedDocument(item)}
                        >
                          View
                        </button>

                        <div style={{ position: "relative" }}>
                          <button
                            type="button"
                            aria-label={`More actions for ${item.name}`}
                            onClick={() =>
                              setMenuDocumentId(
                                menuDocumentId === item.id ? null : item.id
                              )
                            }
                            style={{
                              width: 30,
                              height: 32,
                              border: "none",
                              borderRadius: 7,
                              color: "#77718c",
                              background: "transparent",
                              fontSize: 19,
                              cursor: "pointer",
                            }}
                          >
                            ⋮
                          </button>

                          {menuDocumentId === item.id && (
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 34,
                                zIndex: 5,
                                minWidth: 140,
                                padding: 5,
                                border: "1px solid #eee8fa",
                                borderRadius: 9,
                                background: "#fff",
                                boxShadow: "0 8px 24px rgba(43,25,94,.12)",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedDocument(item);
                                  setMenuDocumentId(null);
                                }}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  padding: "9px 10px",
                                  border: "none",
                                  borderRadius: 6,
                                  background: "#fff",
                                  color: "#30264c",
                                  textAlign: "left",
                                  fontSize: 12,
                                  cursor: "pointer",
                                }}
                              >
                                View details
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  downloadDocument(item);
                                  setMenuDocumentId(null);
                                }}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  padding: "9px 10px",
                                  border: "none",
                                  borderRadius: 6,
                                  background: "#fff",
                                  color: "#30264c",
                                  textAlign: "left",
                                  fontSize: 12,
                                  cursor: "pointer",
                                }}
                              >
                                Download file
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #eeeaf6",
            color: "#827b96",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          Showing {filteredDocuments.length} of {documents.length} documents
        </div>
      </section>

      {selectedDocument && (
        <div
          onClick={() => setSelectedDocument(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            background: "rgba(24,17,47,.42)",
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-dialog-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 520,
              maxHeight: "85vh",
              overflowY: "auto",
              padding: 26,
              borderRadius: 16,
              border: "1px solid #e8e0fa",
              background: "#fff",
              boxShadow: "0 20px 60px rgba(24,17,47,.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 15 }}>
              <div>
                <h2
                  id="document-dialog-title"
                  style={{ margin: "0 0 8px", color: "#201744", fontSize: 22, fontWeight: 800 }}
                >
                  {selectedDocument.name}
                </h2>
                <p style={styles.subtitle}>{selectedDocument.type}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                aria-label="Close document details"
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
              ["File name", selectedDocument.fileName || selectedDocument.name],
              ["Club", selectedDocument.club || "—"],
              ["Type", selectedDocument.type || "—"],
              ["Uploaded by", selectedDocument.submittedBy || "—"],
              ["Uploaded on", formatDate(selectedDocument.date)],
              ["Status", selectedDocument.status || "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  padding: "12px 0",
                  borderBottom: "1px solid #f0edf6",
                }}
              >
                <strong style={{ color: "#51476d", fontSize: 13 }}>{label}</strong>
                <span style={{ color: "#475569", fontSize: 14, overflowWrap: "anywhere" }}>
                  {value}
                </span>
              </div>
            ))}

            {selectedDocument.description && (
              <p style={{ margin: "18px 0 0", color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
                {selectedDocument.description}
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
              <button
                type="button"
                onClick={() => downloadDocument(selectedDocument)}
                style={{
                  ...styles.button,
                  color: "#fff",
                  background: "#6844f5",
                  borderColor: "#6844f5",
                  padding: "10px 16px",
                }}
              >
                Download
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminDocuments;
