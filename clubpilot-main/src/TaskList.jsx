import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete, onEdit }) {
    if (tasks.length === 0) {
        return (
            <div className="no-tasks">
                <i className="fa-regular fa-folder-open"></i>
                <h3>No tasks found</h3>
                <p>Try changing your search or filter.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

export default TaskList;