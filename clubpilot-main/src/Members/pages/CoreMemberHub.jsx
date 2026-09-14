import { useMemo } from "react";
import { members } from "../data/memberData";
import "../Members.css";

function CoreMemberHub({ memberId, tasks }) {
  const currentMember = members.find(
    (member) => member.id === memberId
  );

  const myTasks = useMemo(() => {
    return tasks.filter(
      (task) => task.assignedTo === memberId
    );
  }, [tasks, memberId]);

  const completedTasks = myTasks.filter(
    (task) => task.status === "Completed"
  );

  const inProgressTasks = myTasks.filter(
    (task) => task.status === "In Progress"
  );

  const pendingTasks = myTasks.filter(
    (task) => task.status === "Pending"
  );

  const completionPercentage =
    myTasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / myTasks.length) * 100
        );

  const focusTask = [...myTasks]
    .filter((task) => task.status !== "Completed")
    .sort(
      (a, b) =>
        new Date(a.deadline) - new Date(b.deadline)
    )[0];

  const upcomingTasks = [...myTasks]
    .filter((task) => task.status !== "Completed")
    .sort(
      (a, b) =>
        new Date(a.deadline) - new Date(b.deadline)
    )
    .slice(0, 3);

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/ /g, "-");
  };

  if (!currentMember) {
    return (
      <div className="core-dashboard">
        <h1>Member Not Found</h1>
        <p>We could not find the member information.</p>
      </div>
    );
  }

  return (
    <div className="core-dashboard">
      <section className="core-dashboard-header">
        <div className="core-dashboard-welcome">
          <span className="core-dashboard-club">
            {currentMember.club}
          </span>

          <h1>
            Welcome back,{" "}
            {currentMember.name.split(" ")[0]} 👋
          </h1>

          <p>
            Here's your personal work overview.
            Stay on top of your club responsibilities.
          </p>
        </div>

        <div className="core-dashboard-member">
          <div className="core-dashboard-avatar">
            {currentMember.name.charAt(0)}
          </div>
          <div>
            <strong>{currentMember.name}</strong>
            <span>{currentMember.club}</span>
          </div>
        </div>
      </section>

      <section className="core-dashboard-stats">
        <div className="core-stat-card assigned">
          <div className="core-stat-icon">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div>
            <span>Assigned Tasks</span>
            <strong>{myTasks.length}</strong>
            <small>Total responsibilities</small>
          </div>
        </div>

        <div className="core-stat-card progress">
          <div className="core-stat-icon">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks.length}</strong>
            <small>Currently working on</small>
          </div>
        </div>

        <div className="core-stat-card completed">
          <div className="core-stat-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedTasks.length}</strong>
            <small>Successfully finished</small>
          </div>
        </div>

        <div className="core-stat-card pending">
          <div className="core-stat-icon">
            <i className="fa-solid fa-hourglass-half"></i>
          </div>
          <div>
            <span>Pending</span>
            <strong>{pendingTasks.length}</strong>
            <small>Waiting to be started</small>
          </div>
        </div>
      </section>

      <section className="core-dashboard-main-grid">
        <div className="core-focus-panel">
          <div className="core-panel-heading">
            <div>
              <span className="core-panel-label">TODAY'S FOCUS</span>
              <h2>
                {focusTask
                  ? focusTask.title
                  : "All caught up!"}
              </h2>
            </div>
            <div className="core-focus-icon">🎯</div>
          </div>

          {focusTask ? (
            <>
              <div className="core-focus-top">
                <span
                  className={`core-priority-badge ${getPriorityClass(
                    focusTask.priority
                  )}`}
                >
                  {focusTask.priority} Priority
                </span>
                <p>{focusTask.description}</p>
              </div>

              <div className="core-focus-details">
                <div>
                  <span>Due Date</span>
                  <strong>{focusTask.deadline}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{focusTask.status}</strong>
                </div>
                <div>
                  <span>Assigned By</span>
                  <strong>{focusTask.assignedBy}</strong>
                </div>
              </div>
            </>
          ) : (
            <div className="core-empty-state">
              🎉
              <p>You have no pending tasks.</p>
            </div>
          )}
        </div>

        <div className="core-progress-panel">
          <div className="core-progress-heading">
            <div>
              <span className="core-panel-label">MY PROGRESS</span>
              <h2>Task Completion</h2>
            </div>
            <strong>{completionPercentage}%</strong>
          </div>

          <div className="core-progress-bar">
            <div
              className="core-progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          <p className="core-progress-text">
            You have completed{" "}
            <strong>{completedTasks.length}</strong>{" "}
            out of{" "}
            <strong>{myTasks.length}</strong>{" "}
            assigned tasks.
          </p>

          <div className="core-progress-summary">
            <div>
              <span>Completed</span>
              <strong>{completedTasks.length}</strong>
            </div>
            <div>
              <span>Remaining</span>
              <strong>
                {myTasks.length - completedTasks.length}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="core-upcoming-section">
        <div className="core-section-heading">
          <div>
            <span className="core-panel-label">
              UPCOMING DEADLINES
            </span>
            <h2>Keep an eye on your deadlines</h2>
            <p>Your next tasks that need attention.</p>
          </div>
          <span className="core-task-count">
            {upcomingTasks.length} active
          </span>
        </div>

        <div className="core-upcoming-list">
          {upcomingTasks.map((task) => (
            <div className="core-upcoming-task" key={task.id}>
              <div className="core-upcoming-date">
                <span>{task.deadline.substring(5, 7)}</span>
                <strong>{task.deadline.substring(8, 10)}</strong>
              </div>

              <div className="core-upcoming-info">
                <h3>{task.title}</h3>
                <p>{task.priority} priority</p>
              </div>

              <span
                className={`core-status-badge ${getStatusClass(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="core-dashboard-footer">
        <div>
          <span>CLUB</span>
          <strong>{currentMember.club}</strong>
        </div>
        <div>
          <span>TEAM</span>
          <strong>{currentMember.team}</strong>
        </div>
        <div>
          <span>MEMBER SINCE</span>
          <strong>{currentMember.joinedDate || "2026"}</strong>
        </div>
        <div>
          <span>MEMBER</span>
          <strong>{currentMember.name}</strong>
        </div>
      </section>
    </div>
  );
}

export default CoreMemberHub;