import { useMemo, useState } from "react";
import { members } from "../data/memberData";
import "../Members.css";

function CoreMemberTasks({ memberId, tasks, setTasks }) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);

  const currentMember = members.find(
    (member) => member.id === memberId
  );

  const myTasks = useMemo(() => {
    return tasks.filter(
      (task) => task.assignedTo === memberId
    );
  }, [tasks, memberId]);

  const counts = {
    Pending: myTasks.filter((t) => t.status === "Pending").length,
    "In Progress": myTasks.filter((t) => t.status === "In Progress").length,
    Submitted: myTasks.filter(
      (t) => t.status === "Submitted" || t.status === "Submitted for Review"
    ).length,
    Completed: myTasks.filter((t) => t.status === "Completed").length
  };

  const attentionTasks = myTasks.filter(
    (task) =>
      task.status === "Pending" ||
      task.status === "Changes Requested"
  );

  const filteredTasks =
    activeTab === "All"
      ? myTasks
      : myTasks.filter((task) => {
          if (activeTab === "Submitted") {
            return (
              task.status === "Submitted" ||
              task.status === "Submitted for Review"
            );
          }
          return task.status === activeTab;
        });

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const getActionText = (status) => {
    switch (status) {
      case "Pending":
        return "Accept Task";
      case "In Progress":
        return "Continue Task";
      case "Submitted":
      case "Submitted for Review":
        return "View Submission";
      case "Completed":
        return "View Task";
      case "Changes Requested":
        return "Update & Resubmit";
      default:
        return "View Task";
    }
  };

  const handleAction = (task) => {
    if (task.status === "Pending") {
      updateTaskStatus(task.id, "In Progress");
      return;
    }
    setSelectedTask(task);
  };

  if (!currentMember) {
    return (
      <div className="core-tasks-page">
        <h1>Member Not Found</h1>
        <p>We could not find this member.</p>
      </div>
    );
  }

  return (
    <div className="core-tasks-page">
      <section className="core-tasks-header">
        <div>
          <span className="core-page-label">PERSONAL WORKSPACE</span>
          <h1>My Tasks</h1>
          <p>Your assigned responsibilities, all in one place.</p>

          <div className="core-task-member-line">
            <div className="core-task-member-avatar">
              {currentMember.name.charAt(0)}
            </div>
            <span>{currentMember.name}</span>
            <span className="core-task-dot">·</span>
            <span>{currentMember.club}</span>
          </div>
        </div>
      </section>

      <section className="core-task-overview">
        <div className="core-task-overview-card pending">
          <span>Pending</span>
          <strong>{counts.Pending}</strong>
          <small>Waiting to start</small>
        </div>
        <div className="core-task-overview-card progress">
          <span>In Progress</span>
          <strong>{counts["In Progress"]}</strong>
          <small>Currently working</small>
        </div>
        <div className="core-task-overview-card submitted">
          <span>Submitted</span>
          <strong>{counts.Submitted}</strong>
          <small>Awaiting review</small>
        </div>
        <div className="core-task-overview-card completed">
          <span>Completed</span>
          <strong>{counts.Completed}</strong>
          <small>Successfully finished</small>
        </div>
      </section>

      {attentionTasks.length > 0 && (
        <section className="core-attention-section">
          <div className="core-task-section-heading">
            <div>
              <span className="core-page-label">NEEDS YOUR ATTENTION</span>
              <h2>Tasks that need action</h2>
              <p>
                You have {attentionTasks.length} task
                {attentionTasks.length !== 1 ? "s" : ""} requiring
                your attention.
              </p>
            </div>
          </div>

          <div className="core-attention-card">
            {attentionTasks.slice(0, 1).map((task) => (
              <div className="core-attention-content" key={task.id}>
                <div className="core-attention-icon">!</div>

                <div className="core-attention-info">
                  <div className="core-task-top-line">
                    <span
                      className={`core-priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority} Priority
                    </span>
                    <span className="core-task-status pending-status">
                      {task.status}
                    </span>
                  </div>

                  <h3>{task.title}</h3>
                  <p>{task.description}</p>

                  <div className="core-attention-meta">
                    <span>
                      Assigned by <strong>{task.assignedBy}</strong>
                    </span>
                    <span>
                      Due <strong>{task.deadline}</strong>
                    </span>
                  </div>
                </div>

                <button
                  className="core-task-action primary"
                  onClick={() => handleAction(task)}
                >
                  {getActionText(task.status)}
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="core-all-tasks-section">
        <div className="core-task-section-heading">
          <div>
            <span className="core-page-label">YOUR WORK</span>
            <h2>All My Tasks</h2>
            <p>Every responsibility assigned specifically to you.</p>
          </div>
          <span className="core-task-total">{myTasks.length} total</span>
        </div>

        <div className="core-task-tabs">
          {["All", "Pending", "In Progress", "Submitted", "Completed"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span>{tab === "All" ? myTasks.length : counts[tab]}</span>
            </button>
          ))}
        </div>

        <div className="core-member-task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div className="core-member-task-card" key={task.id}>
                <div className="core-member-task-main">
                  <div className="core-member-task-info">
                    <div className="core-task-top-line">
                      <span
                        className={`core-task-status ${task.status
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        {task.status}
                      </span>
                      <span
                        className={`core-priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <div className="core-member-task-meta">
                      <span>
                        <i className="fa-solid fa-calendar"></i>
                        {task.deadline}
                      </span>
                      <span>
                        <i className="fa-solid fa-user"></i>
                        {task.assignedBy}
                      </span>
                      <span>
                        <i className="fa-solid fa-users"></i>
                        {currentMember.club}
                      </span>
                    </div>
                  </div>

                  <button
                    className="core-task-action"
                    onClick={() => handleAction(task)}
                  >
                    {getActionText(task.status)}
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="core-task-empty">
              <div>✓</div>
              <h3>No {activeTab.toLowerCase()} tasks</h3>
              <p>You don't have any tasks in this category.</p>
            </div>
          )}
        </div>
      </section>

      {selectedTask && (
        <div
          className="core-task-modal-overlay"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="core-task-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="core-task-modal-close"
              onClick={() => setSelectedTask(null)}
            >
              ×
            </button>

            <span className="core-page-label">TASK DETAILS</span>
            <h2>{selectedTask.title}</h2>
            <p className="core-modal-description">
              {selectedTask.description}
            </p>

            <div className="core-modal-details">
              <div>
                <span>Deadline</span>
                <strong>{selectedTask.deadline}</strong>
              </div>
              <div>
                <span>Priority</span>
                <strong>{selectedTask.priority}</strong>
              </div>
              <div>
                <span>Assigned by</span>
                <strong>{selectedTask.assignedBy}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedTask.status}</strong>
              </div>
            </div>

            <div className="core-modal-checklist">
              <h3>Task checklist</h3>
              <label>
                <input type="checkbox" />
                Review the task requirements
              </label>
              <label>
                <input type="checkbox" />
                Prepare the required work
              </label>
              <label>
                <input type="checkbox" />
                Review before submission
              </label>
            </div>

            <div className="core-modal-comment">
              <label>Add a comment</label>
              <textarea placeholder="Add an update for your leader..." />
            </div>

            {selectedTask.status === "In Progress" && (
              <button
                className="core-submit-button"
                onClick={() => {
                  updateTaskStatus(selectedTask.id, "Submitted");
                  setSelectedTask(null);
                }}
              >
                Submit for Review →
              </button>
            )}

            {selectedTask.status === "Changes Requested" && (
              <button
                className="core-submit-button"
                onClick={() => {
                  updateTaskStatus(selectedTask.id, "Submitted");
                  setSelectedTask(null);
                }}
              >
                Update & Resubmit →
              </button>
            )}

            {selectedTask.status === "Completed" && (
              <div className="core-completed-message">
                ✓ This task has been completed.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoreMemberTasks;