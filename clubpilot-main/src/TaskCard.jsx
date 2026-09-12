import { useState } from "react";

function TaskCard({ task, onDelete, onEdit }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="task-card">
            <div className="task-card-top">
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                    {task.priority} Priority
                </span>

                <div className="task-card-actions">
                    <span className="deadline">
                        <i className="fa-regular fa-calendar"></i>
                        {task.deadline}
                    </span>

                    <button
                        className="task-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    {menuOpen && (
                        <div className="task-dropdown">
                            <button
                                onClick={() => {
                                    onEdit(task);
                                    setMenuOpen(false);
                                }}
                            >
                                <i className="fa-solid fa-pen"></i> Edit Task
                            </button>

                            <button
                                className="delete-menu-item"
                                onClick={() => {
                                    onDelete(task.id);
                                    setMenuOpen(false);
                                }}
                            >
                                <i className="fa-solid fa-trash"></i> Delete Task
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="task-card-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>

            <div className="task-card-bottom">
                <div className="assignee">
                    <img src={task.avatar} alt={task.assignee} />
                    <div>
                        <strong>{task.assignee}</strong>
                        <span>{task.assigneeRole}</span>
                    </div>
                </div>

                <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                </span>
            </div>
        </div>
    );
}

export default TaskCard;