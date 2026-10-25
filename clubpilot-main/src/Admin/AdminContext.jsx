import { createContext, useEffect, useState } from "react";
import { initialSubmissions } from "./adminData";

// Create the Admin Context
export const AdminContext = createContext();

// Provider to share admin data with all child components
export function AdminProvider({ children }) {
  const [submissions, setSubmissions] = useState(() => {
    try {
      const savedSubmissions = localStorage.getItem("adminSubmissions");

      return savedSubmissions
        ? JSON.parse(savedSubmissions)
        : initialSubmissions;
    } catch (error) {
      console.error("Error loading admin submissions:", error);
      return initialSubmissions;
    }
  });

  // Save submissions whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        "adminSubmissions",
        JSON.stringify(submissions)
      );
    } catch (error) {
      console.error("Error saving admin submissions:", error);
    }
  }, [submissions]);

  // Approve or reject a submission
  function updateStatus(id, newStatus) {
    setSubmissions((previousSubmissions) =>
      previousSubmissions.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );
  }

  // Add a new submission
  function addSubmission(newSubmission) {
    setSubmissions((previousSubmissions) => [
      ...previousSubmissions,
      {
        ...newSubmission,
        id: newSubmission.id ?? Date.now(),
        status: newSubmission.status ?? "Pending",
      },
    ]);
  }

  // Delete a submission
  function deleteSubmission(id) {
    setSubmissions((previousSubmissions) =>
      previousSubmissions.filter((item) => item.id !== id)
    );
  }

  return (
    <AdminContext.Provider
      value={{
        submissions,
        updateStatus,
        addSubmission,
        deleteSubmission,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}