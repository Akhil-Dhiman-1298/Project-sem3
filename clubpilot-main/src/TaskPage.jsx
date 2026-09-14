import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./TaskPage.css";

function TaskPage({ darkMode, role }) {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Plan Annual Sports Day",
            description: "Organize and schedule events for the annual sports day.",
            priority: "High",
            status: "In Progress",
            deadline: "2026-09-20",
            assignee: "Alex Morgan",
            assigneeRole: "Club Leader",
            avatar: "https://i.pravatar.cc/100?img=12"
        },
        {
            id: 2,
            title: "Update Member List",
            description: "Add new members and remove inactive ones.",
            priority: "Medium",
            status: "Pending",
            deadline: "2026-09-15",
            assignee: "Riya Sharma",
            assigneeRole: "Team Member",
            avatar: "https://i.pravatar.cc/100?img=5"
        },
        {
            id: 3,
            title: "Book Auditorium for Cultural Fest",
            description: "Confirm booking and send invites to participants.",
            priority: "High",
            status: "Completed",
            deadline: "2026-09-10",
            assignee: "Karan Patel",
            assigneeRole: "Team Member",
            avatar: "https://i.pravatar.cc/100?img=8"
        }
    ]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Recently Created");
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        deadline: "",
        assignee: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTask) {
            setTasks(tasks.map((task) =>
                task.id === editingTask.id
                    ? { ...task, ...formData, avatar: task.avatar, assigneeRole: "Team Member" }
                    : task
            ));
        } else {
            setTasks([...tasks, {
                id: Date.now(),
                ...formData,
                assignee: formData.assignee || "Unassigned",
                assigneeRole: "Team Member",
                avatar: "https://i.pravatar.cc/100?img=12"
            }]);
        }
        closeForm();
    };

    const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

    const editTask = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            deadline: task.deadline,
            assignee: task.assignee
        });
        setShowForm(true);
    };

    const openCreateForm = () => {
        setEditingTask(null);
        setFormData({
            title: "",
            description: "",
            priority: "Medium",
            status: "Pending",
            deadline: "",
            assignee: ""
        });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase()) ||
            task.assignee.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || task.status === filter;
        return matchesSearch && matchesFilter;
    });

    const displayedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === "Recently Created") return b.id - a.id;
        if (sortBy === "Priority") {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortBy === "Deadline") return new Date(a.deadline) - new Date(b.deadline);
        return 0;
    });

    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;
    const completedTasks = tasks.filter(t => t.status === "Completed").length;
    const pendingTasks = tasks.filter(t => t.status === "Pending").length;

    return (
        <div className="task-page">
            <header className="topbar-task">
                <div className="topbar-left">
                    <h1 
                        style={{ textAlign: "left", letterSpacing: "0.5px" }} 
                        className={darkMode ? 'task-heading-dark' : 'task-heading'}
                    >
                        Task Management
                    </h1>
                    <p>Lead your team, manage tasks and keep your club on track.</p>
                </div>

                <div className="topbar-actions">
                    <div className="search-box-task">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search tasks..."
                        />
                    </div>

                    <button className="create-task-btn" onClick={openCreateForm}>
                        <i className="fa-solid fa-plus"></i> Create Task
                    </button>
                </div>
            </header>

            <section className="page-content">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon orange"><i className="fa-solid fa-list-check"></i></div>
                        <div><strong>{totalTasks}</strong><span>Total Tasks</span></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon orange"><i className="fa-solid fa-spinner"></i></div>
                        <div><strong>{inProgressTasks}</strong><span>In Progress</span></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon green"><i className="fa-regular fa-circle-check"></i></div>
                        <div><strong>{completedTasks}</strong><span>Completed</span></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon red"><i className="fa-regular fa-clock"></i></div>
                        <div><strong>{pendingTasks}</strong><span>Pending Review</span></div>
                    </div>
                </div>

                <div className="task-page-header">
                    <h2>Task Management</h2>
                    <p>Manage and track your club tasks.</p>
                </div>

                <div className="filter-bar">
                    <div className="filter-tabs">
                        {["All", "Pending", "In Progress", "Completed"].map((item) => (
                            <button
                                key={item}
                                className={filter === item ? "filter-btn active" : "filter-btn"}
                                onClick={() => setFilter(item)}
                            >
                                {item === "All" ? "All Tasks" : item === "Pending" ? "To Do" : item}
                            </button>
                        ))}
                    </div>

                    <div className="sort-section">
                        <span>Sort by:</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option>Recently Created</option>
                            <option>Priority</option>
                            <option>Deadline</option>
                        </select>
                    </div>
                </div>

                <TaskList
                    tasks={displayedTasks}
                    onDelete={deleteTask}
                    onEdit={editTask}
                />
            </section>

            {showForm && (
                <TaskForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    onClose={closeForm}
                    editingTask={editingTask}
                />
            )}
        </div>
    );
}

export default TaskPage;