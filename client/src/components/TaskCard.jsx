import React from "react";
import { Link } from "react-router";

const TaskCard = ({ task, tasks, setTasks }) => {
  const {
    _id,
    title,
    description,
    priority,
    status,
    dueDate,
    tags,
    category,
    reminder,
    color,
  } = task;

  const handleDelete = (id) => {
    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
        fetch(`http://localhost:5000/task/${id}`,{
            method: "DELETE"
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.deletedCount){
                alert("Task deleted succesfully /...../");
                const remainingTasks = tasks.filter((tsk) => tsk._id !== id);
                setTasks(remainingTasks);
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Failed to delete the task. Please try again.");
        });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div
      className="bg-base-100 shadow-lg rounded-xl border-l-4 p-5 mb-4 break-inside-avoid"
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{title}</h3>

        <div className="flex gap-2">
          {reminder && (
            <div title="Reminder set">
              <span className="text-warning text-lg">⏳</span>
            </div>
          )}
          <Link to={`/updateTask/${_id}`}>
            <button title="Edit Task">📝</button>
          </Link>
          <button onClick={() => handleDelete(_id)} title="Delete Task">
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-[#ffffffbf] mt-1">{description}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
        <div>
          <strong>Priority:</strong>{" "}
          <span
            className={`badge ${
              priority === "High"
                ? "badge-error"
                : priority === "Medium"
                ? "badge-warning"
                : "badge-success"
            }`}
          >
            {priority}
          </span>
        </div>

        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${
              status === "Completed"
                ? "badge-success"
                : status === "In Progress"
                ? "badge-info"
                : "badge-warning"
            }`}
          >
            {status}
          </span>
        </div>

        <div>
          <strong>Due:</strong> {formatDate(dueDate)}
        </div>

        <div>
          <strong>Reminder:</strong> {formatDateTime(reminder)}
        </div>

        <div>
          <strong>Category:</strong>{" "}
          {Array.isArray(category)
            ? category.map((cat, idx) => (
                <span key={idx} className="badge badge-outline badge-sm m-1">
                  {cat}
                </span>
              ))
            : category}
        </div>

        <div>
          <strong>Tags:</strong>{" "}
          {Array.isArray(tags)
            ? tags.map((tag, idx) => (
                <span key={idx} className="badge badge-outline badge-sm m-1">
                  {tag}
                </span>
              ))
            : tags}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
